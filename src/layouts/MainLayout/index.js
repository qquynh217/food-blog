import Header from "../components/Header/Header";
import classnames from 'classnames/bind';
import styles from './MainLayout.module.scss'
import Footer from "../components/Footer/Footer";

const cx = classnames.bind(styles)

function MainLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <section className={cx('content-block')}>
                {children}
            </section>
            <Footer />
        </div>
    );
}

export default MainLayout;