'use strict';

var listenNowPodcasts = [];

const errors = {
  noMaps: "MapQuest could not find any directions with those addresses.",
  noPodcasts: "ListenNow could not find any podcasts with based on your search terms.",
  noForm: "To and From fields are both required.",
}

/* render the directions html */
let renderMapQuestResults = (responseJson, userData) => {
  let legs = responseJson.route.legs[0].maneuvers;
  $('#podcasts').removeClass('hidden');

  let htmlResults = '';

  if (legs.length > 0) {
    for (let x = 0; x < legs.length; x++) {
      htmlResults += `<p class="step-by-step">${x + 1}. ${legs[x].narrative}</p>`
    }
  } else {
    htmlResults = `<p>${errors.noMaps}</p>`;
  }

  $('.directions-text-inner').html(htmlResults);
}

/* render the podcast html*/
let renderListenNowResults = (podcastData) => {
  let htmlResults = '';

  if (podcastData.length > 0) {
    for (let x = 0; x < podcastData.length; x++) {
      htmlResults += `<p><a href="${podcastData[x].listennotes_url}" alt="" target="_blank">${podcastData[x].title_original}</a><br /><span class="publisher"> (${podcastData[x].publisher_highlighted})</span></p>`;
    }  
  } else {
    htmlResults = `<p>${errors.noPodcasts}</p>`;
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

/* main */
$(function () {
  $('.nav-content').hide();
  watchForm();

  //slow scroll from landing page button to form
  $('#find-pods').on('click', function () {
    var gotoForm = $('.flex-outer').position().top;

    $('html, body').animate({
      scrollTop: gotoForm
    }, 900);
  });

  // if the user wants to see directions after
  //the podcasts load ...
  $('#dirs').on('click', function () {
    $('#directions').removeClass('hidden');
  });

});