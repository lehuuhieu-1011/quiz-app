import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const Chat = () => {
    const joinRoom = async () => {
        let connection = new HubConnectionBuilder().withUrl('https://localhost:5001/chatHub').configureLogging(LogLevel.Information).build();

        console.log(connection);

        connection.on('ReceiveMessage', (data) => {
            console.log(data);
        });

        await connection.start();
        await connection.invoke('JoinRoom', 'vip123');
        // .then(() => {
        //     console.log('connected');
        //     // connection.invoke('SendMessage', 'hieu', 'hello').catch((error) => console.log('connect failed: ', error));
        // })
        // .catch((error) => console.log('start failed: ', error));
    };

    joinRoom();

    return <>Chat</>;
};

export default Chat;
