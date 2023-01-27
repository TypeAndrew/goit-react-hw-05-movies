const ReviewsItem = ({ element }) => {

    return (
       
      <li>
     
        <p>{element.author}: {element.content}</p>
             
      </li>
          
    
    )

}

export default ReviewsItem;