'use strict';

// put your own value below!
const apiKey = 'GtXCurba6SmMT3TfrOaTpggKLaboe9QAox688gRF'; 
const baseURL = 'https://developer.nps.gov/api/v1/parks';

//i used an api from opencagedata to find the park addresses
const opencageApiKey = '239178f6baab4965b98fbdb31ca96955';
const openCageBaseURL = 'https://api.opencagedata.com/geocode/v1/json';

function formatQueryParams(stateArr, maxResults) {

  //add key to each value and create a new array of states
  var stateQuery = stateArr.map(function(item) {
    return `stateCode=${item}`
  });

  //push the other api paremeters
  stateQuery.push(`limit=${maxResults}`,`api_key=${apiKey}`);
  //return properly formatted api call using the &
  return stateQuery.join('&');
}

//this function gets a string of lat / long from the national parks api and builds
//a new query string formatted for opencagedata
function getAddressFromApi(latLongArr) {

   var latLongStr = latLongArr.replace('lat:','').replace('long:','').replace(', ',',');
   var queryString = [encodeURIComponent(latLongStr), `key=${opencageApiKey}`];
   const openUrl = openCageBaseURL + '?q=' + queryString.join('&');

   return openUrl;
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array

  var openUrl = '';
  //iterate through the national parks data results
  for (let i = 0; i < responseJson.data.length; i++){

    var address = '';
    //if lat / long is defined, query data from opencage
    if (responseJson.data[i].latLong.length > 0) {
      openUrl = getAddressFromApi(responseJson.data[i].latLong);
      fetch(openUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(response2Json =>  {
        //found an address! build the rest of the results
       $('#results-list').append(
        `<br /><br />
        <l1>State(s): ${responseJson.data[i].states}</l1><br />
        <l1>Park name / url: <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].fullName}</a></l1><br />
        <l1>Description: ${responseJson.data[i].description}</l1><br />
        <li>Address: ${response2Json.results[0].formatted} </li>`
      );
  
      })
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
    }
  }

  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(stateArr, maxResults=10) {

   const queryString = formatQueryParams(stateArr, maxResults);
   const url = baseURL + '?' + queryString;
   console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    var checkedStates = [];
    $('#states input:checked').each(function() {
      checkedStates.push($(this).attr('value'));
    });

    const maxResults = $('#js-max-results').val();
    getParks(checkedStates, maxResults);
  });
}

$(watchForm);