import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from "slim-select";

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");

const loader = document.querySelector(".loader");
// const errorEl = document.querySelector(".error");


fetchBreeds()
  .then(breeds => {
    catInfoDiv.classList.toggle("hidden"); 
    breedSelect.classList.toggle("hidden")
    breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);

  });
    new SlimSelect({
        select: '#breed-select'
    });
})
  .catch(error => {

  // errorEl.classList.toggle("hidden");
    Notify.failure(`Oops!...Something went wrong!!!   
                     Try reloading the page!!!`);
    breedSelect.classList.toggle("hidden") &&
    loader.classList.toggle("hidden"); 
    console.error(error);
    throw error;
  });


breedSelect.addEventListener("change", () => { 

  const selectedBreedId = breedSelect.value;

  catInfoDiv.classList.toggle("hidden"); 
  breedSelect.classList.toggle("hidden");
  loader.classList.toggle("hidden");


  if (selectedBreedId && selectedBreedId != "") {

    fetchCatByBreed(selectedBreedId)
      .then(response => { 
         
        const catData = response.data[0];
        console.log(catData);

    const markup = `
      <h2>${catData.breeds[0].name}</h2>
      <p>DESCRIPTION: ${catData.breeds[0].description}</p>
      <img src="${catData.url}" alt="${catData.breeds[0].name}" />
    `;
        
    catInfoDiv.innerHTML = "";   
    catInfoDiv.innerHTML += markup;
       
  breedSelect.classList.toggle("hidden");
              
      })
      .catch(error => { 

        // errorEl.classList.toggle("hidden");
        Notify.failure(`Oops!...Something went wrong!!!   
                     Try reloading the page!!!`);
        breedSelect.classList.toggle("hidden");

        console.error(error);
        throw error;
      })
       .finally(() => {
             
          loader.classList.toggle("hidden");
          catInfoDiv.classList.toggle("hidden");
          
        });

   }
})