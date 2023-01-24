import {  useState } from 'react';
import { CastItem } from './CastItem';
//import axios from 'axios';
import { useEffect } from 'react';
//import { toast } from 'react-toastify';
import { getCasts } from '../../services/movies.services';
import { Loader } from '../../components/Loader/Loader';
import { STATUS } from '../../constants/status.constants';
import { useParams } from 'react-router-dom';


export const Cast = () => {

  const { movieId } = useParams();

  const [value, setValue] = useState(null);
  const [status, setStatus] = useState(STATUS.idle);

  

   useEffect(() => {
    
    //setIsLoading(true);
    const fetchData = async () => {
      setStatus(STATUS.loading);
      try {
        const data = await getCasts(movieId,'','/credits');
        setValue(data);
        setStatus(STATUS.success);
      } catch (error) {
        console.log(error);
        setStatus(STATUS.error);
      }
    }; 
    fetchData();
    // TODO create service
    /*axios.get('https://api.themoviedb.org/3/movie/' + movieId+'/credits?api_key=c491b5b8e2b4a9ab13619b0a91f8bb41')
      .then(({ data }) => setValue(data))
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => setIsLoading(false));*/
      
  }, [movieId]);
  
  if (status === STATUS.loading) {
    return <Loader />;
  }
 

  return (
      <>
        <ul  >
            {value?.cast?.map(element => 
                <CastItem key={element.id} element={element}/>
            )}
      </ul>
     </> 
    )

}

