import classnames from 'classnames/bind';
import PageTitle from '../../components/PageTitle/PageTitle';
import styles from './HomePage.module.scss';
import { Col, Row } from 'antd'
import React from 'react';
import PostItem from '../../components/PostItem/PostItem';
import Button from '../../components/Button/Button'
import { routes } from '../../routes/routes';
import { useState, useEffect } from "react";
import * as postApi from "../../api/postApi"

const cx = classnames.bind(styles)

function HomePage() {
    const [blog, setBlog] = useState([])
    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchData = async () => {
            const data = await postApi.getAll()
            setBlog(data)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={cx('wrapper')}>
            <PageTitle
                title='The culinary journey in Nam Định'
                desc='Join me for reflections and delicious recipes'
            />
            <Row gutter={80} className={cx('blog-container')}>
                {blog.slice(1, 5).map((post, index) => {
                    return (
                        <Col key={index} md={{ span: 12 }} span={24} className={cx('blog-col')}>
                            <PostItem item={post} />
                        </Col>
                    )
                })}
            </Row>
            <div className={cx('blog-btn')}>
                <Button
                    text='More arcticle'
                    to={routes.blog}
                />
            </div>
        </div>
    );
}

export default HomePage;