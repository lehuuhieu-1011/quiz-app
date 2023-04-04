import { Button, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function ScoreBoard({ handleQuestion, pageNumber, endGame }) {
  const navigate = useNavigate();
  const [listScore, setListScore] = useState([]);

  useEffect(() => {
    const api = 'https://localhost:5001/api/StorageScores/GetScoreFromRedis';
    axios({
      method: 'GET',
      url: api,
    })
      .then((res) => {
        setListScore(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <Button
        onClick={() => {
          if (endGame) {
            const api =
              'https://localhost:5001/api/StorageScores/RemoveAllDataInRedis';
            axios({
              method: 'DELETE',
              url: api,
            })
              .then(() => {
                navigate('/');
              })
              .catch((error) => console.log(error));
          } else {
            handleQuestion(++pageNumber);
          }
        }}
        style={{ float: 'right' }}
      >
        {endGame ? 'End Game' : 'Next Question'}
      </Button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Title>ScoreBoard</Title>
      </div>
      {listScore.map((item) => {
        return (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '20px',
              backgroundColor: 'darkgray',
              marginBottom: '15px',
            }}
          >
            <h4 style={{ margin: '5px 0px' }}>{item.username}</h4>
            <h4 style={{ margin: '5px 0px' }}>{item.score}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default ScoreBoard;
