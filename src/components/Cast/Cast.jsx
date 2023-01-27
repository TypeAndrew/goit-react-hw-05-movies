import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { lazy } from "react";
import { STATUS } from '../../constants/status.constants';
//import { CastItem } from './CastItem';
import { getCasts } from '../../services/getCasts.service';

//import { Loader } from '../Loader/Loader';
//const getCasts = lazy(() => import("../../services/getCasts.service"));
//const STATUS = lazy(() => import("../../constants/status.constants"));
const Loader = lazy(() => import("../Loader/Loader"));
const CastItem = lazy(() => import("./CastItem"));

const Cast = () => {

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

export default Cast;