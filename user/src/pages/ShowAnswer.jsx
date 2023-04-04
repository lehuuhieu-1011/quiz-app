import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';

const { Title } = Typography;

function ShowAnswer({ username, answer }) {
  return (
    <>
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
        {answer ? (
          <>
            <Title>Correct</Title>
            <CheckCircleTwoTone
              twoToneColor="#52c41a"
              style={{ fontSize: 70 }}
            />
          </>
        ) : (
          <>
            <Title>Wrong</Title>
            <CloseCircleTwoTone twoToneColor="red" style={{ fontSize: 70 }} />
          </>
        )}
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

export default ShowAnswer;
