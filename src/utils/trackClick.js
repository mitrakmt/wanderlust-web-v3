import request from './request';

const trackClick = (type) => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
        request(`/click`, {
            method: 'POST',
            body: {
                type
            }
        })
    }
}

export default trackClick;