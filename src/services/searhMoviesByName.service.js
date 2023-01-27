import axios from 'axios';

const APIparam = {
    baseURL: 'https://api.themoviedb.org/3',
    api_key: 'api_key=c491b5b8e2b4a9ab13619b0a91f8bb41',
};

const postsApi = axios.create(APIparam);

export const searhMoviesByName = async( query) => {
    const { data } = await postsApi.get('/search/movie/?' + APIparam.api_key + '&query=' + query, {
        params: {
            api_key: postsApi.api_key,

        },
    });

    return data;

}

//export default searhMoviesByName;