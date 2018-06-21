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
  const moveButton = document.querySelector('#visit-button');
  const deleteButton = document.querySelector('#delete-button');
  if(moveButton !== null){
  moveButton.addEventListener('click', handleMoveButton);
  deleteButton.addEventListener('click', handleDeleteButton);
  }
  mainMap.flyTo(coords, 10);
  mainMap.addMarker(coords, name);
  request.post(pickedCountry, createRequestComplete);
}

const handleMoveButton = function() {
  let selectedCountry = JSON.parse(this.value)
  console.log(selectedCountry);
  request.post(selectedCountry, moveRequestComplete)
;}

const handleDeleteButton = function() {
console.log(this.value);
}

const createRequestComplete = function(pickedCountry){
  countryView.addToBucketList(pickedCountry)
};

const moveRequestComplete = function(country) {
  console.log("hello");
  countryView.moveFromBucketListToVisitedList(country);
}

window.addEventListener('load', appStart);
