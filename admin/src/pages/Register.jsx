import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { OpenNotification } from '../Helper/HandleNotify';

const { Title } = Typography;

function Register() {
    const [loadingButton, setLoadingButton] = useState(false);

    const navigate = useNavigate();

    const [form] = useForm();

    const onFinish = async (values) => {
        setLoadingButton(true);
        const urlApi = 'https://localhost:5001/api/User/register';
        try {
            await axios.post(urlApi, {
                username: values.username,
                fullname: values?.fullname,
                password: values.password,
            });
            OpenNotification('Register', 'success', 'Register account successfully');
            navigate('/login');
            form.resetFields();
        } catch (error) {
            console.log(error.response);
            if (error.response.status === 400) {
                OpenNotification('Register', 'error', 'Cant register account because username is duplicate');
            } else {
                OpenNotification('Register', 'error', 'Internal Server Error');
            }
        }
        setLoadingButton(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ paddingTop: 150 }}>
            <Row style={{ display: 'flex' }} align="middle" justify="center">
                <Col span={6}>
                    <Card>
                        <Title style={{ textAlign: 'center' }}>Register</Title>
                        <Form form={form} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item label="Full name" name="fullname" rules={[{ message: 'Please input your fullname' }]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                    {
                                        len: 6,
                                        message: 'Password length at least 6 characters',
                                    },
                                ]}
                            >
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

                            <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                                <Button type="primary" htmlType="submit" loading={loadingButton}>
                                    Submit
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="link"
                                    onClick={() => {
                                        navigate('/login');
                                    }}
                                >
                                    You have account ?
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Register;
