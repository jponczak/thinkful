'use strict';

var listenNowPodcasts = [];

let renderMapQuestResults = (responseJson, userData) => {
  let legs = responseJson.route.legs[0].maneuvers;
  // $('.results').removeClass('hidden');
  // $('.podcast-result').removeClass('hidden');

  let htmlResults = '';
  for (let x = 0; x < legs.length; x++) {
    htmlResults += `${x + 1}. ${legs[x].narrative}<br />`
  }

  // $('.mapquest-results').html(htmlResults);
  $('.directions-text-inner').html(htmlResults);
}

let renderListenNowResults = (podcastData) => {

  let htmlResults = '';
  for (let x = 0; x < podcastData.length; x++) {
    htmlResults += `${podcastData[x].title_original}<br />`;
  }

  $('.podcasts-text-inner').html(htmlResults);

}

let watchForm = () => {
  $('form').submit(event => {
    event.preventDefault();

    resetClasses();

    //initial userData object. Other key / values are added as well throughout the code.
    let userData = {
      from: $('#from-address').val(),
      to: $('#to-address').val(),
      podcastInterests: interestsToArray($('#podcast-interests').val()),
    };

    //check to see if to/from is empty
    if (validateForm(userData)) {
      userData.mapquestUrl = mapquestBaseURL + '?' + buildAddressQueryString(userData);
      getAddressApi(userData);
    } else console.log('false');

    var direction = $('#directions-text').position().top;

    $('html, body').animate({
      scrollTop: direction
    }, 4500);
  
  });


}

$(function () {
  console.log('App loaded! Waiting for submit!');
  //smooth scroll
  $('#directions').on('click', function() {
    var direction = $('#directions-text').position().top;
    var podcast = $('#podcasts-text').position().top;
    var find = $('#find').position().top;

    $('html, body').animate({
      scrollTop: direction
    }, 4500);
    $('html, body').animate({
      scrollTop: podcast
    }, 4500);
    $('html, body').animate({
      scrollTop: find
    }, 2300);
  });

  $('#find-pods').on('click', function() {
    console.log('cliek');
    var gotoForm = $('.flex-outer').position().top;

    $('html, body').animate({
      scrollTop: gotoForm
    }, 900);
  });

  watchForm();

});