import { Button, Col, Menu, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HandleLogout from '../Helper/HandleLogout';
import { OpenNotification } from '../Helper/HandleNotify';
import { actions, useStore } from '../store';

function LayoutHeader() {
    const token = localStorage.getItem('token');

    const [role, setRole] = useState('');

    const navigate = useNavigate();
    const [state, dispatch] = useStore();
    const { login } = state;

    useEffect(() => {
        if (token === null) {
            return;
        }
        const decoded = jwtDecode(token);
        setRole(decoded.Role);
    }, [token]);

    const logoutOnClick = () => {
        HandleLogout();
        dispatch(actions.setLogin(false));
        OpenNotification('Logout', 'success', 'Logout successfully');
    };

    return (
        <div>
            <div style={{ position: 'fixed', width: '100vw', zIndex: 1, top: 0 }}>
                <Header>
                    <div className="logo" />
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
                                <Button
                                    className="button"
                                    type="default"
                                    onClick={() => {
                                        navigate('/manageCourse');
                                    }}
                                >
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
        </div>
    );
}

export default LayoutHeader;
