const axios = require('axios');

export async function HandleImage(file) {
    console.log(file);
    // const api = 'https://upload-image-123.azurewebsites.net/';
    // const { url } = await axios(api)
    //     .then((res) => res.data)
    //     .catch(error => console.log(error));

    // console.log(url);

    // await axios({
    //     method: 'put',
    //     url,
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     },
    //     data: file,
    // }).catch(error => console.log(error));

    // return url.split('?')[0];\

    const api = 'http://localhost:4001';

    const formData = new FormData();
    formData.append('files', file);

    try {
        const res = await axios({
            method: 'post',
            url: api,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData
        });
        return convertDriveURL({ url: res.data.url[0] });
    } catch (error) {
        console.log(error);
    }
}

function getIdByDriveUrl({ url }) {
    return url.match(/[-\w]{25,}/);

}

function convertDriveURL({ url }) {
    const id = getIdByDriveUrl({ url });
    return `https://drive.google.com/uc?id=${id}`;
};