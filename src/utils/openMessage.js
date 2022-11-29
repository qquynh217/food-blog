import { message } from "antd";

const messStyle = { fontSize: '1.8rem', marginTop: '10vh' }

export const openMessage = (loadingMess, successMess) => {
    return new Promise((resolve) => {
        const key = 'updatable'
        message.loading({ content: loadingMess, key, style: messStyle });
        setTimeout(() => {
            message.success({
                content: successMess, key, duration: 2,
                style: messStyle
            });
            resolve('Success')
        }, 1000);
    })
};