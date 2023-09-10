import axios from "axios";

import { URL_KEY, API_KEY } from "./configs/api.js";

const axiosInstance = axios.create({
    headers: {
        "x-api-key": API_KEY,
    },
});

const breedSelect = document.querySelector(".breed-select");

export function fetchBreeds() {

    return axiosInstance.get(URL_KEY)
        
     .then(response =>  {
         if (response.status === 200) {
            
             return response.data;
             
        } else {
            throw new Error("Failed to fetch data from the server.");
        }
     })
    .catch(error => {
            console.error(error);
            throw error;
    });
}

export function chosenBreedOptions(breeds) {

  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
      
  });
}