import request from './request';

const trackStat = ({ type, property }) => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
        request(`/stats`, {
            method: 'POST',
            body: {
                type,
                property
            }
        })
    }
}

export default trackStat;