import { Button, Col, Menu, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OpenNotification } from '../Helper/HandleNotify';

function LayoutHeader() {
    const token = localStorage.getItem('token');

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
        </div>
    );
}

export default LayoutHeader;
