import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';

const { Title } = Typography;

function Score() {
  const [score, setScore] = useState(0);

  const username = localStorage.getItem('username');

  useEffect(() => {
    const api = `https://localhost:5001/api/StorageScores/GetScoreFromRedis/${localStorage.getItem(
      'username'
    )}`;
    axios({
      method: 'GET',
      url: api,
    })
      .then((res) => {
        setScore(res.data.score);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={{
        width: '100%',
        position: 'absolute',
        top: '0',
        bottom: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Title>{username}</Title>
      <Title level={2}> - {score} points - </Title>
      <Button
        onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}
      >
        Quit
      </Button>
    </div>
  );
}

export default Score;
