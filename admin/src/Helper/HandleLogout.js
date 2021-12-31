function HandleLogout() {
    localStorage.clear()
    window.location.assign('/login')
}

export default HandleLogout