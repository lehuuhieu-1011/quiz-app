import { notification } from "antd"

export function OpenNotification(message, type, description) {
    notification[type]({
        key: 1,
        message: `Notification ${message}`,
        description,
        placement: 'bottomRight'
    })
}