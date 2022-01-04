import { useState } from 'react';
import Home from './Home';
import Waiting from './Waiting';
import { HubConnectionBuilder } from '@microsoft/signalr';

function Index() {
    const [go, setGo] = useState(true);
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');

    const submitData = async (username, roomId) => {
        setUsername(username);
        setRoomId(roomId);
        setGo(false);

        const connection = new HubConnectionBuilder().withUrl('https://localhost:5001/chatHub').build();

        try {
            await connection.start();
            console.log('Connected!');
        } catch (error) {
            console.log('Connect failed: ', error);
        }

        connection.on('ReceiveMessage', (message) => {
            console.log(message);
        });

        await connection.invoke('JoinRoom', { username, roomId });
    };

    return <>{go ? <Home submitData={submitData} /> : <Waiting username={username} roomId={roomId} />}</>;
}

export default Index;
