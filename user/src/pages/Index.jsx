import { useState } from 'react';
import Home from './Home';
import Waiting from './Waiting';

function Index() {
    const [go, setGo] = useState(true);
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');

    const submitData = (username, roomId) => {
        setUsername(username);
        setRoomId(roomId);
        setGo(false);
    };

    return <>{go ? <Home submitData={submitData} /> : <Waiting username={username} roomId={roomId} />}</>;
}

export default Index;
