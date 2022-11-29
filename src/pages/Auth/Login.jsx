import classnames from 'classnames/bind';
import Button from '../../components/Button/Button';
import PageTitle from '../../components/PageTitle/PageTitle';
import styles from './Auth.module.scss';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/userSlice'
import { message } from 'antd';
import { routes } from '../../routes/routes'
import * as usersApi from "../../api/usersApi"

const cx = classnames.bind(styles)

function Login() {
    const [accounts, setAccounts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await usersApi.getAll()
            setAccounts(data)
        }
        fetchData()
    }, [])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toggleHidePassword = () => {
        if (passRef.current.type === "password") {
            passRef.current.type = "text";
        } else {
            passRef.current.type = "password";
        }
    }
    const handleLogin = async () => {
        const name = accRef.current.value
        const pass = passRef.current.value
        const checkAccount = accounts.find((user) => {
            return user.username === name
        })
        let isError = true
        if (checkAccount && checkAccount.pass === pass) {
            localStorage.setItem('user', JSON.stringify(checkAccount))
            dispatch(userLogin(checkAccount))
            navigate('/')
            isError = false
        }
        if (isError) {
            message.error('Wrong user name and password!')
        }

    }
    const passRef = useRef()
    const accRef = useRef()
    return (
        <div className={cx('wrapper')}>
            <PageTitle
                title='Login'
                desc='Login to write your blog'
                padding={false}
                className={cx('title')}
            />
            <div className={cx('form')}>
                <div className={cx('field')}>
                    <label className={cx('label')} htmlFor='username'>Username</label>
                    <input
                        type="text"
                        id='username'
                        className={cx('input')}
                        placeholder="Enter your username"
                        ref={accRef}
                    />
                </div>
                <div className={cx('field')}>
                    <label className={cx('label')} htmlFor='password'>Password</label>
                    <input
                        ref={passRef}
                        type="password"
                        id='password'
                        className={cx('input')}
                        placeholder="Enter your password"
                    />
                    <div className={cx('toggle-pass')}>
                        <input type="checkbox" id='toggle-pass' onClick={toggleHidePassword} />
                        <label htmlFor='toggle-pass'>Show Password</label>
                    </div>
                </div>
                <div className={cx('login-btn')}>
                    <Button onClick={handleLogin} text='Login' />
                </div>
                <div className={cx('navigate-signup')}>
                    <span>Don't have an accounts?</span>
                    <span className={cx('navigate')} onClick={() => { navigate(routes.signup) }}>Sign up</span>
                </div>
            </div>
        </div>
    );
}

export default Login;