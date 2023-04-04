import { Space, Spin } from 'antd';
import { Footer } from 'antd/lib/layout/layout';

function WaitingToContinueQuestion({ username }) {
  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: '100%',
          position: 'absolute',
          top: '50%',
        }}
      >
        <Spin tip="Waiting for the result" size="large">
          <div className="content" />
        </Spin>
      </Space>

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

export default WaitingToContinueQuestion;
