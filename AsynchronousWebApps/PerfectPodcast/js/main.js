'use strict';

var listenNowPodcasts = [];

let renderMapQuestResults = (responseJson, userData) => {
  let legs = responseJson.route.legs[0].maneuvers;
  // $('#directions').removeClass('hidden');
  $('#podcasts').removeClass('hidden');
  // $('.podcast-result').removeClass('hidden');

  let htmlResults = '';
  for (let x = 0; x < legs.length; x++) {
    htmlResults += `<p class="step-by-step">${x + 1}. ${legs[x].narrative}</p>`
  }

  // $('.mapquest-results').html(htmlResults);
  $('.directions-text-inner').html(htmlResults);
}

let renderListenNowResults = (podcastData) => {


  console.log(podcastData);
  let htmlResults = '';
  for (let x = 0; x < podcastData.length; x++) {
    htmlResults += `<p><a href="${podcastData[x].listennotes_url}" alt="" target="_blank">${podcastData[x].title_original}</a><br /><span class="publisher"> (${podcastData[x].publisher_highlighted})</span></p>`;
  }

  console.log(htmlResults);

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

    // var direction = $('#directions-text').position().top;

    // $('html, body').animate({
    //   scrollTop: direction
    // }, 4500);
  
  });


}

$(function () {
  console.log('App loaded! Waiting for submit!');
  //smooth scroll
  $('#dirs').on('click', function() {
    console.log('directions ,..');
    $('#directions').removeClass('hidden');

    // var direction = $('#directions-text').position().top;
    // // var podcast = $('#podcasts-text').position().top;
    // // var find = $('#find').position().top;

    // $('html, body').animate({
    //   scrollTop: direction
    // }, 900);
  });

  $('#find-pods').on('click', function() {
    var gotoForm = $('.flex-outer').position().top;

    $('html, body').animate({
      scrollTop: gotoForm
    }, 900);
  });

  $('.nav-content').hide();

  watchForm();

});