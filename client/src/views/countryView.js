var CountryView = function(){
  this.bucketList = [];
  this.seen = [];
}

CountryView.prototype.addToBucketList = function(country) {
  this.bucketList.push(country);
  this.render(country);
}


CountryView.prototype.render = function(country){

    const ul = document.querySelector('#countries-list');
    const li = document.createElement('li');
    const PTag = document.createElement('p');
    PTag.innerText = `${country.name} - "${country.capital}"`;
    PTag.src = country.flag
    li.appendChild(PTag);
    ul.appendChild(li);
}


module.exports = CountryView;
