import { Button, Form, Input, List } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    document.body.style.background = 'url("https://images-cdn.kahoot.it/acf73135-050e-4126-b172-d0dbb436012e")';
    document.body.style.backgroundSize = 'cover';

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const onFinishPin = (values) => {
        console.log('Success:', values);
        setLoading(true);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishName = (value) => {
        console.log(value);
        navigate('/question');
    };

    const loadMore = loading && (
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinishName} onFinishFailed={onFinishFailed} autoComplete="off">
            <Form.Item>
                <Input placeholder="Nick Name" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Okay, Go!
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '20%' }}>
            <List loadMore={loadMore}>
                <Form name="basic" initialValues={{ remember: true }} onFinish={onFinishPin} onFinishFailed={onFinishFailed} autoComplete="off">
                    <Form.Item>
                        <Input placeholder="GAME PIN" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </List>
        </div>
    );
}

export default Home;
