var CountryView = function(){
  this.bucketList = [];
  this.visitedList = [];
}

CountryView.prototype.addToBucketList = function(country) {
  this.bucketList.push(country);
  this.renderBucketList(country);
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
}

CountryView.prototype.moveFromBucketListToVisitedList = function (country) {
  removeFromBucketList(country);
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
