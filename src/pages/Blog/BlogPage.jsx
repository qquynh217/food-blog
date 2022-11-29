import PageTitle from "../../components/PageTitle/PageTitle";
import classnames from 'classnames/bind';
import styles from './BlogPage.module.scss';
import { Col, Row } from "antd";
import PostItem from "../../components/PostItem/PostItem";
import { useState, useEffect } from "react";
import * as postApi from "../../api/postApi"
import { useSelector } from "react-redux";

const cx = classnames.bind(styles)

function BlogPage() {
    const [blog, setBlog] = useState([])
    const user = useSelector(state => state.user)
    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchData = async () => {
            const data = await postApi.getAll()
            setBlog(data)
        }
        fetchData()
    }, [blog])
    return (
        <div className={cx('wrapper')}>
            <PageTitle title='Blog' />
            <Row className={cx('post-container')} gutter={36}>
                {blog.slice(1).map((post) => {
                    return (
                        <Col key={post.slug} md={{ span: 8 }} className={cx('post-col')}>
                            <PostItem item={post} user={user} setBlog={setBlog} />
                        </Col>
                    )
                })}
            </Row>
        </div>
    );
}

export default BlogPage;