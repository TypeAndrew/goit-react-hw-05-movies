import { useEffect, useState } from "react";

export const Genres = (genres) => {

     const [value, setValue] = useState("");

    useEffect(() => {
        let strGenres = "";
        genres.genres.map((element) => {
            strGenres += element.name + " ";
            
        })
        setValue(strGenres);
    })
 

    return (
        <div>
            {value}
        </div>
    )

}