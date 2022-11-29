import { Col, Row } from 'antd';
import classnames from 'classnames/bind';
import styles from './PostItem.module.scss';

const cx = classnames.bind(styles)

function PostItemProfile() {
    return (
        <div className={cx('wrapper', 'profile')}>
            <Row>
                <Col span={16}>
                    <div className={cx('post-infor')}>
                        <h2 className={cx('title')}>Hot-cross buns and Easter fun</h2>
                        <p className={cx('desc')}>If you thought Easter was all about chocolate, you’re badly mistaken.</p>
                        <div className={cx('time')}>
                            <span className={cx('time-update')}>6/10/2021</span>
                            <span className={cx('time-read')}>1 min read</span>
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div className={cx('thumb')}>
                        <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=crop/thosn4c78/Group-mk3N38bV5EhG0arx.png" alt="" />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default PostItemProfile;