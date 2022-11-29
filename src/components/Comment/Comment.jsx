import { Avatar, Divider, Popover } from 'antd';
import classNames from 'classnames/bind'
import styles from './Comment.module.scss'
import * as userApi from "../../api/usersApi"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function Comment({ item }) {
    const user = useSelector(state => state.user)
    const [account, setAccount] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            const data = await userApi.getAll()
            setAccount(data.find(user => {
                return user.username === item.user
            }))
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleDelete = () => { }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                {account.avatar ?
                    <Avatar size={48} src={account.avatar} />
                    :
                    <Avatar
                        size={48}
                        style={{ color: '#7f5a4b', backgroundColor: '#E8E3E1' }}
                    >U</Avatar>
                }
            </div>
            <div className={cx('body')}>
                <div className={cx('content')}>
                    <p className={cx('user-name')}>{account.fullName}</p>
                    <div className={cx('text')}>
                        <p>{item.content}</p>
                    </div>
                    <p className={cx('time')}>{item.time}</p>
                    <Divider className={cx('divider')} />
                </div>
                <div className={cx('popover')}>
                    {user.username === item.user &&
                        <Popover
                            content={<p className={cx('popover-item')} onClick={handleDelete}>Delete</p>}
                            placement="right"
                            trigger="click"
                        >
                            <FontAwesomeIcon className={cx('popover-icon')} icon={faEllipsisVertical} />
                        </Popover>}
                </div>
            </div>
        </div>
    );
}

export default Comment;