import classNames from 'classnames/bind'
import { useState, useEffect } from 'react';
import styles from './Post.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Button from "../../components/Button/Button.jsx"
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import createSlug from '../../utils/createSlug';
import { useSelector } from 'react-redux';
import { routes } from '../../routes/routes';
import { openMessage } from "../../utils/openMessage"
import calTimeRead from '../../utils/calTimeRead';
import { postPost } from '../../api/postApi';
import * as postApi from '../../api/postApi'

const cx = classNames.bind(styles)

function NewPost() {
    const param = useParams()
    const [post, setPost] = useState({})
    const blog = useSelector(state => state.post)
    const [thumb, setThumb] = useState("")
    const [text, setText] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            const data = await postApi.getPost(param.slug)
            setPost(data)
            setText(data.text)
            setThumb(data.thumb)
            // setThumb(post.thumb)
            // setText(post.text)
        }
        if (param.slug)
            fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const navigate = useNavigate()
    const handleBack = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Your post is not saved. Continue quit?") === true) {
            navigate("/")
        }
    }
    const handleSave = async () => {
        const editedPost = {
            slug: post.slug,
            title: formik.values.title,
            desc: formik.values.desc,
            thumb: thumb,
            text: text,
            timeUpdate: post.timeUpdate,
            timeRead: calTimeRead(text),
            comments: post.comments
        }
        postApi.putPost(post.slug, editedPost)
        await openMessage("Loading...", "Edited !")
        navigate(routes.blog)
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: post.title || "",
            desc: post.desc || "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required!'),
            desc: Yup.string().required('Description is required!')
        }),
        onSubmit: async () => {
            const currentdate = new Date()
            const newPost = {
                slug: createSlug(formik.values.title),
                title: formik.values.title,
                desc: formik.values.desc,
                thumb: thumb,
                text: text,
                timeUpdate: currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear(),
                timeRead: calTimeRead(text),
                comments: []
            }
            await openMessage("Loading...", "Create success!")
            // dispatch(addPost(newPost))
            postPost(newPost)
            navigate(routes.blog)
        }
    })
    return (
        <div className={cx('wrapper', 'new-post')}>
            <div className={cx('back-icon')} onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <form id='post-form' onSubmit={formik.handleSubmit}>
                <div className={cx('blog-header')}>
                    <input
                        className={cx('title')}
                        id="title"
                        placeholder="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.title &&
                        <div className='error'>{formik.errors.title}</div>
                    }
                    <textarea
                        className={cx('description')}
                        placeholder="Description"
                        id='desc'
                        value={formik.values.desc}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.desc &&
                        <div className='error'>{formik.errors.desc}</div>
                    }
                </div>
                <div className={cx('body')}>
                    <label htmlFor='post-thumb' className={cx('thumb-btn')}>
                        Choose thumb
                    </label>
                    <input
                        type="file" id='post-thumb'
                        style={{ display: 'none' }} accept="image/*"
                        onChange={(e) => {
                            if (e.target.files)
                                setThumb(URL.createObjectURL(e.target.files[0]))
                        }}
                    />
                    {thumb &&
                        <div className={cx('thumb')}>
                            <img src={thumb} alt="" />
                            <FontAwesomeIcon
                                icon={faXmark}
                                className={cx('delete-thumb')}
                                onClick={() => { setThumb("") }}
                            />
                        </div>
                    }
                    <div className={cx('content')}>
                        <CKEditor
                            editor={Editor}
                            data={text}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setText(data)
                            }}
                        />
                    </div>
                </div>
                {param.slug ?
                    <div className={cx('submit-btn')}>
                        <Button text="Save" onClick={handleSave} type="button" />
                    </div>
                    :
                    <div className={cx('submit-btn')}>
                        <Button text="Create" type='submit' />
                    </div>
                }
            </form>
        </div>
    );
}

export default NewPost;