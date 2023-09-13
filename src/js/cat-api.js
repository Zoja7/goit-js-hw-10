import axios from "axios";
import { URL_KEY, API_KEY } from "../configs/api.js";



const axiosInstance = axios.create({
    headers: {
        "x-api-key": API_KEY,
    },
});



export function fetchBreeds() {

    return axiosInstance.get(`${URL_KEY}breeds`)
        
     .then(response =>  {
             
        return response.data;
             
     })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

export function fetchCatByBreed(breedId) { 
 
    return axiosInstance
        .get(`${URL_KEY}images/search?breed_ids=${breedId}`)
        .then(response => { 

            return response;
         
        })
        .catch(error => { 
          
            console.error(error);
            throw error;

        })
     
}

