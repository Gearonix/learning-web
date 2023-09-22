import path from 'path'
import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
import {validate} from 'uuid';

const corsConfig = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

const app = express()
const server = http.Server(app)
const io = new Server(server, {
    cors: corsConfig
})




app.use(cors(corsConfig))

const port = 6868

const getClientRooms = () => {
    return [...io.sockets.adapter.rooms.keys()].filter((item) => validate(item))
}
const shareRoomsInfo = () => {
    io.emit('share_rooms', {
        rooms: getClientRooms()
    })
}


server.listen(port, () => {
    console.log('server started')
})

io.on('connection', (socket) => {
    shareRoomsInfo()

    socket.on('join_room', ({roomId}) => {
        if (socket.rooms.has(roomId)) {
            return console.log(`Already joined to room ${roomId}`)
        }

        const clients = [...io.sockets.adapter.rooms.get(roomId) || []]

        clients.forEach((clientId) => {
            io.to(clientId).emit('add_peer', {
                peerId: socket.id,
                createOffer: false
            })

            socket.emit('add_peer', {
                peerId: clientId,
                createOffer: true
            })
        })

        socket.join(roomId);
        console.log(`joined to ${roomId}`)
        shareRoomsInfo()
    })

    const leaveRoom = () => {
        console.log(Array.from(socket.rooms))
        Array.from(socket.rooms).filter((roomId) => validate(roomId))
            .forEach((roomId) => {
                const clients = [...io.sockets.adapter.rooms.get(roomId) || []]
                clients.forEach((clientId) => {
                    io.to(clientId).emit('remove_peer', {
                        peerId: socket.id
                    });

                    socket.emit('remove_peer', {
                        peerId: clientId
                    })
                })
                socket.leave(roomId)
            })

        shareRoomsInfo()
    }

    socket.on('leave_room', leaveRoom);
    socket.on('disconnecting', leaveRoom);

    socket.on('relay_sdp', ({peerId, sessionDescription}) => {
        io.to(peerId).emit('add_session_description', {
            peerId: socket.id,
            sessionDescription
        })
    })
    socket.on('relay_ice_candidate', ({peerId, iceCandidate}) => {
        io.to(peerId).emit('ice_candidate_received', {
            peerId: socket.id,
            iceCandidate
        })
    })
})

