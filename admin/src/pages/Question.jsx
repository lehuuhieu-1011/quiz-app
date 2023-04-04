import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
// import HandleLogout from '../../Helper/HandleLogout';
// import { OpenNotification } from '../../Helper/HandleNotify';
// import { CheckRoleToken, CheckToken } from '../../Helper/HandleToken';

const { Title } = Typography;

// function Question({ courseId, question, handleQuestion, pageNumber }) {
function Question({
  courseId,
  question,
  connection,
  roomId,
  setShowScoreBoard,
}) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [nameCourse, setNameCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(3);
  const [timerMinute, setTimerMinute] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);

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
      // handleQuestion(++pageNumber);
      connection
        .invoke('QuestionTimeout', roomId)
        .catch((error) => console.log(error));

      setShowAnswer(true);
      return;
    }
    const timer = setTimeout(() => {
      setTimerSeconds(timerSeconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timerSeconds, connection, roomId, setShowAnswer]);
  // }, [timerSeconds, handleQuestion, pageNumber]);

  return (
    <div
      className="container"
      style={{
        width: '100%',
        top: '0',
        bottom: '0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="site-card-wrapper" style={{ width: '100%' }}>
        <Row>
          <Col flex="14">
            <Title level={2} style={{ textAlign: 'center' }}>
              {question.question}
            </Title>
          </Col>
          <Col flex="1">
            {showAnswer ? (
              <Button
                type="primary"
                size="large"
                style={{
                  fontWeight: 'bold',
                }}
                onClick={() => setShowScoreBoard(true)}
              >
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                style={{
                  fontWeight: 'bold',
                }}
              >
                Skip
              </Button>
            )}
          </Col>
        </Row>
        <hr />
        {showAnswer ? null : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 20,
            }}
          >
            <div
              style={{
                width: 150,
                height: 150,
                background: 'purple',
                borderRadius: '50%',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  paddingTop: '15%',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 60,
                }}
              >
                {timerSeconds}
              </div>
            </div>
            <img src={question.image} alt="" width={300} />
            <div>
              <Col>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ fontSize: 30, fontWeight: 'bold' }}>0</div>
                  <div style={{ fontSize: 30, fontWeight: 'bold' }}>
                    Answers
                  </div>
                </div>
              </Col>
            </div>
          </div>
        )}
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
                  ...(showAnswer
                    ? question.correctAnswer === 'A'
                      ? {}
                      : { opacity: '0.3' }
                    : {}),
                }}
              >
                <Row>
                  <Col flex={14}>{question.answerA}</Col>
                  <Col flex={1}>
                    {showAnswer ? (
                      <>
                        {question.correctAnswer === 'A' ? (
                          <CheckOutlined />
                        ) : (
                          <CloseOutlined />
                        )}
                      </>
                    ) : null}
                  </Col>
                </Row>
              </Card>
            </Col>
          )}
          {question.answerB && (
            <Col span={12} style={{ paddingBottom: 16, borderRadius: '10px' }}>
              <Card
                bordered={false}
                style={{
                  backgroundColor: 'blue',
                  height: 150,
                  color: 'white',
                  fontSize: 25,
                  borderRadius: '5px',
                  ...(showAnswer
                    ? question.correctAnswer === 'B'
                      ? {}
                      : { opacity: '0.3' }
                    : {}),
                }}
              >
                <Row>
                  <Col flex={14}>{question.answerB}</Col>
                  <Col flex={1}>
                    {showAnswer ? (
                      <>
                        {question.correctAnswer === 'B' ? (
                          <CheckOutlined />
                        ) : (
                          <CloseOutlined />
                        )}
                      </>
                    ) : null}
                  </Col>
                </Row>
              </Card>
            </Col>
          )}
          {question.answerC && (
            <Col span={12} style={{ paddingBottom: 16, borderRadius: '10px' }}>
              <Card
                bordered={false}
                style={{
                  backgroundColor: '#FFBF00',
                  height: 150,
                  color: 'white',
                  fontSize: 25,
                  borderRadius: '5px',
                  ...(showAnswer
                    ? question.correctAnswer === 'C'
                      ? {}
                      : { opacity: '0.3' }
                    : {}),
                }}
              >
                <Row>
                  <Col flex={14}>{question.answerC}</Col>
                  <Col flex={1}>
                    {showAnswer ? (
                      <>
                        {question.correctAnswer === 'C' ? (
                          <CheckOutlined />
                        ) : (
                          <CloseOutlined />
                        )}
                      </>
                    ) : null}
                  </Col>
                </Row>
              </Card>
            </Col>
          )}
          {question.answerD && (
            <Col span={12} style={{ paddingBottom: 16, borderRadius: '10px' }}>
              <Card
                bordered={false}
                style={{
                  backgroundColor: 'green',
                  height: 150,
                  color: 'white',
                  fontSize: 25,
                  borderRadius: '5px',
                  ...(showAnswer
                    ? question.correctAnswer === 'D'
                      ? {}
                      : { opacity: '0.3' }
                    : {}),
                }}
              >
                <Row>
                  <Col flex={14}>{question.answerD}</Col>
                  <Col flex={1}>
                    {showAnswer ? (
                      <>
                        {question.correctAnswer === 'D' ? (
                          <CheckOutlined />
                        ) : (
                          <CloseOutlined />
                        )}
                      </>
                    ) : null}
                  </Col>
                </Row>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}

export default Question;
