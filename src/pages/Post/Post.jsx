import classNames from 'classnames/bind'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './Post.module.scss'
import ReactMarkdown from 'react-markdown'
import { Divider, Avatar } from "antd"
import Comment from '../../components/Comment/Comment';
import { useState, useEffect } from 'react';
import * as postApi from "../../api/postApi"
import Button from '../../components/Button/Button';

const cx = classNames.bind(styles)

function Post() {
    const param = useParams()
    const [post, setPost] = useState({})
    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchData = async () => {
            const data = await postApi.getPost(param.slug)
            setPost(data)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const user = useSelector(state => state.user)
    const [comment, setComment] = useState("")
    const sendComment = () => {
        const currentdate = new Date()
        const newComment = {
            user: user.username,
            content: comment,
            time: currentdate.getDate() + "/" + (currentdate.getMonth() + 1)
                + "/" + currentdate.getFullYear() + " - "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" + currentdate.getSeconds()
        }
        const updatePost = { ...post }
        updatePost.comments = [...post.comments, newComment]
        setPost(updatePost);
        postApi.postComment(post.slug, newComment)
        setComment("")
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('blog-header')}>
                <h1 className={cx('title')}>{post.title}</h1>
                <p className={cx('description')}>
                    {post.desc}
                </p>
                <div className={cx('time')}>
                    <span className={cx('time-update')}>{post.timeUpdate}</span>
                    <span className={cx('time-read')}>{post.timeRead} phút</span>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('thumb')}>
                    <img src={post.thumb} alt="" />
                </div>
                <div className={cx('content')}>
                    <ReactMarkdown children={post.text} />
                </div>
            </div>
            <Divider />
            <div className={cx('comments-container')}>
                {user.isLogin &&
                    <div className={cx('comment-input')}>
                        <div className={cx('avatar')}>
                            {user.avatar ?
                                <Avatar size={48} src={user.avatar} />
                                :
                                <Avatar
                                    size={48}
                                    style={{ color: '#7f5a4b', backgroundColor: '#E8E3E1' }}
                                >U</Avatar>
                            }
                        </div>
                        <div className={cx('input-field')}>
                            <textarea
                                id="comment-input"
                                placeholder='Write your comment'
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value)
                                }}
                            />
                            <Button small onClick={sendComment}>Send</Button>
                        </div>
                    </div>}
                <ul className={cx('comments-list')}>
                    {post.comments &&
                        post.comments.map((item, id) => {
                            return (
                                <li >
                                    <Comment item={item} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default Post;