import axios from "axios";
import { URL_KEY, API_KEY } from "./configs/api.js";
import SlimSelect from "slim-select";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const axiosInstance = axios.create({
    headers: {
        "x-api-key": API_KEY,
    },
});

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");

const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

error.classList.add("hidden");
loader.classList.add("hidden");



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
    new SlimSelect({
        select: '#breed-select'
    });
}

export function fetchCatByBreed(breedId) { 

    catInfoDiv.classList.add("hidden");
    loader.classList.remove("hidden");
    
    return axiosInstance
        .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => { 
            if (response.status === 200) {
                const catData = response.data[0];

                const catName = document.createElement("h2");
                catName.textContent = catData.breeds[0].name;

                const catDescription = document.createElement("p");
                catDescription.style.textAlign = "justify";
                catDescription.textContent = `DESCRIPTION:  ${catData.breeds[0].description}`;

                const catImage = document.createElement("img");

                catImage.src = catData.url;
                catImage.alt = catData.breeds[0].name;
        
                catInfoDiv.innerHTML = "";
               
                catInfoDiv.appendChild(catName);
                catInfoDiv.appendChild(catDescription);
                catInfoDiv.appendChild(catImage);


            } else { 
                throw new Error("Failed to fetch cat data from the server.");
               
              
            }
        })
        .catch(error => { 
            Notify.failure(`oops ...something went wrong`);
            error.classList.remove("hidden");
            throw error;

        })
        .finally(() => {
             
            // Hide the loader after the request is complete
            loader.classList.add("hidden");
            catInfoDiv.classList.remove("hidden");
          
        });
}