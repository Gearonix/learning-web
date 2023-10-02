import { FC } from 'react'
import {useParams} from 'react-router-dom';
import {LOCAL_VIDEO, useWebRTC} from '../hooks/useWebRTC';


const Room : FC = () => {
  const {roomId} = useParams()
  const {clients, provideMediaRef, muteAudio, muted, muteMyAudio} = useWebRTC(roomId)
  console.log(muted)
  return <div>
    Participants: {clients.length}
    {clients.map((clientId) => {
      const isMuted = muted.includes(clientId)
      return <div key={clientId}>
        <h6>{clientId}</h6>
        <video autoPlay
               playsInline
               ref={(instance) => {
                provideMediaRef(clientId, instance)
               }}
               muted={isMuted}
        />
        {
          clientId !== LOCAL_VIDEO &&
            <div>
              <button onClick={muteAudio(clientId)}>mute audio</button>
              {isMuted && <p>User is muted</p>}
            </div>
        }
        {
          clientId === LOCAL_VIDEO &&
            <div>
              <button onClick={muteMyAudio}>mute my audio</button>
            </div>
        }
      </div>
    })}
  </div>
}


export default Room
