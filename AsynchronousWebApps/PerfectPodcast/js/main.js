'use strict';

var listenNowPodcasts = [];

/* render the directions html */
let renderMapQuestResults = (responseJson, userData) => {
  let legs = responseJson.route.legs[0].maneuvers;
  $('#podcasts').removeClass('hidden');

  let htmlResults = '';
  for (let x = 0; x < legs.length; x++) {
    htmlResults += `<p class="step-by-step">${x + 1}. ${legs[x].narrative}</p>`
  }

  $('.directions-text-inner').html(htmlResults);
}

/* render the podcast html*/
let renderListenNowResults = (podcastData) => {
  let htmlResults = '';
  for (let x = 0; x < podcastData.length; x++) {
    htmlResults += `<p><a href="${podcastData[x].listennotes_url}" alt="" target="_blank">${podcastData[x].title_original}</a><br /><span class="publisher"> (${podcastData[x].publisher_highlighted})</span></p>`;
  }
  
  //displayed podcasts may be longer than image,
  //so instead of repeating images, just use a 
  //color.
  $('.podcasts-text-inner').html(htmlResults);
  if (podcastData.length > 10) {
    $('#podcasts-text').css('background-color','#232931').css('background-image','');
  }
}

let watchForm = () => {
  $('form').submit(event => {
    event.preventDefault();

    resetClasses();

    //initial userdata objecg used throughout code
    let userData = {
      from: '',
      to: '',
      podcastInterests: '',
      mapquestUrl: '',
      travelTime: '',
      listenNowUrl: ''
    };

    //initial userData object. Other key / values are added as well throughout the code.
      userData.from = $('#from-address').val();
      userData.to = $('#to-address').val();
      userData.podcastInterests = interestsToArray($('#podcast-interests').val());
  
    //check to see if to/from is empty
    if (validateForm(userData)) {
      userData.mapquestUrl = mapquestBaseURL + '?' + buildAddressQueryString(userData);
      getAddressApi(userData);
    } else console.log('false');

  });
}

$(function () {
  //smooth scroll
  $('#dirs').on('click', function () {
    $('#directions').removeClass('hidden');

  });

  //slow scroll from landing page button to form
  $('#find-pods').on('click', function () {
    var gotoForm = $('.flex-outer').position().top;

    $('html, body').animate({
      scrollTop: gotoForm
    }, 900);
  });

  $('.nav-content').hide();

  watchForm();

});