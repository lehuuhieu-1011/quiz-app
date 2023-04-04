import { Button, Form, Input } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    document.body.style.background = 'url("https://images-cdn.kahoot.it/acf73135-050e-4126-b172-d0dbb436012e")';
    document.body.style.backgroundSize = 'cover';

    const [next, setNext] = useState(false);
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');

    const navigate = useNavigate();

    const handleSubmitData = () => {
        localStorage.setItem('username', username);
        localStorage.setItem('roomId', roomId);
        navigate('/start');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
            {!next ? (
                <Form name="basic">
                    <h1 style={{ textAlign: 'center' }}>Enter Room ID</h1>
                    <Form.Item>
                        <Input placeholder="ROOM ID ..." value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{ width: '100%' }} onClick={() => setNext(true)} htmlType="submit">
                            Enter
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <Form name="basic">
                    <h1 style={{ textAlign: 'center' }}>Enter UserName</h1>
                    <Form.Item>
                        <Input placeholder="UserName ..." value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{ width: '100%' }} onClick={() => handleSubmitData()} htmlType="submit">
                            Okay, Go!
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
}

export default Home;
