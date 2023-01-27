import { useEffect, useState } from "react";

const Genres = ({ data }) => {

     const [value, setValue] = useState("");

    useEffect(() => {
        let strGenres = "";
        data.map((element) => {
            strGenres += element.name + " ";
            return strGenres;   
        })
        setValue(strGenres);
    },[value,data])
 

    return (
        <div>
            {value}
        </div>
    )

}

export default Genres;