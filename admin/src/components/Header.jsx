import { Button, Col, Form, Input, Menu, Modal, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OpenNotification } from '../Helper/HandleNotify';

function LayoutHeader() {
    const token = localStorage.getItem('token');

    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [registerModalVisible, setRegisterModalVisible] = useState(false);

    const [login, setLogin] = useState(false);
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            return;
        }
        const decoded = jwtDecode(token);
        setLogin(decoded.exp < Date.now());
        setRole(decoded.Role);
    }, [token]);

    const onLoginFinish = async (values) => {
        const urlApi = 'https://localhost:5001/api/User/login';
        try {
            const response = await axios.post(urlApi, {
                username: values.username,
                password: values.password,
            });
            OpenNotification('Login', 'success', `Login successfully with username: ${values.username}`);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', values.username);
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                OpenNotification('Login', 'error', 'Username or password not correct!');
            } else {
                OpenNotification('Login', 'error', 'Cant connect to server');
            }
            return;
        }
        console.log('Success:', values);
        setLoginModalVisible(false);
    };

    const onLoginFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = async (values) => {
        console.log(values);
        const urlApi = 'https://localhost:5001/api/User/register';
        try {
            const response = await axios.post(urlApi, {
                username: values.username,
                fullname: values?.fullname,
                password: values.password,
            });
            OpenNotification('Register', 'success', `Register successfully with username: ${values.username}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                OpenNotification('Register', 'error', 'Cant register account because username is duplicate');
            } else {
                OpenNotification('Register', 'error', 'Cant connect to server');
            }
            return;
        }
        console.log('Success:', values);
        setRegisterModalVisible(false);
        setLoginModalVisible(true);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const switchForm = () => {
        setLoginModalVisible(!loginModalVisible);
        setRegisterModalVisible(!registerModalVisible);
    };

    const logoutOnClick = () => {
        localStorage.clear();
        setLogin(false);
        OpenNotification('Logout', 'success', 'Logout successfully');
        navigate('/');
    };

    return (
        <div>
            <div style={{ position: 'fixed', width: '100vw', zIndex: 1, top: 0 }}>
                <Header>
                    <Link to="/">
                        <div className="logo" />
                    </Link>
                    {!login && (
                        <>
                            <Button className="button" type="primary" onClick={() => setLoginModalVisible(true)}>
                                Login
                            </Button>
                            <Button className="button" type="primary" onClick={() => setRegisterModalVisible(true)}>
                                Register
                            </Button>
                        </>
                    )}
                    {login && role === 'User' && (
                        <>
                            <Button className="button" type="primary" onClick={() => logoutOnClick()}>
                                Logout
                            </Button>
                            <Button className="button" type="text" onClick={() => {}} style={{ color: '#FFFFFFA6' }}>
                                UserName: {localStorage.getItem('username')}
                            </Button>
                        </>
                    )}
                    {login && role === 'Admin' && (
                        <>
                            <Button className="button" type="primary" onClick={() => logoutOnClick()}>
                                Logout
                            </Button>
                            <Button className="button" type="text" onClick={() => {}} style={{ color: '#FFFFFFA6' }}>
                                UserName: {localStorage.getItem('username')}
                            </Button>
                            <Link to="manageCourse">
                                <Button className="button" type="default" onClick={() => {}}>
                                    Manage Course
                                </Button>
                            </Link>
                        </>
                    )}
                    <Menu theme="dark" mode="horizontal">
                        <Row key="1">
                            <Col>
                                <Button
                                    type="text"
                                    style={{ color: '#FFFFFFA6' }}
                                    onClick={() => {
                                        navigate('/');
                                    }}
                                >
                                    Home
                                </Button>
                            </Col>
                        </Row>
                    </Menu>
                </Header>
            </div>
            <div>
                <Modal
                    title="Login"
                    centered
                    visible={loginModalVisible}
                    onCancel={() => setLoginModalVisible(false)}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose={true}
                    width={600}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        onFinish={onLoginFinish}
                        onFinishFailed={onLoginFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        <Button type="link" htmlType="submit" style={{}} onClick={() => switchForm(loginModalVisible, registerModalVisible)}>
                            You don't have account ?
                        </Button>
                    </Form>
                </Modal>
            </div>
            <div>
                <Modal
                    title="Register"
                    centered
                    visible={registerModalVisible}
                    onCancel={() => setRegisterModalVisible(false)}
                    footer={null}
                    maskClosable={false}
                    destroyOnClose={true}
                    width={600}
                >
                    <Form name="basic" labelCol={{ span: 7 }} wrapperCol={{ span: 16 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Full name" name="fullname" rules={[{ message: 'Please input your fullname' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={() => {}}>
                                Submit
                            </Button>
                        </Form.Item>
                        <Button type="link" htmlType="submit" style={{}} onClick={() => switchForm()}>
                            You have account ?
                        </Button>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}

export default LayoutHeader;
