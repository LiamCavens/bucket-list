const Country = function(options){
this.name = options.name;
this.capital = options.capital;
this.coordinates = options.coordinates;
this.flag = options.flag
this.visited = false;

}

module.exports = Country;
