const countryView = require('./views/countryView');
const Request = require('./services/request.js');

const request = new Request('http://localhost:3000/buckit');

const appStart = function(){

console.log("Hello");
}
window.addEventListener('DOMContentLoaded', appStart);
