import { Button, Card, Col, Row, Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
// import HandleLogout from '../../Helper/HandleLogout';
// import { OpenNotification } from '../../Helper/HandleNotify';
// import { CheckRoleToken, CheckToken } from '../../Helper/HandleToken';

const { Title } = Typography;

function Question({
  courseId,
  question,
  setWaitingToContinueQuestion,
  setAnswer,
  username,
}) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [nameCourse, setNameCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(3);
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

  console.log(courseId, question);

  // useEffect(() => {
  //     const apiGetQuestion = `https://localhost:5001/api/GetAllQuestionByIdCourse/${id}`;
  //     axios({
  //         url: apiGetQuestion,
  //         method: 'GET',
  //         headers: {
  //             Authorization: `Bearer ${token}`,
  //         },
  //     })
  //         .then((res) => setData(res.data))
  //         .catch((error) => console.log(error));

  //     const apiGetCourse = `https://localhost:5001/api/CourseQuiz/${id}`;
  //     axios({
  //         url: apiGetCourse,
  //         method: 'GET',
  //         headers: {
  //             Authorization: `Bearer ${token}`,
  //         },
  //     })
  //         .then((res) => setNameCourse(res.data.name))
  //         .catch((error) => console.log(error));
  //     setLoading(false);
  // }, [id, token, navigate]);

  useEffect(() => {
    if (timerSeconds <= 0) {
      setTimerSeconds(3);
      return;
    }
    const timer = setTimeout(() => {
      setTimerSeconds(timerSeconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timerSeconds]);

  const chooseAnswer = (questionId, answer) => {
    setAnswer(question.correctAnswer === answer ? true : false);

    const api = `https://localhost:5001/api/StorageScores/AddScoreToRedis?questionId=${questionId}&username=${localStorage.getItem(
      'username'
    )}&answer=${answer}`;
    axios({
      method: 'POST',
      url: api,
    })
      .then((res) => {
        console.log(res.data);
        setWaitingToContinueQuestion(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          position: 'absolute',
          top: '0',
          bottom: '0',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px 200px',
        }}
      >
        <div className="site-card-wrapper" style={{ width: '100%' }}>
          {/* <Title level={4} style={{ textAlign: 'center' }}>
          Question 1
        </Title> */}
          {/* <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 }}>
                    <div style={{ width: 150, height: 150, background: 'purple', borderRadius: '50%' }}>
                        <div style={{ textAlign: 'center', paddingTop: '15%', color: 'white', fontWeight: 'bold', fontSize: 60 }}>{timerSeconds}</div>
                    </div>
                    <img src={question.image} alt="" width={300} /> */}
          {/* <div style={{ height: 400 }}></div> */}
          {/* <div>
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
                </div> */}
          <Row gutter={24}>
            {question.answerA && (
              <Col span={12} style={{ paddingBottom: 16 }}>
                <Card
                  bordered={false}
                  style={{
                    backgroundColor: 'red',
                    height: 150,
                    color: 'white',
                    fontSize: 25,
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => chooseAnswer(question.id, 'A')}
                >
                  {question.answerA}
                </Card>
              </Col>
            )}
            {question.answerB && (
              <Col
                span={12}
                style={{ paddingBottom: 16, borderRadius: '10px' }}
              >
                <Card
                  bordered={false}
                  style={{
                    backgroundColor: 'blue',
                    height: 150,
                    color: 'white',
                    fontSize: 25,
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => chooseAnswer(question.id, 'B')}
                >
                  {question.answerB}
                </Card>
              </Col>
            )}
            {question.answerC && (
              <Col
                span={12}
                style={{ paddingBottom: 16, borderRadius: '10px' }}
              >
                <Card
                  bordered={false}
                  style={{
                    backgroundColor: '#FFBF00',
                    height: 150,
                    color: 'white',
                    fontSize: 25,
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => chooseAnswer(question.id, 'C')}
                >
                  {question.answerC}
                </Card>
              </Col>
            )}
            {question.answerD && (
              <Col
                span={12}
                style={{ paddingBottom: 16, borderRadius: '10px' }}
              >
                <Card
                  bordered={false}
                  style={{
                    backgroundColor: 'green',
                    height: 150,
                    color: 'white',
                    fontSize: 25,
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => chooseAnswer(question.id, 'D')}
                >
                  {question.answerD}
                </Card>
              </Col>
            )}
          </Row>
        </div>
      </div>
      <Footer
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          backgroundColor: 'black',
          height: 70,
        }}
      >
        <h4 style={{ color: 'white' }}>{username}</h4>
      </Footer>
    </>
  );
}

export default Question;
