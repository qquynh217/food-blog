import classnames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom'

const cx = classnames.bind(styles)

function Button({ children, small, to, href, text, className, onClick, ...props }) {
    let Comp = 'button'
    if (to) {
        Comp = Link
        props.to = to
    }
    else if (href) {
        Comp = 'a'
        props.href = href
    }
    const classes = cx('wrapper', { 'small': small }, className)
    return (
        <Comp {...props} className={classes} onClick={onClick}>
            {text}
            {children}
        </Comp>
    );
}

export default Button;