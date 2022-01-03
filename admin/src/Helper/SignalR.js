import { HubConnectionBuilder } from '@microsoft/signalr'

function SignalR() {
    let connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/chatHub')
        .build()

    connection.on('ReceiveMessage', data => {
        console.log(data)
    })

    connection.start()
        .then(() =>
            connection.invoke('SendMessage', 'hieu', 'hello')
                .catch(error => console.log(error))
        )
        .catch(error => console.log(error))
}

export default SignalR