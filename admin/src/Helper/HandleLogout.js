function HandleLogout() {
    localStorage.clear()
    window.location.replace('/')
}

export default HandleLogout