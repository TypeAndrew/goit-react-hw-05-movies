
import { Link } from 'react-router-dom';


export const MovieItem = ({ movie , path, search}) => {


  return (
    <div className="col-12 col-md-6 col-xxl-4 mb-4">
      <div className="card">
       
        <div className="card-body">
          
            <div className="d-flex">
           

            <Link to={`${path}${movie.id}`} className="btn btn-primary ms-3" state={{ from: `/movies/?query=${search}` }}>
              <h5 className="card-title">{movie.title}</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};