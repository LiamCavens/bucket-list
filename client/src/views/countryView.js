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
