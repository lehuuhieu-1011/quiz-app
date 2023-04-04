import { UserOutlined } from '@ant-design/icons';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Question from './Question';
import ScoreBoard from './ScoreBoard';

function Waiting() {
  const navigate = useNavigate();

  const [connection, setConnection] = useState('');
  const [listUser, setListUser] = useState([]);
  const [start, setStart] = useState(false);
  // const courseId = useRef('');
  const [courseId, setCourseId] = useState('');
  // const question = useRef([]);
  const [question, setQuestion] = useState();
  // const pageNumber = useRef(1);
  const [pageNumber, setPageNumber] = useState(1);

  const roomId = localStorage.getItem('RoomId');
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/chatHub')
      .build();

    setConnection(connection);

    (async () => {
      try {
        await connection.start();
        console.log('Connected!');
      } catch (error) {
        console.log('Connect failed: ', error);
      }

      await connection
        .invoke('AdminRequest', roomId)
        .catch((error) => console.log(error));

      await connection
        .invoke('ListUserInRoom', roomId)
        .catch((error) => console.log(error));

      connection.on('ReceiveMessage', (message) =>
        console.log('ReceiveMessage ', message)
      );

      connection.on('ReceiveMessageAdmin', (message) =>
        console.log('ReceiveMessageAdmin ', message)
      );

      connection.on('UserInRoom', (users) => {
        console.log('UserInRoom ', users);
        setListUser(users);
      });

      connection.on('Question', (_courseId, _question) => {
        console.log(_courseId, _question);
        // question.current = _question;
        // courseId.current = _courseId;
        setQuestion(_question);
        setCourseId(_courseId);
        setStart(true);
      });
    })();

    return () => {
      localStorage.removeItem('RoomId');
      connection.stop();
    };
  }, [roomId]);

  const handleQuestion = (pageNumber) => {
    const courseId = localStorage.getItem('CourseId');
    console.log(pageNumber);
    setPageNumber(pageNumber);
    const api = `https://localhost:5001/api/GetAllQuestionByIdCoursePaging/${courseId}?pageNumber=${pageNumber}&pageSize=1`;
    axios({
      method: 'GET',
      url: api,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(async (res) => {
        console.log(res.data);
        if (res.data.length === 0) {
          await connection
            .invoke('EndGame', roomId)
            .catch((error) => console.log(error));

          // navigate('/scores');
          setEndGame(true);
        } else {
          await connection
            .invoke('ReceiveQuestion', roomId, courseId, res.data[0])
            .catch((error) => console.log(error));

          setShowScoreBoard(false);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {start ? (
        showScoreBoard ? (
          <ScoreBoard
            handleQuestion={handleQuestion}
            pageNumber={pageNumber}
            endGame={endGame}
          />
        ) : (
          <Question
            courseId={courseId}
            question={question}
            setShowScoreBoard={setShowScoreBoard}
            connection={connection}
            roomId={roomId}
          />
        )
      ) : (
        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div className="icons-list" style={{ display: 'flex' }}>
            <UserOutlined style={{ fontSize: 40 }} />
            <div style={{ fontSize: 20 }}>{listUser.length}</div>
          </div>
          <div>
            <h1 style={{ textAlign: 'center' }}>Room ID: {roomId}</h1>
            {listUser.length === 0 ? (
              <h4 style={{ textAlign: 'center' }}>Waiting for players ...</h4>
            ) : (
              <ul style={{ textAlign: 'center', listStyleType: 'none' }}>
                {listUser.map((user, index) => (
                  <li key={index}>
                    <h5>{user}</h5>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <Button
              type="primary"
              // onClick={() => handleQuestion(pageNumber.current)}
              onClick={() => handleQuestion(pageNumber)}
            >
              Start
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Waiting;
