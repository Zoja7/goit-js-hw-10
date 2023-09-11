import { fetchBreeds, chosenBreedOptions, fetchCatByBreed  } from "./cat-api";


// Initialize the page
fetchBreeds()
  .then(breeds => {

    chosenBreedOptions(breeds);

  })
  .catch(error => {

    console.error(error);
  });

const breedSelect = document.querySelector(".breed-select");

breedSelect.addEventListener("change", () => { 
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId && selectedBreedId != "") {
    fetchCatByBreed(selectedBreedId)
      .catch(error => { 
        console.error(error);
      })

   }
})