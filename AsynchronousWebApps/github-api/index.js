'use strict';

function getGitHandle(gitHandle) {
  fetch(`https://api.github.com/users/${gitHandle}/repos`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(gitHandle, responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(gitHandle, responseJson) {
  console.log(responseJson);
  console.log(responseJson.length);

  let newGitReposHtml = `<h1>${responseJson.length} repo(s) found for ${gitHandle}</h1>`;
  for (let y = 0; y < responseJson.length; y++) {
    console.log(responseJson[y].html_url);
    newGitReposHtml += `<h2><a href="${responseJson[y].html_url}" target="_blank">${responseJson[y].html_url}</a></h2>`;
  }
  
  $('.results').html(newGitReposHtml);
  //display the results section
  $('.results').removeClass('hidden');
}

function getRequestedHandles() {
  var gitHandle = $("#github-user-handle").val();
  console.log('handle: ' + gitHandle);
  if (gitHandle.length == 0) {
    console.log('Please enter a valid handle');
  } else {
    getGitHandle(gitHandle);
  }
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getRequestedHandles();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});