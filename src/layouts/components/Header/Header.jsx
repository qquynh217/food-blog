import classnames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import styles from './Header.module.scss'
import { useSelector } from 'react-redux';
import { Avatar, Dropdown } from 'antd';
import MenuItem from '../../../components/MenuItem/MenuItem';
import { faGear, faFeather, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../store/userSlice';
import { useState, useEffect } from 'react';
import { getUser } from '../../../api/usersApi';

const cx = classnames.bind(styles)

function Header() {
    const userState = useSelector((state) => state.user)
    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            const data = getUser(userState.username)
            setUser(data)
        }
        fetchData()
    }, [userState, user])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const menuAdmin = [
        {
            label: <MenuItem text='Profile' icon={faUser} onClick={() => { navigate(routes.profile) }} />,
            key: '0',
        },
        { type: 'divider', },
        {
            label: <MenuItem text='Setting' icon={faGear} onClick={() => { navigate(routes.setting) }} />,
            key: '1',
        },
        { type: 'divider', },
        {
            label: <MenuItem text='Write blog' icon={faFeather} onClick={() => { navigate(routes.newpost) }} />,
            key: '2',
        },
        { type: 'divider', },
        {
            label:
                <MenuItem
                    text='Logout' icon={faRightFromBracket}
                    onClick={() => {
                        dispatch(userLogout())
                        navigate(routes.login)
                    }}
                />,
            key: '3',
        },
    ]
    const menuUser = [...menuAdmin]
    menuUser.splice(4, 2)
    return (
        <header className={cx('wrapper')}>
            <div className={cx("content")}>
                <Link to={routes.home}>
                    <div className={cx('logo')}>
                        <h2>Nam Định Specialties</h2>
                    </div>
                </Link>
                <div className={cx('nav-bar')}>
                    <NavLink
                        className={(nav) => cx('nav-item', { 'active': nav.isActive })}
                        to={routes.blog}
                    >
                        <span className={cx('item-content')}>Blog</span>
                    </NavLink>
                    <NavLink
                        className={(nav) => cx('nav-item', { 'active': nav.isActive })}
                        to={routes.about}
                    >
                        <span className={cx('item-content')}>About</span>
                    </NavLink>
                    <NavLink
                        className={(nav) => cx('nav-item', { 'active': nav.isActive })}
                        to={routes.contact}
                    >
                        <span className={cx('item-content')}>Contact</span>
                    </NavLink>
                    {
                        userState.isLogin ?
                            <Dropdown
                                menu={{ items: user.role === 'admin' ? menuAdmin : menuUser, }}
                                trigger={['click']}
                                placement='bottomRight'
                            >
                                <div className={cx('avatar')}>
                                    {user.avatar ?
                                        <Avatar size={40} src={user.avatar} />
                                        :
                                        <Avatar
                                            size={40}
                                            style={{ color: '#7f5a4b', backgroundColor: '#E8E3E1' }}
                                        >U</Avatar>
                                    }
                                </div>
                            </Dropdown>
                            :
                            <NavLink
                                className={(nav) => cx('nav-item', { 'active': nav.isActive })}
                                to={routes.login}
                            >
                                <span className={cx('item-content')}>Login</span>
                            </NavLink>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;