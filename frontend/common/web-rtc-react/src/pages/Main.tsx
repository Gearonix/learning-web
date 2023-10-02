import socket from './../socket'
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {v4} from 'uuid'

function Main() {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        socket.on('share_rooms', ({rooms}) => {
            setRooms(rooms)
        })
    },[])
    const joinRoom = (roomId: string) => () => {
        navigate(`/room/${roomId}`)
    }
    return (
        <div>
            test
            <h1>Rooms:</h1>
            <br/>
            {rooms.map((roomId) =>
                <div key={roomId}>
                    <h2>{roomId}</h2>
                    <button onClick={joinRoom(roomId)}>join room</button>
                </div>
            )
            }
            <button onClick={joinRoom(v4())}>create room</button>
        </div>
    )
}

export default Main
