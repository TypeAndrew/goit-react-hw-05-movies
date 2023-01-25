import {  useState } from 'react';
import { CastItem } from './CastItem';
import { useEffect } from 'react';
import { getCasts } from '../../services/movies.services';
import { Loader } from '../Loader/Loader';
import { STATUS } from '../../constants/status.constants';
import { useParams } from 'react-router-dom';


export const Cast = () => {

  const { movieId } = useParams();

  const [value, setValue] = useState(null);
  const [status, setStatus] = useState(STATUS.idle);

  

   useEffect(() => {
    
    const fetchData = async () => {
      setStatus(STATUS.loading);
      try {
        const data = await getCasts(movieId);
        setValue(data);
        setStatus(STATUS.success);
      } catch (error) {
        console.log(error);
        setStatus(STATUS.error);
      }
    }; 
    fetchData();
      
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

