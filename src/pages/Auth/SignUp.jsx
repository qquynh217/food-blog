import classnames from 'classnames/bind';
import PageTitle from '../../components/PageTitle/PageTitle';
import styles from './Auth.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { message } from 'antd';
import * as userApi from '../../api/usersApi';

const cx = classnames.bind(styles)

function SignUp() {
    const [accounts, setAccounts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await userApi.getAll()
            setAccounts(data)
        }
        fetchData()
    }, [])
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            password: "",
            confirmpass: "",
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required("Full name is required"),
            username: Yup.string().required("Username is required").test({
                name: 'is-Exist',
                skipAbsent: true,
                test(value, ctx) {
                    for (let i in accounts) {
                        if (value === accounts[i].username)
                            return ctx.createError({ message: "Username already exist" })
                    }
                    return true
                }
            }),
            password: Yup.string().required("Password is required").min(6, "Must be at least 6 characters"),
            confirmpass: Yup.string().required("Confirm password is required").oneOf([Yup.ref('password'), null], "Password must match")
        }),
        onSubmit: async (values) => {
            const newAccount = {
                fullName: formik.values.fullname,
                username: formik.values.username,
                pass: formik.values.password,
                role: 'user'
            }
            userApi.postAccount(newAccount)
            message.success('Success!')
            setTimeout(() => {
                navigate(routes.login)
            }, 1000)
        }
    })
    const toggleHidePassword = () => {
        if (passRef.current.type === "password") {
            passRef.current.type = "text";
            confirmPassRef.current.type = "text"
        } else {
            passRef.current.type = "password";
            confirmPassRef.current.type = "password";
        }
    }
    const passRef = useRef();
    const confirmPassRef = useRef();
    return (
        <div className={cx('wrapper')}>
            <PageTitle
                title='Sign Up'
                desc='Create your account, write your blog'
                padding={false}
                className={cx('title')}
            />
            <form className={cx('form')} onSubmit={formik.handleSubmit}>
                <div className={cx('field')}>
                    <label className={cx('label')} htmlFor='fullname'>Full name</label>
                    <input
                        type="text"
                        id='fullname'
                        className={cx('input')}
                        placeholder="Enter your full name"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.fullname &&
                        <div className={cx('error')}>
                            <span>{formik.errors.fullname}</span>
                        </div>
                    }
                </div>
                <div className={cx('field')}>
                    <label className={cx('label')} htmlFor='username'>Username</label>
                    <input
                        type="text"
                        id='username'
                        className={cx('input')}
                        placeholder="Enter your username"
                        value={formik.values.username.trim()}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.username &&
                        <div className={cx('error')}>
                            <span>{formik.errors.username}</span>
                        </div>
                    }
                </div>
                <div className={cx('field')}>
                    <label className={cx('label')} htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id='password'
                        className={cx('input')}
                        placeholder="Enter your password"
                        ref={passRef}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password &&
                        <div className={cx('error')}>
                            <span>{formik.errors.password}</span>
                        </div>
                    }
                </div>
                <div className={cx('field')}>
                    <label className={cx('label')} htmlFor='confirmpass'>Confirm password</label>
                    <input
                        type="password"
                        id='confirmpass'
                        className={cx('input')}
                        placeholder="Enter your password"
                        ref={confirmPassRef}
                        value={formik.values.confirmpass}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.confirmpass &&
                        <div className={cx('error')}>
                            <span>{formik.errors.confirmpass}</span>
                        </div>
                    }
                    <div className={cx('toggle-pass')}>
                        <input type="checkbox" id='toggle-pass' onClick={toggleHidePassword} />
                        <label htmlFor='toggle-pass'>Show Password</label>
                    </div>
                </div>
                <div className={cx('login-btn')}>
                    <Button type='submit' text='Create account' />
                </div>
            </form>
        </div>
    );
}

export default SignUp;