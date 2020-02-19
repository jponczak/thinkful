'use strict';

function getDogImages(numberDogImages) {
  fetch(`https://dog.ceo/api/breeds/image/random/${numberDogImages}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  console.log(responseJson.message);
  $('.results').html('<h1>Please see the console for output.</h1>')
  $('.results').removeClass('hidden');
}

function getRequestedImages() {
  var numberDogImages = $("#random-dog-images").val();
  if (!Number(numberDogImages) || numberDogImages < 1 || numberDogImages > 50) {
    console.log('Only values between 1 and 50 are allowed.');
  } else {
    getDogImages(numberDogImages);
  }
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getRequestedImages();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});