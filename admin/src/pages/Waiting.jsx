import { UserOutlined } from '@ant-design/icons';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

function Waiting() {
    const [connection, setConnection] = useState('');
    const [listUser, setListUser] = useState([]);

    const roomId = localStorage.getItem('RoomId');

    useEffect(() => {
        const connection = new HubConnectionBuilder().withUrl('https://localhost:5001/chatHub').build();

        setConnection(connection);

        (async () => {
            try {
                await connection.start();
                console.log('Connected!');
            } catch (error) {
                console.log('Connect failed: ', error);
            }

            await connection.invoke('AdminRequest', roomId).catch((error) => console.log(error));

            await connection.invoke('ListUserInRoom', roomId).catch((error) => console.log(error));

            connection.on('ReceiveMessage', (message) => console.log('ReceiveMessage ', message));

            connection.on('ReceiveMessageAdmin', (message) => console.log('ReceiveMessageAdmin ', message));

            connection.on('UserInRoom', (users) => {
                console.log('UserInRoom ', users);
                setListUser(users);
            });
        })();

        return () => {
            localStorage.removeItem('RoomId');
            connection.stop();
        };
    }, [roomId]);

    return (
        <div>
            {connection ? (
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="icons-list" style={{ display: 'flex' }}>
                        <UserOutlined style={{ fontSize: 40 }} />
                        <div style={{ fontSize: 20 }}>{listUser.length}</div>
                    </div>
                    <div>
                        <h1 style={{ textAlign: 'center' }}>Room ID: {roomId}</h1>
                        {listUser.length === 0 ? (
                            <h4 style={{ textAlign: 'center' }}>Waiting for players ...</h4>
                        ) : (
                            <ul style={{ textAlign: 'center', listStyleType: 'none' }}>
                                {listUser.map((user, index) => (
                                    <li key={index}>
                                        <h5>{user}</h5>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <Button type="primary">Start</Button>
                    </div>
                </div>
            ) : (
                'loading ...'
            )}
        </div>
    );
}

export default Waiting;
