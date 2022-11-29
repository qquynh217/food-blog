import classNames from 'classnames/bind'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Setting.module.scss'
const cx = classNames.bind(styles)


function ChangePassword({ password, setNewpass }) {
    const formik = useFormik({
        initialValues: {
            confirmpass: "",
            newpass: "",
        },
        validationSchema: Yup.object({
            confirmpass: Yup.string().required('Confirm password is required').test({
                name: 'is-Match',
                skipAbsent: true,
                test(value, ctx) {
                    if (value === password)
                        return true
                    return ctx.createError({ message: "Password not match" })
                }
            }),
            newpass: Yup.string().required('New password is required').min(6, "Must be at least 6 characters")
        })
    })
    if (!formik.errors.newpass)
        setNewpass(formik.values.newpass)
    return (
        <div className={cx('change-pass')}>
            <label>Password</label>
            <input
                type='password'
                name='confirmpass'
                className={cx('input')}
                value={formik.values.confirmpass}
                onChange={formik.handleChange}
            />
            {formik.errors.confirmpass &&
                <div className={cx('error')}>
                    <span>{formik.errors.confirmpass}</span>
                </div>
            }
            <label>New password</label>
            <input
                name='newpass'
                type='password'
                className={cx('input')}
                value={formik.values.newpass}
                onChange={formik.handleChange}
            />
            {formik.errors.newpass &&
                <div className={cx('error')}>
                    <span>{formik.errors.newpass}</span>
                </div>
            }
        </div>
    );
}

export default ChangePassword;