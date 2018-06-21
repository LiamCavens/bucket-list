const Country = require('./models/Country');
const MapWrapper = require('./models/MapWrapper');
const CountryView = require('./views/countryView');
const countryView = new CountryView();
const Request = require('./services/request.js');
const request = new Request('http://localhost:3000/api/buckit');

const appStart = function(){
  const url = "https://restcountries.eu/rest/v2/all";
  makeApiRequest(url, requestCompleteCountry);
  request.get(getBuckitListCountries);
  console.log("Hello");
  drawMap();
}

const getBuckitListCountries = function(pickedCountries){
  pickedCountries.forEach(function(country){
    countryView.addToBucketList(country);
  })
}

const drawMap = function () {
    const mapDiv = document.getElementById("map");
    mainMap = new MapWrapper (mapDiv, [0, 0], 2);

}

const makeApiRequest = function (url, callbackFunction) {
  const apiRequest = new XMLHttpRequest();
  apiRequest.open("GET", url);
  apiRequest.addEventListener("load", callbackFunction);
  apiRequest.send();
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
