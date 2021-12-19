import { DeleteFilled, EditFilled, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Space, Spin, Typography, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { HandleImage } from '../Helper/HandleImage';
import HandleLogout from '../Helper/HandleLogout';
import { OpenNotification } from '../Helper/HandleNotify';
import { CheckRoleToken, CheckToken } from '../Helper/HandleToken';

const { Title } = Typography;

function ManageQuestion() {
    const { idCourse } = useParams();

    const [form] = useForm();

    const [listQuestion, setListQuestion] = useState([]);
    const [nameCourse, setNameCourse] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingForm, setLoadingForm] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const [titleModal, setTitleModal] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const checkToken = CheckToken();
    const checkRoleToken = CheckRoleToken('Admin');

    useEffect(() => {
        if (!checkToken) {
            OpenNotification('Login', 'error', 'Please Login');
            HandleLogout();
        } else {
            if (!checkRoleToken) {
                OpenNotification('Permission', 'error', 'Your account dont have permission');
                navigate('/');
            }
        }
    }, [checkRoleToken, checkToken, navigate]);

    useEffect(() => {
        const apiGetCourse = `https://localhost:5001/api/CourseQuiz/${idCourse}`;
        axios({
            url: apiGetCourse,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                setNameCourse(res.data.name);
            })
            .catch((error) => console.log(error));

        const apiGetQuestion = `https://localhost:5001/api/GetAllQuestionByIdCourse/${idCourse}`;
        axios({
            url: apiGetQuestion,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                setListQuestion(res.data);
            })
            .catch((error) => console.log(error));
        setLoading(false);
    }, [idCourse, token, loading]);

    const fillQuestion = async (idQuestion) => {
        const api = `https://localhost:5001/api/QuestionQuiz/${idQuestion}`;
        const response = await axios({
            method: 'GET',
            url: api,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
        form.setFieldsValue({
            id: data.id,
            courseId: data.courseId,
            question: data.question,
            answerA: data.answerA,
            answerB: data.answerB,
            answerC: data.answerC,
            answerD: data.answerD,
            correctAnswer: data.correctAnswer,
            point: data.point,
        });
        setImageUrl(data.image);
        setLoadingForm(false);
    };

    let imageFile = '';

    const onChangeImage = (e) => {
        imageFile = e?.fileList[0]?.originFileObj;
        if (imageUrl) {
            document.querySelector('div .ant-space-item').style.display = 'none';
        }
    };

    const confirmDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure delete this question?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                return new Promise((resolve, reject) => {
                    const api = `https://localhost:5001/api/QuestionQuiz/${id}`;
                    axios({
                        method: 'DELETE',
                        url: api,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(() => {
                            resolve();
                            setLoading(true);
                        })
                        .catch((error) => {
                            reject();
                            console.log(error);
                        });
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const onFinish = (value) => {
        setLoadingSubmit(true);
        if (imageFile) {
            value.image = HandleImage(imageFile);
        } else {
            value.image = document.getElementById('oldImage')?.src;
        }
        value.courseId = idCourse;
        if (titleModal === 'Create Course') {
            const api = 'https://localhost:5001/api/QuestionQuiz';
            axios({
                method: 'POST',
                url: api,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: value,
            })
                .then(() => {
                    setLoading(true);
                    setLoadingSubmit(false);
                    setIsModalVisible(false);
                    form.resetFields();
                })
                .catch((error) => console.log(error));
        } else if (titleModal === 'Update Course') {
            const api = `https://localhost:5001/api/QuestionQuiz/${value.id}`;
            axios({
                method: 'PUT',
                url: api,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: value,
            })
                .then(() => {
                    setLoading(true);
                    setLoadingSubmit(false);
                    setIsModalVisible(false);
                    form.resetFields();
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <>
            <div className="container">
                {loading ? (
                    <div className="spin">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        <Title style={{ textAlign: 'center' }}>{nameCourse}</Title>
                        <Button
                            type="primary"
                            onClick={() => {
                                setTitleModal('Create Course');
                                setIsModalVisible(true);
                            }}
                        >
                            Create Question
                        </Button>
                        <hr />
                        {listQuestion.map((x, index) => (
                            <div key={x.id}>
                                <Row>
                                    <Col span={22}>
                                        <Title level={3}>
                                            {index + 1}.{' '}
                                            {x.image === '' || x.image === null ? (
                                                ''
                                            ) : (
                                                <>
                                                    <img src={x.image} alt={x.id} style={{ width: '100px', padding: '10px' }} />
                                                </>
                                            )}
                                            {x.question}
                                        </Title>
                                    </Col>
                                    <Col span={2}>
                                        <DeleteFilled
                                            style={{ color: 'red', fontSize: '25px', marginRight: '20px', cursor: 'pointer' }}
                                            onClick={() => {
                                                confirmDelete(x.id);
                                            }}
                                        />
                                        <EditFilled
                                            style={{ fontSize: '25px', color: 'green', marginRight: '20px', cursor: 'pointer' }}
                                            onClick={() => {
                                                setTitleModal('Update Course');
                                                setLoadingForm(true);
                                                fillQuestion(x.id);
                                                setIsModalVisible(true);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <div style={{ marginLeft: 40 }}>
                                    {x.answerA && <Title level={5}>A. {x.answerA}</Title>}
                                    {x.answerB && <Title level={5}>B. {x.answerB}</Title>}
                                    {x.answerC && <Title level={5}>C. {x.answerC}</Title>}
                                    {x.answerD && <Title level={5}>D. {x.answerD}</Title>}
                                </div>
                                <hr />
                            </div>
                        ))}
                    </>
                )}
            </div>

            <>
                {loadingForm ? (
                    <div className="spin">
                        <Spin size="large" />
                    </div>
                ) : (
                    <Modal
                        title={titleModal}
                        visible={isModalVisible}
                        onCancel={() => {
                            setIsModalVisible(false);
                            setImageUrl('');
                            form.resetFields();
                        }}
                        footer={false}
                        maskClosable={false}
                    >
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            onFinish={onFinish}
                            onFinishFailed={(errorInfo) => {
                                console.log('Failed: ', errorInfo);
                            }}
                            form={form}
                        >
                            <Form.Item hidden={true} name="id">
                                <Input />
                            </Form.Item>
                            <Form.Item hidden={true} name="courseId">
                                <Input />
                            </Form.Item>
                            <Form.Item name="question" label="Question" rules={[{ required: true, message: 'Please input question' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="answerA" label="Answer A" rules={[{ required: true, message: 'Please input answerA' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="answerB" label="Answer B" rules={[{ required: true, message: 'Please input answerB' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="answerC" label="Answer C">
                                <Input />
                            </Form.Item>
                            <Form.Item name="answerD" label="Answer D">
                                <Input />
                            </Form.Item>
                            <Form.Item name="correctAnswer" label="Correct Answer" rules={[{ required: true, message: 'Please input correct answer' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Image">
                                <Space size={12}>
                                    {imageUrl && <img alt="" width={80} src={imageUrl} id="oldImage" />}
                                    <div style={{ width: 300 }}>
                                        <Upload listType="picture" beforeUpload={() => false} maxCount={1} onChange={onChangeImage}>
                                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                                        </Upload>
                                    </div>
                                </Space>
                            </Form.Item>
                            <Form.Item
                                name="point"
                                label="Point"
                                rules={[
                                    ({ _ }) => ({
                                        validator(_, value) {
                                            if (!(value > 0)) {
                                                return Promise.reject('Please input a valid number');
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                                <Button type="primary" htmlType="submit" loading={loadingSubmit}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                )}
            </>
        </>
    );
}

export default ManageQuestion;
