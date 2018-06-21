const Country = require('./models/Country');
const MapWrapper = require('./models/MapWrapper');
const CountryView = require('./views/countryView');
const countryView = new CountryView();
const Request = require('./services/request.js');
const request = new Request('http://localhost:3000/');

const appStart = function(){
  const url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestCompleteCountry);
  console.log("Hello");
  drawMap();
}

const drawMap = function () {
    const mapDiv = document.getElementById("map");
    mainMap = new MapWrapper (mapDiv, [0, 0], 2);

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
    select.addEventListener('change', handleSelectChange);
  });
};

const handleSelectChange = function(){
  let selectedCountry = JSON.parse(this.value)
  let name = selectedCountry.name;
  let capital = selectedCountry.capital;
  let coords = selectedCountry.latlng;
  let flag = selectedCountry.flag;
  let pickedCountry = new Country({name: name, capital: capital, coordinates: coords, flag: flag})
  request.post(pickedCountry, createRequestComplete);
}

const createRequestComplete = function(pickedCountry){
  countryView.addToBucketList(pickedCountry)
};



window.addEventListener('load', appStart);

const handleButtonClick = function(event){
  event.preventDefault();
  const nameInputValue = document.querySelector('#name').value;
  const quoteInputValue = document.querySelector('#quote').value;
  const quoteToSend = {name: nameInputValue, quote: quoteInputValue};
};
