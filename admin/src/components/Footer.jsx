import { Layout } from 'antd';

const { Footer } = Layout;

const LayoutFooter = () => {
    return (
        <div className="footer" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </div>
    );
};

export default LayoutFooter;
