import styles from "./About.module.scss"
import classNames from "classnames/bind";
import { Col, Row } from "antd"
import image1 from "../../assets/images/about1.jpg"
import image2 from "../../assets/images/about3.jpg"

const cx = classNames.bind(styles)

function AboutPage() {
    return (
        <div className={cx('wrapper')}>
            <Row gutter={40}>
                <Col span={14}>
                    <img src={image1} alt="" className={cx('banner-img')} />
                </Col>
                <Col span={10} className={cx('banner-column')}>
                    <p className={cx('banner-content')}>
                        Cách Hà Nội 100km, nằm ở phía Đông Nam, Nam Định đang lưu giữ và bảo tồn nhiều giá trị
                        văn hóa của quốc gia. Trải qua hàng ngàn năm lịch sử, nơi đây ghi dấu với những di sản,
                        lễ hội truyền thống với nhiều nét độc đáo riêng. Đến với Nam Định, du khách sẽ đến với
                        vùng văn hóa ẩm thực đặc trưng cùng những món ăn, đặc sản nổi tiếng của vùng đất Thành
                        Nam
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span={10}></Col>
                <Col span={14} className={cx('introduce')}>
                    <p className={cx('intro-content')}>
                        Nam Định không chỉ là thành phố bao gồm các địa điểm thăm quan nổi tiếng mà nơi đây
                        cũng là một kho dự trữ những món ăn đặc sản ngon trứ danh ở đồng bằng Bắc Bộ. Giờ
                        hãy cùng nhau  khám phá ẩm thực Nam Định xem những món ăn đặc sản ở đây có gì hấp
                        dẫn nhé!
                    </p>
                    <img src={image2} alt="" className={cx("intro-img")} />
                </Col>
            </Row>
        </div>
    );
}

export default AboutPage;