const axios = require('axios')

export function HandleImage(file) {
    console.log(file)
    const api = 'https://upload-image-123.azurewebsites.net/'
    const { url } = axios(api)
        .then((res) => res.data)
        .catch(error => console.log(error))

    console.log(url)

    axios({
        method: 'put',
        url,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: file,
    }).catch(error => console.log(error))

    return url.split('?')[0]
}