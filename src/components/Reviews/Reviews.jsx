import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { lazy } from "react";
//import { ReviewsItem } from './ReviewsItem';
import { getRewievs } from '../../services/getRewievs.service';
import { STATUS } from '../../constants/status.constants';
//import { Loader } from '../Loader/Loader';
const ReviewsItem = lazy(() => import("./ReviewsItem"));
const Loader = lazy(() => import("../Loader/Loader"));
//const getRewievs = lazy(() => import("../../services/getRewievs.service"));
//const STATUS = lazy(() => import("../../constants/status.constants"));

const Reviews = () => {

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

export default Reviews;