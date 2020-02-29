'use strict';

var listenNowPodcasts = [];

let renderMapQuestResults = (responseJson, userData) => {
  let legs = responseJson.route.legs[0].maneuvers;
  $('#podcasts').removeClass('hidden');

  let htmlResults = '';
  for (let x = 0; x < legs.length; x++) {
    htmlResults += `<p class="step-by-step">${x + 1}. ${legs[x].narrative}</p>`
  }

  $('.directions-text-inner').html(htmlResults);
}

let renderListenNowResults = (podcastData) => {
  let htmlResults = '';
  for (let x = 0; x < podcastData.length; x++) {
    htmlResults += `<p><a href="${podcastData[x].listennotes_url}" alt="" target="_blank">${podcastData[x].title_original}</a><br /><span class="publisher"> (${podcastData[x].publisher_highlighted})</span></p>`;
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

  });
}

$(function () {
  console.log('App loaded! Waiting for submit!');
  //smooth scroll
  $('#dirs').on('click', function () {
    $('#directions').removeClass('hidden');

  });

  $('#find-pods').on('click', function () {
    var gotoForm = $('.flex-outer').position().top;

    $('html, body').animate({
      scrollTop: gotoForm
    }, 900);
  });

  $('.nav-content').hide();

  watchForm();

});