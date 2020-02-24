'use strict';

const mapquestApiKey = 'ofGSjKNQtDZF0b56ryF0tdBawpRqNoX6';
const mapquestBaseURL = 'http://www.mapquestapi.com/directions/v2/route';

const listenNotesApiKey = 'e3734451a0d3414f9db6cc43b2d9c189';
const listenNotesBaseURL = ' https://listen-api.listennotes.com/api/v2/search';

/* build the mapquest API string */
let buildAddressQueryString = (userData) => {
  let queryString = [];
  let queryFrom = encodeURIComponent(userData.from);
  let queryTo = encodeURIComponent(userData.to);

  queryString.push(`from=${queryFrom}`, `to=${queryTo}`, `key=${mapquestApiKey}`);

  return queryString.join('&');
}

let getAddressApi = (userData) => {
  fetch(userData.mapquestUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      parseMapquestResponse(responseJson, userData);
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

let parseMapquestResponse = (responseJson, userData) => {
  let statusCode = responseJson.info.statuscode;
  if (statusCode != 0) {
    let errorMessage = responseJson.info.messages[0];
    $('.error-mapquest').html(errorMessage);
    $('.error-mapquest').css('display', 'block');
  } else {
    userData.travelTime = Math.round(Number(responseJson.route.realTime) / 60).toString();
    userData.listenNowUrl = buildListenNowURL(userData);
    fetchListenNow(responseJson, userData);
  }
}

let fetchListenNow = (responseJson, userData) => {
  let totalTravelTime = (toHHMMSS(responseJson.route.realTime));
  console.log(totalTravelTime);

  //for each search term ...
  for (let x = 0; x < userData.listenNowUrl.length; x++) {

    var request = new Request(userData.listenNowUrl[x], {
      headers: new Headers({
        'X-ListenAPI-Key': listenNotesApiKey
      })
    });

    fetch(request).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
      .then(responseJson => {
        console.log(userData.travelTime);
        console.log(responseJson);
      })
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
}

let buildListenNowURL = (userData) => {

  let listenNowUrl = [];
  for (let x = 0; x < userData.podcastInterests.length; x++) { 
    listenNowUrl.push(`${listenNotesBaseURL}?q=${userData.podcastInterests[x]}&len_min=10&len_max=${userData.travelTime}&sort_by_date=0&type=episode&offset=0&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=1`);
  }

  return listenNowUrl;
}

let watchForm = () => {
  $('form').submit(event => {
    event.preventDefault();

    resetClasses();

    let userData = {
      from: $('#from-address').val(),
      to: $('#to-address').val(),
      podcastInterests: interestsToArray($('#podcast-interests').val()),
    };

    //check to see if to/from is empty
    if (validateForm(userData)) {
      userData.mapquestUrl = mapquestBaseURL + '?' + buildAddressQueryString(userData);
      getAddressApi(userData);
      console.log(userData);
    } else console.log('false');
  });
}

$(function () {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});