import { ExclamationCircleFilled, UploadOutlined } from '@ant-design/icons/lib/icons';
import { Button, Form, Input, Modal, Space, Spin, Table, Tag, Typography, Upload } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { HandleImage } from '../Helper/HandleImage';
import HandleLogout from '../Helper/HandleLogout';
import { OpenNotification } from '../Helper/HandleNotify';
import { CheckRoleToken, CheckToken } from '../Helper/HandleToken';

const { Title } = Typography;

function ManageCourse() {
    const token = localStorage.getItem('token');

    const [form] = Form.useForm();

    const [courses, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState();
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [titleModal, setTitleModal] = useState();
    const [loadingForm, setLoadingForm] = useState(false);

    const navigate = useNavigate();

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
        const apiUrl = 'https://localhost:5001/api/CourseQuiz';
        axios({
            method: 'GET',
            url: apiUrl,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setCourse(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token, loading]);

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <Space size={12}>
                    <img src={record.image} alt={record.id} width={100} />
                    <Title level={5}>{record.name}</Title>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (value) => (
                <Space size="middle">
                    <Tag color="red" style={{ cursor: 'pointer' }} onClick={() => showDeleteConfirm(value.key)}>
                        DELETE
                    </Tag>
                    <Tag
                        color="blue"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setTitleModal('Update Course');
                            setIsModalVisible(true);
                            setLoadingForm(true);
                            fillEditForm(value.key);
                        }}
                    >
                        UPDATE
                    </Tag>
                    <Tag
                        color="green"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            navigate(`/manageQuestion/${value.key}`);
                        }}
                    >
                        DETAIL
                    </Tag>
                </Space>
            ),
        },
    ];

    const data = [];

    let index = 1;
    for (let i = 0; i < courses.length; i++) {
        data.push({
            key: courses[i].id,
            no: index,
            name: courses[i].name,
            image: courses[i].image,
        });
        index++;
    }

    const fillEditForm = (id) => {
        const api = `https://localhost:5001/api/CourseQuiz/${id}`;
        axios({
            method: 'GET',
            url: api,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const data = response.data;
                form.setFieldsValue({
                    id: data.id,
                    name: data.name,
                });
                setImageUrl(data.image);
                setLoadingForm(false);
            })
            .catch((error) => console.log(error));
        console.log(id);
    };

    let imageFile = '';

    const onChangeEditImage = (e) => {
        imageFile = e?.fileList[0]?.originFileObj;
        if (imageUrl) {
            document.querySelector('#basic > div .ant-space-item').style.display = 'none';
        }
    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            title: 'Are you want to delete this course?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                return new Promise((resolve, reject) => {
                    const api = `https://localhost:5001/api/CourseQuiz/${id}`;
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
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
    };

    const onFinish = (value) => {
        setLoadingSubmit(true);
        if (imageFile) {
            value.image = HandleImage(imageFile);
        } else {
            value.image = document.querySelector('#oldImage')?.src;
        }
        if (titleModal === 'Create Course') {
            console.log(value);
            const api = 'https://localhost:5001/api/CourseQuiz';
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
                .catch((error) => {
                    console.log(error);
                });
        } else if (titleModal === 'Update Course') {
            const api = `https://localhost:5001/api/CourseQuiz/${value.id}`;
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
        <div className="container">
            <Title style={{ textAlign: 'center' }}>Manage Course</Title>
            <Button
                type="primary"
                onClick={() => {
                    setTitleModal('Create Course');
                    setIsModalVisible(true);
                }}
                style={{ float: 'right', margin: 10 }}
            >
                Create Course
            </Button>
            {/* <Table loading={loading} bordered columns={columns} dataSource={data} pagination={{ defaultPageSize: 2 }}></Table> */}
            <Table loading={loading} bordered columns={columns} dataSource={data}></Table>

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
                {loadingForm ? (
                    <div className="spin">
                        <Spin size="large" />
                    </div>
                ) : (
                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        onFinish={onFinish}
                        onFinishFailed={(errorInfo) => {
                            console.log('Failed: ', errorInfo);
                        }}
                        form={form}
                    >
                        <Form.Item label="Id" name="id" hidden={true}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name course' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="Image">
                            <Space size={12}>
                                {imageUrl && <img id="oldImage" src={imageUrl} alt="" width={100} />}
                                <div style={{ width: 300 }}>
                                    <Upload listType="picture" beforeUpload={() => false} maxCount={1} onChange={onChangeEditImage}>
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                </div>
                            </Space>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                            <Button type="primary" htmlType="submit" loading={loadingSubmit}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
}

export default ManageCourse;
