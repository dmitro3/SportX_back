import axios from 'axios';

export default async () => ({
    NGROK_PUBLIC_URL: await axios
        .get('https://api.ngrok.com/endpoints', {
            headers: {
                'Ngrok-Version': 2,
                Authorization: `Bearer 2Unyc2qUY51ehnerHVReV6XY8V5_67PhrydETNUnsRApXmqna`,
            },
        })
        .then((response) => {
            if (response.data?.endpoints[0]) {
                const {public_url} = response.data.endpoints[0];
                console.log(public_url)
                return public_url;
            } else {
                return null;
            }
        }).catch(err => {
            console.log(err)
        })
});
