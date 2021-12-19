import jwtDecode from "jwt-decode"

export function CheckToken() {
    const token = localStorage.getItem('token')
    if (!token) {
        return false
    }
    const decoded = jwtDecode(token)
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
        return false
    }
    return true
}

export const CheckRoleToken = (roleName) => {
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    if (decoded.Role !== roleName) {
        return false
    }
    return true
}
