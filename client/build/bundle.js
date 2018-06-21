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

const Country = __webpack_require__(3);
const MapWrapper = __webpack_require__(4);
const CountryView = __webpack_require__(1);
const countryView = new CountryView();
const Request = __webpack_require__(2);
const request = new Request('http://localhost:3000/');

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
    console.log(pickedCountries);
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

const handleButtonClick = function(event){
  event.preventDefault();
  const nameInputValue = document.querySelector('#name').value;
  const quoteInputValue = document.querySelector('#quote').value;
  const quoteToSend = {name: nameInputValue, quote: quoteInputValue};
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var CountryView = function(){
  this.bucketList = [];
  this.seen = [];
}

CountryView.prototype.addToBucketList = function(country) {
  this.bucketList.push(country);
  this.render(country);
}


CountryView.prototype.render = function(country){

    const listDiv = document.querySelector('#to-see-list');
    const ul = document.querySelector('#countries-list');
    const li = document.createElement('li');
    const PTag = document.createElement('p');
    PTag.innerText = `${country.name} - "${country.capital}"`;
    PTag.src = country.flag;
    li.appendChild(PTag);
    ul.appendChild(li);
    listDiv.appendChild(ul);
}


module.exports = CountryView;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function (next) {
  const request = new XMLHttpRequest();
  request.open("GET", this.url);
  request.addEventListener("load", function(){
    if(this.status !== 200) return;
      next(JSON.parse(this.response));
  });
  request.send();
};

Request.prototype.get = function (next) {
  const request = new XMLHttpRequest();
  request.open("GET", this.url);
  request.addEventListener("load", function(){
    if(this.status !== 200) return;
      next(JSON.parse(this.response));
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const Country = function(options){
this.name = options.name;
this.capital = options.capital;
this.coordinates = options.coordinates;
this.flag = options.flag

}

module.exports = Country;


/***/ }),
/* 4 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map