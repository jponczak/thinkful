'use strict';

var listenNowPodcasts = [];

let renderMapQuestResults = (responseJson, userData) => {
  // console.log(userData);
  // console.log(responseJson.route.distance);
  // console.log(responseJson.route.formattedTime);

  let legs = responseJson.route.legs[0].maneuvers;
  $('.results').removeClass('hidden');
  $('.podcast-result').removeClass('hidden');

  let htmlResults = '';
  for (let x = 0; x < legs.length; x++) {
    htmlResults += `${x + 1}. ${legs[x].narrative}<br />`
  }

  $('.mapquest-results').html(htmlResults);
}

let renderListenNowResults = (podcastData) => {

  let htmlResults = '';
  for (let x = 0; x < podcastData.length; x++) {
    htmlResults += `${podcastData[x].title_original}<br />`;
  }

  $('.podcast-results').html(htmlResults);

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
  watchForm();

});