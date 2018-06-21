const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function (next) {
  console.log('request get');
  const request = new XMLHttpRequest();
  request.open("GET", this.url);
  request.addEventListener("load", function(){
    console.log('before 200', this.status);
    if(this.status !== 200) return;
    console.log("Response:", this.response);
    next(JSON.parse(this.response));
    console.log('after 200', this.status);
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
