// List of all features
function buildLocationList(data) {
  for (i = 0; i < data.length; i++) {
    var itemPosition;
    var currentFeature = data[i];
    var prop = currentFeature.properties;
    var toContinue = false;
    if (typeof listedFeatures !== 'undefined' && listedFeatures.length > 0) {
      firstListLoop: for (y = 0; y < listedFeatures.length; y++) {
        if (prop.name == listedFeatures[y]) {
          toContinue = true;
          break firstListLoop;
        }
      }
    };
    if (toContinue == true) continue;

    if (!listedFeatures[0]) itemPosition = listedFeatures.length + 1;
    var listings = document.getElementById('listings');
    var listing = listings.appendChild(document.createElement('div'));
    listing.className = 'item';

    listedFeatures.push(prop.name);
    listing.id = 'listing-' + listedFeatures.indexOf(currentFeature.properties.name);
    console.dir(listing.id);

    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.indexPosition = data.indexOf(currentFeature);
    link.innerHTML = prop.name;
    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.description;

    link.addEventListener('click', function(e) {
      var clickedListing = allFeatures[this.indexPosition];
      showMePopups();
      removeActivePopup();
      showMePopups();
      flyToPoint(clickedListing);
      createPopUp(clickedListing);
      var activeItem = document.getElementsByClassName('active');
      showMePopups();
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      this.parentNode.classList.add('active');
    })
  }
}


function flyToPoint(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 16.5,
    pitch: 80
  });
}

function closeAllPopUps() {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  console.dir(popUps[0]);
  if (popUps[0] != null) popUps[0].remove();
}

function createPopUp(currentFeature) {
  var popup = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML('<h3>' + currentFeature.properties.name + '</h3>' + '<p>' + currentFeature.properties.description + '</p>')
    .addTo(map);
}
function deleteActiveItem(){
  var activeItem = document.getElementsByClassName('active');
  if (activeItem[0]) {
    activeItem[0].classList.remove('active');
  }
}
function removeActivePopup(){
  var activeItem = document.getElementsByClassName('active');
  console.dir(activeItem[0]);
  if(activeItem[0]){
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    popUps[0].remove();
  }
}
function showMePopups(){
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  console.log(popUps);
}
