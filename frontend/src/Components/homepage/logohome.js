import React from 'react'; 
import './logohome';
import {Box} from "@mui/material"


// Sets up image 

export const Images = () =>{

    return(
        <div>
        <Box
        component="img"
        sx={{
            height: 400,
            width: 700,
            justifyContent:  "center", 
        
        }}
        alt=""
        src="../Assets/logo/logo844x845 Kopie.png"
      />
        </div>
    )
}

export default Images; 



