import { Layout } from 'antd';

const { Footer } = Layout;

const LayoutFooter = () => {
    return (
        <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </div>
    );
};

export default LayoutFooter;
