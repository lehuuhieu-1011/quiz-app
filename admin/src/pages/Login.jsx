import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OpenNotification } from '../Helper/HandleNotify';
import { actions, useStore } from '../store';

const { Title } = Typography;

function Login() {
    const [loadingButton, setLoadingButton] = useState(false);
    const componentMounted = useRef(true);

    const [form] = useForm();
    const navigate = useNavigate();

    const [state, dispatch] = useStore();

    useEffect(() => {
        state.login && navigate('/manageCourse');

        return () => {
            componentMounted.current = false;
        };
    }, [state.login, navigate]);

    const onLoginFinish = async (values) => {
        setLoadingButton(true);
        const urlApi = 'https://localhost:5001/api/User/login';
        try {
            const response = await axios.post(urlApi, {
                username: values.username,
                password: values.password,
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', values.username);
            dispatch(actions.setLogin(true));

            OpenNotification('Login', 'success', `Login successfully with username: ${values.username}`);
            setLoadingButton(false);
            navigate('/manageCourse');
            form.resetFields();
        } catch (error) {
            console.log(error.response);
            if (error.response.status === 400) {
                OpenNotification('Login', 'error', 'Username or password not correct');
            } else {
                OpenNotification('Login', 'error', 'Internal Server Error');
            }
            setLoadingButton(false);
        }
    };

    const onLoginFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Row style={{ display: 'flex' }} align="middle" justify="center">
                <Col xxl={6} xl={8} lg={10} md={12} sm={16}>
                    <Card>
                        <Title style={{ textAlign: 'center' }}>Login</Title>
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            onFinish={onLoginFinish}
                            onFinishFailed={onLoginFinishFailed}
                        >
                            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                                <Button type="primary" htmlType="submit" loading={loadingButton}>
                                    Submit
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="link"
                                    onClick={() => {
                                        navigate('/register');
                                    }}
                                >
                                    You don't have account ?
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
