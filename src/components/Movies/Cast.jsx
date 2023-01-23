import {  useState } from 'react';
import { CastItem } from './CastItem';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { Loader } from '../../components/Loader/Loader';

import { useParams } from 'react-router-dom';


export const Cast = () => {

  const { movieId } = useParams();

  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    setIsLoading(true);

    // TODO create service
    axios.get('https://api.themoviedb.org/3/movie/' + movieId+'/credits?api_key=c491b5b8e2b4a9ab13619b0a91f8bb41')
      .then(({ data }) => setValue(data))
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  }, [movieId]);

  if (isLoading) {
    return <Loader />;
  }
 

  return (
      <>
        <ul  >
            {value.cast?.map(element => 
                <CastItem key={element.id} element={element}/>
            )}
      </ul>
     </> 
    )

}

