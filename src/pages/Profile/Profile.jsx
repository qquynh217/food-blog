import classNames from 'classnames/bind'
import styles from './Profile.module.scss'
// import PostItemProfile from "../../components/PostItem/PostItemProfile"
import { useSelector } from 'react-redux'
import { Avatar, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { getUser } from '../../api/usersApi'
import * as postApi from "../../api/postApi"
import PostItemProfile from '../../components/PostItem/PostItemProfile'


const cx = classNames.bind(styles)

function Profile() {
    const userState = useSelector((state) => state.user)
    const [user, setUser] = useState({})
    const [blog, setBlog] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = getUser(userState.username)
            const blogData = await postApi.getAll()
            setUser(data)
            setBlog(blogData)
        }
        fetchData()
    }, [userState.username, blog])
    return (
        <div className={cx('wrapper')}>
            <Row gutter={40}>
                <Col span={6}>
                    <div className={cx('user-info')}>
                        {user.avatar ?
                            <img src={user.avatar} alt="" className={cx('avatar')}></img>
                            :
                            <Avatar
                                className={cx('avatar')}
                                style={{ color: '#7f5a4b', backgroundColor: '#E8E3E1' }}
                            ><p>U</p></Avatar>
                        }
                        <h2 className={cx('full-name')}>{user.fullName}</h2>
                        <h3 className={cx('user-name')}>@{user.username}</h3>
                        <p className={cx('bio')}>{user.bio}</p>
                    </div>
                </Col>
                <Col span={18}>
                    <div className={cx('user-project')}>
                        <h1 className={cx('title')}>Blogs</h1>
                        <div className={cx('project-container')}>
                            {blog.slice(1).slice(-3).map((post, id) => {
                                return (
                                    <PostItemProfile item={post} key={id} />
                                )
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
