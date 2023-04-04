import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Question from './Question';
import ShowAnswer from './ShowAnswer';
import Waiting from './Waiting';
import WaitingToContinueQuestion from './WaitingToContinueQuestion';

function Start() {
  const navigate = useNavigate();

  document.body.style.background =
    'url("https://images-cdn.kahoot.it/acf73135-050e-4126-b172-d0dbb436012e")';
  document.body.style.backgroundSize = 'cover';

  const [ready, setReady] = useState(false);
  const [question, setQuestion] = useState();
  const [courseId, setCourseId] = useState('');
  // const question = useRef([]);
  // const courseId = useRef('');

  const [answer, setAnswer] = useState(true);

  const username = localStorage.getItem('username');
  const roomId = localStorage.getItem('roomId');

  const [waitingToContinueQuestion, setWaitingToContinueQuestion] =
    useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/chatHub')
      .build();

    (async () => {
      try {
        await connection.start();
        console.log('Connected!');
        await connection.invoke('JoinRoom', { username, roomId });
      } catch (error) {
        console.log('Connect failed: ', error);
      }
    })();

    connection.on('ReceiveMessage', (message) => {
      console.log(message);
    });

    connection.on('Question', (_courseId, _question) => {
      console.log(_courseId, _question);
      setQuestion(_question);
      setCourseId(_courseId);
      // question.current = _question;
      // courseId.current = _courseId;
      setReady(true);
      setWaitingToContinueQuestion(false);
      setShowAnswer(false);
    });

    connection.on('EndGame', (message) => {
      console.log(message);
      navigate('/score');
    });

    connection.on('QuestionTimeout', (message) => {
      console.log(message);
      setShowAnswer(true);
    });
  }, [roomId, username, navigate]);

  return (
    <>
      {ready ? (
        // <Question courseId={courseId.current} question={question.current} />
        waitingToContinueQuestion ? (
          showAnswer ? (
            <ShowAnswer username={username} answer={answer} />
          ) : (
            <WaitingToContinueQuestion username={username} />
          )
        ) : (
          <Question
            courseId={courseId}
            question={question}
            setWaitingToContinueQuestion={setWaitingToContinueQuestion}
            setAnswer={setAnswer}
            username={username}
          />
        )
      ) : (
        <Waiting username={username} />
      )}
    </>
  );
}

export default Start;
