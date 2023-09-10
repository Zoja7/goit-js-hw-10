import { fetchBreeds, chosenBreedOptions } from "./cat-api";


// Initialize the page
fetchBreeds()
  .then(breeds => {
    // Populate the select element with breed options
    chosenBreedOptions(breeds);
  })
  .catch(error => {

    console.error(error);
  });