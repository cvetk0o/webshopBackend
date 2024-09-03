import dayjs from "dayjs"

const formatTimeForEmail = (timestamp: string) => {
    return dayjs(timestamp).format('DD MMM YYYY') // '25/01/2019'
}



export default {
    formatTimeForEmail
}