import {useEffect, useRef, useState} from 'react';
import socket from './../socket'
import freeice from 'freeice'
import useStateWithCallback from './useStateWithCallback';

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export const useWebRTC = (roomId) => {
    const localStream = useRef<MediaStream>(null)
    const clientsMediaStreams = useRef({
        [LOCAL_VIDEO]: null
    })
    const peerConnections = useRef({})
    const [clients, setClients]  = useStateWithCallback([], [clientsMediaStreams.current])
    const [muted, setMuted] = useState([])
    const [myAudio, setMyAudio]  = useState(true)

    const addClient = (newClient, callback) => {
        // IMPORTANT AS FUCK!
        callback()

        setClients((clients) => {
            if (!clients.includes(newClient)){
                console.log('Add client. Total clients', [...clients, newClient])
                return [...clients, newClient]
            }
            return clients
        }, callback)
    }

    const startWebRTC = async () => {
        console.log('WEBRTC started')
        // getDisplayMedia
        localStream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        addClient(LOCAL_VIDEO, () => {})
        socket.emit('join_room', {roomId})
    }


    // Reconnect if permission changed
    navigator.permissions.query({name: 'camera'}).then((permissionStatus) => {
        permissionStatus.addEventListener('change', (status) => {
            if (status.currentTarget.state === 'denied'){
                clientsMediaStreams.current[LOCAL_VIDEO] = null
                localStream.current.getTracks().forEach((track) => {
                    track.stop()
                })
                localStream.current = null
                setClients((clients) => clients.filter((c) => c !== LOCAL_VIDEO))
                socket.emit('leave_room')
            }
            else if (status.currentTarget.state === 'granted'){
                startWebRTC()
            }
        })
    })

    useEffect(() => {
        const localVideoElement = clientsMediaStreams.current[LOCAL_VIDEO]
        console.log('LOCAL_STREAM_UPDATED', localStream.current)
        if (localVideoElement){
            localVideoElement.volume = 0
            localVideoElement.srcObject = localStream.current
        }
    }, [clientsMediaStreams.current[LOCAL_VIDEO], localStream.current])

    useEffect(() => {
        startWebRTC()
        return () => {
            if (localStream.current){
                localStream.current.getTracks().forEach((track) => {
                    track.stop()
                })
                socket.emit('leave_room')
            }
        }
    }, [roomId])

    useEffect(() => {
       socket.on('add_peer', async ({peerId, createOffer}) => {
           console.log('Event: Add_peer', peerId)
           if (peerId in peerConnections.current){
               return console.log(`User with ${peerId} has already connected`)
           }
           //peerConnections.current[peerId]
           peerConnections.current[peerId] = new RTCPeerConnection({
               iceServers: freeice()
           })

           peerConnections.current[peerId].addEventListener('icecandidate', (e) => {
               console.log('%cIceCandidate', 'color: green')
               if (e.candidate){
                   socket.emit('relay_ice_candidate', {
                       peerId,
                       iceCandidate: e.candidate
                   })
               }
           })
           let trackNumber = 0
           peerConnections.current[peerId].addEventListener('track', (e) => {
               console.log('%cTrack', 'color: green')
               trackNumber++
               if (trackNumber === 2){ // when video and audio received
                   trackNumber = 0
                   console.log('EventListener: track. Audio and video received')
                   const [remoteStream] = e.streams
                   console.log('REMOTE_STREAM', remoteStream)
                   addClient(peerId, () => {
                       console.log('Updateing clientMediaStreams...',
                           clientsMediaStreams.current[peerId])
                       if (clientsMediaStreams.current[peerId]){
                           clientsMediaStreams.current[peerId].srcObject = remoteStream
                       } else {
                           // FIX LONG RENDER IN CASE OF MANY CLIENTS
                           let settled = false;
                           const interval = setInterval(() => {
                               if (clientsMediaStreams.current[peerId]) {
                                   clientsMediaStreams.current[peerId].srcObject = remoteStream;
                                   settled = true;
                               }

                               if (settled) {
                                   clearInterval(interval);
                               }
                           }, 1000);
                       }
                   })
               }
           })

           const localTracks = localStream.current.getTracks()
           localTracks.forEach((track) => {
               peerConnections.current[peerId].addTrack(track, localStream.current)
           })

           if (createOffer){
               const offer = await peerConnections.current[peerId].createOffer()

               await peerConnections.current[peerId].setLocalDescription(offer)

               socket.emit('relay_sdp', {
                   peerId,
                   sessionDescription: offer
               })
           }
       })
       socket.on('add_session_description', async ({peerId, sessionDescription}) => {
           console.log('Event: add_session_description', sessionDescription)
           await peerConnections.current[peerId].setRemoteDescription(
               new RTCSessionDescription(sessionDescription)
           )
           if (sessionDescription.type === 'offer'){
               const answer = await peerConnections.current[peerId].createAnswer();

               await peerConnections.current[peerId].setLocalDescription(answer);

               socket.emit('relay_sdp', {
                   peerId,
                   sessionDescription: answer
               })
           }
       });
       socket.on('ice_candidate_received', ({peerId, iceCandidate}) => {
           peerConnections.current[peerId].addIceCandidate(
               new RTCIceCandidate(iceCandidate)
           )
       })
       socket.on('remove_peer', ({peerId}) => {
           if (peerConnections.current[peerId]){
               peerConnections.current[peerId].close()
           }
           delete peerConnections.current[peerId]
           delete clientsMediaStreams.current[peerId]
           setClients(clients => clients.filter((c) => c !== peerId))
       })
        return () => {
           socket.off('remove_peer');
           socket.off('ice_candidate_received')
           socket.off('add_session_description')
           socket.off('add_peer')
        }
    },[])


    const provideMediaRef = (clientId, videoRef) => {
        clientsMediaStreams.current[clientId] = videoRef
    }

    const muteAudio = (clientId) => () => {
        if (muted.includes(clientId)){
            setMuted(muted => muted.filter((m) => m !== clientId))
        }
        else{
            setMuted(muted => [...muted, clientId])
        }
    }
    const muteMyAudio = () => {
        localStream.current.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled
            console.log(track)
        } )
    }


    console.log('%cClients', 'color: red')
    console.table(clients)
    console.log('%cPeerConnections', 'color: red')
    console.table(peerConnections.current)
    console.log('%cClientsMediaStreams', 'color: red')
    console.table(clientsMediaStreams.current)
    console.log('%c _____________________', 'color: white')
    console.log(' ')

    return {clients, provideMediaRef, muteAudio, muted, muteMyAudio}
}
