'use strict';

function getDogImages(dogBreed) {
  fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert(`Something went wrong. Perhaps because ${dogBreed} is not really a breed? Try again later.`));
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  if (responseJson.status === "success") {
    $('.results-img').replaceWith(
      `<img src="${responseJson.message}" class="results-img">`
    )
    $('.results').removeClass('hidden');
  }
   else {
    errorHtml = `<h1>Sorry, we could not find a breed called ${dogBreed}.</h1>`
    $('.results').html(errorHtml);
  }

}

function getRequestedImages() {
  var dogBreed = $("#random-dog-breed-images").val();
  if (Number(dogBreed)) {
    console.log('Sorry, a number is not a breed.');
  } else {
    getDogImages(dogBreed);
  }
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('.results').addClass('hidden');
    getRequestedImages();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});