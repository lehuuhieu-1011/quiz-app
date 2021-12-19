import { Button, Card, Col, Row, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
// import HandleLogout from '../../Helper/HandleLogout';
// import { OpenNotification } from '../../Helper/HandleNotify';
// import { CheckRoleToken, CheckToken } from '../../Helper/HandleToken';

const { Title } = Typography;

function Question() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [nameCourse, setNameCourse] = useState('');
    const [loading, setLoading] = useState(true);
    const [timerSeconds, setTimerSeconds] = useState(15);
    const [timerMinute, setTimerMinute] = useState(1);

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    // const checkToken = CheckToken();
    // const checkRoleToken = CheckRoleToken('User');

    // useEffect(() => {
    //     if (!checkToken) {
    //         OpenNotification('Login', 'error', 'Please Login');
    //         HandleLogout();
    //     } else {
    //         if (!checkRoleToken) {
    //             OpenNotification('Permission', 'error', 'Your account dont have permission');
    //             navigate('/');
    //         }
    //     }
    // }, [checkRoleToken, checkToken, navigate]);

    document.body.style.height = '';
    document.body.style.backgroundColor = '';

    useEffect(() => {
        const apiGetQuestion = `https://localhost:5001/api/GetAllQuestionByIdCourse/${id}`;
        axios({
            url: apiGetQuestion,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => setData(res.data))
            .catch((error) => console.log(error));

        const apiGetCourse = `https://localhost:5001/api/CourseQuiz/${id}`;
        axios({
            url: apiGetCourse,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => setNameCourse(res.data.name))
            .catch((error) => console.log(error));
        setLoading(false);
    }, [id, token, navigate]);

    useEffect(() => {
        if (timerSeconds <= 0 && timerMinute <= 0) {
            return;
        }
        const timer = setTimeout(() => {
            if (timerSeconds <= 0) {
                if (timerMinute >= 0) {
                    setTimerSeconds(59);
                    setTimerMinute(timerMinute - 1);
                }
            } else {
                setTimerSeconds(timerSeconds - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timerSeconds, timerMinute]);

    return (
        <div className="container">
            <div className="site-card-wrapper">
                <Title level={2} style={{ textAlign: 'center' }}>
                    How many sides does a hexagon have?
                </Title>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 }}>
                    <div style={{ width: 150, height: 150, background: 'purple', borderRadius: '50%' }}>
                        <div style={{ textAlign: 'center', paddingTop: '15%', color: 'white', fontWeight: 'bold', fontSize: 60 }}>2</div>
                    </div>
                    <img src="https://i1.taimienphi.vn/tmp/cf/aut/hinh-anh-nguoi-mau.jpg" alt="" width={300} />
                    {/* <div style={{ height: 400 }}></div> */}
                    <div>
                        <Col>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Button type="primary" size="large" style={{ position: 'absolute', bottom: '160px', fontWeight: 'bold' }}>
                                    Skip
                                </Button>
                                <div style={{ fontSize: 30, fontWeight: 'bold' }}>0</div>
                                <div style={{ fontSize: 30, fontWeight: 'bold' }}>Answers</div>
                            </div>
                        </Col>
                    </div>
                </div>
                <Row gutter={24}>
                    <Col span={12} style={{ paddingBottom: 16 }}>
                        <Card
                            bordered={false}
                            style={{ backgroundColor: 'red', height: 150, color: 'white', fontSize: 25, borderRadius: '5px', cursor: 'pointer' }}
                        >
                            1
                        </Card>
                    </Col>
                    <Col span={12} style={{ paddingBottom: 16, borderRadius: '10px' }}>
                        <Card
                            bordered={false}
                            style={{ backgroundColor: 'blue', height: 150, color: 'white', fontSize: 25, borderRadius: '5px', cursor: 'pointer' }}
                        >
                            2
                        </Card>
                    </Col>
                    <Col span={12} style={{ paddingBottom: 16, borderRadius: '10px' }}>
                        <Card
                            bordered={false}
                            style={{ backgroundColor: '#FFBF00', height: 150, color: 'white', fontSize: 25, borderRadius: '5px', cursor: 'pointer' }}
                        >
                            3
                        </Card>
                    </Col>
                    <Col span={12} style={{ paddingBottom: 16, borderRadius: '10px' }}>
                        <Card
                            bordered={false}
                            style={{ backgroundColor: 'green', height: 150, color: 'white', fontSize: 25, borderRadius: '5px', cursor: 'pointer' }}
                        >
                            4
                        </Card>
                    </Col>
                </Row>
            </div>
            ,
        </div>
    );
}

export default Question;
