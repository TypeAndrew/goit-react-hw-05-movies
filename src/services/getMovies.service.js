import axios from 'axios';

const APIparam = {
    baseURL: 'https://api.themoviedb.org/3',
    api_key: 'api_key=c491b5b8e2b4a9ab13619b0a91f8bb41',
};

const postsApi = axios.create(APIparam);

export const getMovies = async( ) => {
    const { data } = await postsApi.get('/movie/popular/?' + APIparam.api_key, {
        params: {
            api_key: postsApi.api_key,

        },
    });

    return data;
};

//export default getMovies;