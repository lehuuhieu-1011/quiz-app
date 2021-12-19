import { notification } from "antd"

export function OpenNotification(message, type, description) {
    notification[type]({
        message: `Notification ${message}`,
        description,
        placement: 'bottomRight',
    })
}