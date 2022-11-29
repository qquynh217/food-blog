import classnames from 'classnames/bind';
import styles from './PageTitle.module.scss';

const cx = classnames.bind(styles)

function PageTitle({ title, desc, className, padding = true }) {
    return (
        <div className={cx('wrapper', className, { 'padding': padding })}>
            <h1 className={cx('title')}>{title}</h1>
            <p className={cx('description')}>{desc}</p>
        </div>
    );
}

export default PageTitle;