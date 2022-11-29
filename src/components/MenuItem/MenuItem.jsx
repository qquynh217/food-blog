import classnames from 'classnames/bind';
import styles from './MenuItem.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles)

function MenuItem({ text, icon, to, href, onClick, ...props }) {
    let Comp = 'div'
    if (to) {
        Comp = Link
        props.to = to
    }
    else if (href) {
        Comp = 'a'
        props.href = href
    }
    return (
        <Comp className={cx('wrapper')} onClick={onClick} {...props}>
            <FontAwesomeIcon icon={icon} />
            <div className={cx('text')}>{text}</div>
        </Comp>
    );
}

export default MenuItem;