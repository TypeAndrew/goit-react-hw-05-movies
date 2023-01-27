const CastItem = ({ element }) => {

    return (
       
      <li>
        <img src={'https://image.tmdb.org/t/p/original/'+element.profile_path}
              alt={element.name}
              className="img-fluid mb-4"
              style={{ maxHeight: '100px', maxWidth: '100px', width: '100%', objectFit: 'cover' }} />
      </li>
          
    
    )

}

export default CastItem;