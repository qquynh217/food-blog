import classnames from 'classnames/bind';
import Button from '../../../components/Button/Button';
import styles from './Footer.module.scss';
import { FacebookIcon, InstagramIcon, PinterestIcon, TwitterIcon } from '../../../assets/icons';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const cx = classnames.bind(styles)

function Footer() {
    const re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    const [isSubcribe, setIsSubcribe] = useState(false)
    const formik = useFormik({
        initialValues: {
            emailFooter: ''
        },
        validationSchema: Yup.object({
            emailFooter: Yup.string().required('Email is required').matches(re, 'Please enter a valid email address')
        }),
        onSubmit: () => {
            setIsSubcribe(true)
        }
    })
    return (
        <footer className={cx('wrapper')}>
            <h2 className={cx('title')}>Subscribe for our newletters</h2>
            {isSubcribe ?
                <div className={cx('thanks')}>
                    <span>Thank you!</span>
                </div>
                :
                <form className={cx('footer-form')} onSubmit={formik.handleSubmit}>
                    <div className={cx('input')}>
                        <label htmlFor="footer-input">Email address*</label>
                        <input
                            id='emailFooter'
                            placeholder='Your email address'
                            value={formik.values.emailFooter}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.emailFooter &&
                            <div className={cx('error')}>{formik.errors.emailFooter}</div>
                        }
                    </div>
                    <Button type="submit" text="Subscribe" className={cx('submit-btn')} />
                </form>
            }
            <div className={cx('social-icons')}>
                <InstagramIcon className={cx('icon')} />
                <FacebookIcon className={cx('icon')} />
                <TwitterIcon className={cx('icon')} />
                <PinterestIcon className={cx('icon')} />
            </div>
        </footer>
    );
}

export default Footer;