/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Country = __webpack_require__(1);
const MapWrapper = __webpack_require__(2);
const CountryView = __webpack_require__(3);
const countryView = new CountryView();
const Request = __webpack_require__(4);
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
  mainMap.flyTo(coords, 7);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Country = function(options){
this.name = options.name;
this.capital = options.capital;
this.coordinates = options.coordinates;
this.flag = options.flag
this.visited = false;

}

module.exports = Country;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const MapWrapper = function (element, coords, zoom) {
  const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
 this.map = L.map(element).addLayer(osmLayer).setView(coords, zoom);
}

MapWrapper.prototype.flyTo = function (coords, zoom) {
    this.map.flyTo(coords, zoom);
};

MapWrapper.prototype.addMarker = function (coords, text) {
  const marker = L.marker(coords).addTo(this.map);
  marker.bindPopup(text).openPopup()
};

module.exports = MapWrapper;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var CountryView = function(){
  this.bucketList = [];
  this.visitedList = [];
}

CountryView.prototype.addToBucketList = function(country) {
  if(country.visited === false){
  this.bucketList.push(country);
  this.renderBucketList(country);}
  if(country.visited === true){
  this.visitedList.push(country);
  this.renderVisitedList(country)}
}

CountryView.prototype.removeFromBucketList = function (country) {
  let index = this.bucketList.indexOf(country);
  if (index > -1) {
    this.collection.splice(index, 1);
  }
};

CountryView.prototype.addToVisitedList = function(country) {
  this.visitedList.push(country);
  this.renderVisitedList(country);
  console.log("Hello");
}

CountryView.prototype.moveFromBucketListToVisitedList = function (country) {
  // removeFromBucketList(country);
  country.visited = true;
  addToVisitedList(country);



};

CountryView.prototype.renderBucketList = function(country){
    const listDiv = document.querySelector('#to-see-list');
    const ul = document.querySelector('#countries-list');
    const li = document.createElement('li');
    const PTag = document.createElement('p');
    const moveButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    PTag.innerHTML = `<img class="list-flag" src="${country.flag}" alt="${country.name} flag"> ${country.name} - "${country.capital}"`;
    // const button = document.querySelector("#visit-button");
    moveButton.value = JSON.stringify(country);
    moveButton.setAttribute("id", 'visit-button');
    moveButton.textContent = "Visited";
    deleteButton.value = JSON.stringify(country);
    deleteButton.setAttribute("id", 'delete-button')
    deleteButton.textContent = "X"
    PTag.appendChild(moveButton);
    PTag.appendChild(deleteButton);
    li.appendChild(PTag);
    ul.appendChild(li);
    listDiv.appendChild(ul);
}

CountryView.prototype.renderVisitedList = function(country){
  const listDiv = document.querySelector('#visited-list');
  const ul = document.querySelector('#countries-list');
  const li = document.createElement('li');
  const PTag = document.createElement('p');
  PTag.innerHTML = `<img class="list-flag" src="${country.flag}" alt="${country.name} flag"> ${country.name} - "${country.capital}"`;
  // PTag.src = country.flag;
  li.appendChild(PTag);
  ul.appendChild(li);
  listDiv.appendChild(ul);
}


module.exports = CountryView;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function (getBuckitListCountries) {
  const request = new XMLHttpRequest();
  request.open("GET", this.url);
  request.addEventListener("load", function(){
    if(this.status !== 200) return;
    getBuckitListCountries(JSON.parse(this.response));
  });
  request.send();
};

Request.prototype.post = function (country, next) {
  const request = new XMLHttpRequest();
  request.open("POST", this.url);
  request.setRequestHeader("content-type", "application/json")
  request.addEventListener("load", function(){
    if(this.status !== 201) return;
    const responseBody = JSON.parse(this.response);
    next(responseBody);
  })
  request.send(JSON.stringify(country));
};

module.exports = Request;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map