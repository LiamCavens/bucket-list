const countryView = require('./views/countryView');
const Request = require('../services/request.js');

const request = new Request('http://localhost:3000/buckit');

const appStart = function(){
  const url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestCompleteCountry);

  console.log("Hello");
}

const makeRequest = function (url, callbackFunction) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callbackFunction);
  request.send();
}

const requestCompleteCountry = function(){
  if (this.status !== 200) return;

  const countries = JSON.parse(this.response);
  populateList(countries);
}

const populateList = function(countries) {
  const select = document.querySelector('#country-list');
  countries.forEach(function(country){
    const option = document.createElement('option');
    option.textContent = `${country.name}`;
    option.value = JSON.stringify(country);
    select.appendChild(option);
  });
};

window.addEventListener('load', appStart);
