'use strict';

const mapquestApiKey = 'ofGSjKNQtDZF0b56ryF0tdBawpRqNoX6';
const mapquestBaseURL = 'http://www.mapquestapi.com/directions/v2/route';

const listenNotesApiKey = 'e3734451a0d3414f9db6cc43b2d9c189';
const listenNotesBaseURL = ' https://listen-api.listennotes.com/api/v2/search';

function validateForm(userData) {
  if (userData.from.length == 0) {
    $('.error-from').css('display','block');
    return false;
  }

  if (userData.to.length == 0) {
    $('.error-to').css('display','block');
    return false;
  }
  return true;
}

function buildAddressQueryString(userData) {

  let queryString = [];
  let queryFrom = encodeURIComponent(userData.from);
  let queryTo = encodeURIComponent(userData.to);

  queryString.push(`from=${queryFrom}`, `to=${queryTo}`, `key=${mapquestApiKey}`);

  return queryString.join('&');
}

function getAddressApi(queryString, userData) {

  const url = mapquestBaseURL + '?' + queryString;
  console.log(url);
  fetch(url)
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
//https://www.mapquestapi.com/directions/v2/route?key=KEY&from=8223+bayberry+ridge+rd%2C+fairfax+station%2C+va+22039&to=1775+tysons+blvd%2C+tysons%2C+va&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false

}
function parseMapquestResponse(responseJson, userData) {

  let statusCode = responseJson.info.statuscode;
  if (statusCode != 0) {
    let errorMessage = responseJson.info.messages[0];
    $('.mapquest-error').html(errorMessage);
    $('.mapquest-error').css('display', 'block');
  } else {
    let travelTime = (toHHMMSS(responseJson.route.realTime));

    let travelMinutes = Math.round(Number(responseJson.route.realTime) / 60).toString();
    let podcastSearchArr = [];
    if (userData.podcastInterests.search(', ') != -1) {
      podcastSearchArr = userData.podcastInterests.split(', ');
    } else {
      podcastSearchArr = userData.podcastInterests;
    }

    //for each search term ...
    for (let x = 0; x < podcastSearchArr.length; x++) {
      console.log(x + ':' + podcastSearchArr[x]);
      console.log('travel minutes: ' + Math.round(travelMinutes).toString());
      console.log('travel seconds: ' + responseJson.route.realTime);
          //listennow api
          let listenQuery = `${listenNotesBaseURL}?q=${podcastSearchArr[x]}&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=${travelMinutes}&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=1`;
          console.log(listenQuery);
          var request = new Request(listenQuery, {
            headers: new Headers({
              'X-ListenAPI-Key' : listenNotesApiKey
            })
          });
      
          fetch(request).then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error(response.statusText);
            })
            .then(responseJson => { 
            //  parseMapquestResponse(responseJson);
             console.log(responseJson);
            })
            .catch(err => {
              $('#js-error-message').text(`Something went wrong: ${err.message}`);
            });
    }
  }
  console.log(responseJson);
}

var toHHMMSS = (secs) => {
  var sec_num = parseInt(secs, 10)
  var hours   = Math.floor(sec_num / 3600)
  var minutes = Math.floor(sec_num / 60) % 60
  var seconds = sec_num % 60

  return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();

    $('.error-to').css('display','none');
    $('.error-from').css('display','none');
    $('.mapquest-error').css('display','none');

    let userData = {
      from: $('#from-address').val(),
      to: $('#to-address').val(),
      podcastInterests: $('#podcast-interests').val()
    };

    //check to see if to/from is empty
    if (validateForm(userData)) {
     // console.log('true');
      let queryString = buildAddressQueryString(userData);
      getAddressApi(queryString, userData);
    } else console.log('false');

    return userData;

  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});