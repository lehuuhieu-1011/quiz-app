const axios = require('axios')

export async function HandleImage(file) {
    console.log(file)
    const api = 'https://upload-image-123.azurewebsites.net/'
    const { url } = await axios(api)
        .then((res) => res.data)
        .catch(error => console.log(error))

    console.log(url)

    await axios({
        method: 'put',
        url,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: file,
    }).catch(error => console.log(error))

    return url.split('?')[0]
}