import { Col, Row } from 'antd';
import classnames from 'classnames/bind';
import styles from './PostItem.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classnames.bind(styles)

function PostItemProfile({ item }) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/post/${item.slug}`)
    }
    return (
        <div className={cx('wrapper', 'profile')}>
            <Row>
                <Col span={16}>
                    <div className={cx('post-infor')}>
                        <h2 className={cx('title')} onClick={handleClick}>{item.title}</h2>
                        <p className={cx('desc')}>{item.desc}</p>
                        <div className={cx('time')}>
                            <span className={cx('time-update')}>{item.timeUpdate}</span>
                            <span className={cx('time-read')}>{item.timeRead} phút</span>
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div className={cx('thumb')}>
                        <img src={item.thumb} alt="" />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default PostItemProfile;