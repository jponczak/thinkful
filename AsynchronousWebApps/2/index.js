'use strict';

function getDogImages(numberDogImages) {
  fetch(`https://dog.ceo/api/breeds/image/random/${numberDogImages}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  let newDogImgHtml = '';
  for (let x = 0; x < responseJson.message.length; x++) {
    console.log(responseJson.message[x]);
    newDogImgHtml += `<img src="${responseJson.message[x]}" class="results-img" alt="random cute dog pic!"> <br />`;
  }
  $('.results').html(newDogImgHtml);
  //display the results section
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