import "./Contact.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from '../../components/Button/Button'
import { openMessage } from "../../utils/openMessage";

function ContactPage() {
    const re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    const [countChar, setCountChar] = useState(0)
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            content: ""
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full name is required!").max(256, 'Full name less than 256 character'),
            email: Yup.string().required("Email is required!").max(256, 'Full name less than 256 character').matches(re, "Email format is not correct!"),
            content: Yup.string().max(500, 'Full name less than 500 character')
        }),
        onSubmit: () => {
            const infor = {
                fullName: formik.values.fullName,
                email: formik.values.email,
                content: formik.values.content,
            }
            openMessage('Loading...', 'Submitted successfully!')
        }
    })
    return (
        <div className="contact-wrapper">
            {/* <h1 className="contact-title">Contact us</h1> */}
            <PageTitle
                title='Contact us'
                desc='Please fill out the form below and send it'
            />
            {/* <p className="contact-detail">Please fill out the form below and send it</p>
            <p className="contact-detail">Our staff will contact you shortly</p> */}
            <form onSubmit={formik.handleSubmit} className="form-field">
                <div className="input-field">
                    <label htmlFor="fullName">Full Name*</label>
                    <input
                        className="contact-input"
                        type="text"
                        id="fullName"
                        placeholder="Enter your name"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.fullName &&
                        <div className="error">
                            {formik.errors.fullName}
                        </div>
                    }
                </div>
                <div className="input-field">
                    <label htmlFor="fullName">Email*</label>
                    <input
                        className="contact-input"
                        type="text"
                        id="email"
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email &&
                        <div className="error">
                            {formik.errors.email}
                        </div>
                    }
                </div>
                <div className="input-field">
                    <label htmlFor="fullName">Content*</label>
                    <textarea
                        className="contact-input"
                        type="text"
                        id="content"
                        placeholder="Type your message here"
                        value={formik.values.content}
                        onChange={(e) => {
                            if (e.target.value.length < 500)
                                formik.handleChange(e)
                            setCountChar(e.target.value.length)
                        }}
                    />
                    <div className="count-char">{countChar}/500</div>
                </div>
                {formik.errors.content &&
                    <div className="error">
                        {formik.errors.content}
                    </div>
                }
                {/* <button type="submit">Send</button> */}
                <Button className='submit-btn' text='Submit' type='submit' />
            </form>
        </div>
    );
}

export default ContactPage;