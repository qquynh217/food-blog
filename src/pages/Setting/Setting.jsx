import { Col, Row, Divider, Modal } from 'antd';
import classNames from 'classnames/bind'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import styles from './Setting.module.scss'
import ChangePassword from './ChangePassword'
import { openMessage } from '../../utils/openMessage';
import { putAccount } from '../../api/usersApi';
import { getUser } from '../../api/usersApi';
import { changeInfo } from '../../store/userSlice';

const cx = classNames.bind(styles)

function Setting() {
    const userState = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [user, setUser] = useState({})
    const [avatar, setAvatar] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            const data = getUser(userState.username)
            setUser(data)
            setAvatar(user.avatar)
        }
        fetchData()
    }, [userState, user])
    const [newpass, setNewpass] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        await openMessage("Loading", "Cập nhật thành công")
        const updateAccount = { ...user }
        updateAccount.pass = newpass
        putAccount(user.username, updateAccount)
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: user.fullName,
            username: user.username,
            bio: user.bio,
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Full name is required'),
            username: Yup.string(),
            bio: Yup.string(),
        }),
        onSubmit: async (values) => {
            const uploadUser = {
                fullName: formik.values.fullName,
                bio: formik.values.bio,
                avatar: avatar
            }
            const updateAccount = { ...user }
            updateAccount.fullName = formik.values.fullName
            updateAccount.bio = formik.values.bio
            updateAccount.avatar = avatar
            await openMessage("Loading...", "Cập nhật thành công")
            setUser(updateAccount)
            putAccount(user.username, updateAccount)
            dispatch(changeInfo(uploadUser))
        }
    })
    return (
        <div className='grid wide'>
            <div className={cx('wrapper')}>
                <h1 className={cx('title')}>Your information</h1>
                <Divider style={{ margin: "5px 0 10px", borderColor: '#7b7b7b' }} />
                <form className='infoform' onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col className={cx('avatar-field')} sm={{ span: 6 }} xs={{ span: 24 }}>
                            {avatar ?
                                <img src={avatar} alt="" className={cx('avatar')}></img>
                                :
                                <div
                                    className={cx('avatar')}
                                    style={{ color: '#7f5a4b', backgroundColor: '#E8E3E1' }}
                                >U</div>
                            }
                            <Button type="button" small className={cx('input-ava')}>
                                <label htmlFor='avatar'>
                                    Change avatar
                                </label>
                            </Button>
                            <input
                                style={{ display: "none" }}
                                id='avatar'
                                className={cx('input')}
                                type="file"
                                accept='image/*'
                                onChange={(e) => {
                                    const src = URL.createObjectURL(e.target.files[0])
                                    setAvatar(src)
                                }}
                            />
                        </Col>
                        <Col flex={'auto'} className={cx('infor')} >
                            <label>Username*</label>
                            <input
                                disabled
                                name='username'
                                className={cx('input')}
                                type="text"
                                value={formik.values.username}
                            />
                            <label>Full name</label>
                            <input
                                className={cx('input')}
                                type="text"
                                name='fullName'
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.fullName &&
                                <div className={cx('error')}>
                                    <span>{formik.errors.fullName}</span>
                                </div>
                            }
                            <label>Bio</label>
                            <textarea
                                className={cx('input', 'bio')}
                                name='bio'
                                value={formik.values.bio}
                                onChange={formik.handleChange}
                            />
                            <Row gutter={20}>
                                <Col span={12} >
                                    <label>Password*</label>
                                    <input
                                        disabled
                                        type='password'
                                        name='password'
                                        className={cx('input')}
                                        value={user.pass}
                                    />
                                </Col>
                                <Col span={12} style={{ position: 'relative' }}>
                                    <Button
                                        type="button"
                                        className={cx('change-pass-btn')} small
                                        onClick={showModal}
                                    >Change</Button>
                                    {isModalOpen && <Modal
                                        title="Thay đổi mật khẩu"
                                        open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                        footer={[
                                            <Button small onClick={handleCancel}>Cancel</Button>,
                                            <Button
                                                className={cx({ 'disable': !newpass })}
                                                small primary
                                                onClick={handleOk}>Save</Button>
                                        ]}
                                    >
                                        <ChangePassword password={user.pass} setNewpass={setNewpass} />
                                    </Modal>}
                                </Col>
                            </Row>
                            <Button
                                type="submit" small
                                className={cx('save-btn')}
                            >Save</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    );
}

export default Setting;