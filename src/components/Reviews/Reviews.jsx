import { useState } from 'react';
import { ReviewsItem } from './ReviewsItem';
import { useEffect } from 'react';
import { getRewievs } from '../../services/movies.services';
import { STATUS } from '../../constants/status.constants';
import { Loader } from '../Loader/Loader';

import { useParams } from 'react-router-dom';


export const Reviews = () => {

  const { movieId } = useParams();
  const [status, setStatus] = useState(STATUS.idle);
  const [value, setValue] = useState(null);


  useEffect(() => {
     
    // TODO create service
     const fetchData = async () => {
      setStatus(STATUS.loading);
      try {
        const data = await getRewievs(movieId);
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
            {value?.results?.map(element => 
                <ReviewsItem key={element.id} element={element}/>
            )}
      </ul>
    </>  
    )

}
