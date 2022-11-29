import classnames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { truncateString } from '../../utils/truncated';
import styles from './PostItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Divider, Popover } from 'antd'
import { deletePost } from '../../api/postApi';

const cx = classnames.bind(styles)

function PostItem({ item, user, setBlog }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/post/${item.slug}`)
    }
    const handleDelete = () => {
        // eslint-disable-next-line no-restricted-globals
        const isDelete = confirm("Delete this post?")
        if (isDelete)
            deletePost(item.slug)
        setBlog([])
    }
    const handlEdit = () => {
        navigate(`/edit-post/${item.slug}`)
    }
    const content = (
        <div className={cx('popover-items')}>
            <p onClick={handleDelete}>Delete</p>
            <Divider />
            <p onClick={handlEdit}>Edit</p>
        </div>
    )
    return (
        <div className={cx('wrapper')}>
            <div className={cx('thumb')}>
                {item.thumb && <img src={item.thumb} alt="" />}
            </div>
            <div className={cx('post-infor')}>
                <div className={cx('title-menu')}>
                    <h2 className={cx('title')} onClick={handleClick}>{item.title}</h2>
                    {user && user.role === 'admin' &&
                        <Popover content={content} placement="right" trigger="click">
                            <FontAwesomeIcon className={cx('menu')} icon={faEllipsisVertical} />
                        </Popover>}
                </div>
                <p className={cx('desc')}>
                    {truncateString(item.desc)}
                </p>
                <div className={cx('time')}>
                    <span className={cx('time-update')}>{item.timeUpdate}</span>
                    <span className={cx('time-read')}>{item.timeRead} phút</span>
                </div>
            </div>
        </div>
    );
}

export default PostItem;