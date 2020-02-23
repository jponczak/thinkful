'use strict';

function handleFormData() {}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    handleFormData();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});