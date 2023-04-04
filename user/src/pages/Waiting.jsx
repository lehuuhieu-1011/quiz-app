import { Footer } from 'antd/lib/layout/layout';

function Waiting({ username }) {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
                <h1>You're in!</h1>
                <h1>See your nickname on screen?</h1>
            </div>
            <Footer style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'black', height: 70 }}>
                <h4 style={{ color: 'white' }}>{username}</h4>
            </Footer>
        </>
    );
}

export default Waiting;
