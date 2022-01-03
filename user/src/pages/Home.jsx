import { Button, Form, Input } from 'antd';
import { useState } from 'react';

function Home({ submitData }) {
    document.body.style.background = 'url("https://images-cdn.kahoot.it/acf73135-050e-4126-b172-d0dbb436012e")';
    document.body.style.backgroundSize = 'cover';

    const [next, setNext] = useState(false);
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
            {!next ? (
                <Form name="basic">
                    <Form.Item>
                        <Input placeholder="ROOM ID ..." value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" style={{ width: '100%' }} onClick={() => setNext(true)}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <Form name="basic">
                    <Form.Item>
                        <Input placeholder="UserName ..." value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            style={{ width: '100%' }}
                            onClick={() => {
                                submitData(username, roomId);
                            }}
                        >
                            Okay, Go!
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
}

export default Home;
