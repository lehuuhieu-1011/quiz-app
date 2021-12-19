import { Footer } from 'antd/lib/layout/layout';

function Waiting() {
    document.body.style.background = 'url("https://images-cdn.kahoot.it/acf73135-050e-4126-b172-d0dbb436012e")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.marginBottom = '50px';
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
                <h1>You're in!</h1>
                <h1>See your nickname on screen?</h1>
            </div>
            <Footer style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'black', height: 70 }}>
                <h4 style={{ color: 'white' }}>Hieu</h4>
            </Footer>
        </>
    );
}

export default Waiting;
