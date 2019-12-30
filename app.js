function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: { lat: -25.363882, lng: 131.044922 },
  });

  const proxy = 'http://cors-anywhere.herokuapp.com/';
  const api = 'https://api.darksky.net/forecast/3b19ff85d544144e2306cb0d85ea9cb0/';
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let degreeSection = document.querySelector('.degree-section');
  let degreeSpan = document.querySelector('.degree-section span');

  map.addListener('click', function(e) {
    let posicion = JSON.parse(JSON.stringify(e.latLng));
    fetch(`${proxy}${api}${posicion.lat},${posicion.lng}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        //console.log(data);
        const { temperature, summary, icon } = data.currently;
        let floatTemperature = parseFloat(temperature);
        degreeSpan.textContent = 'C';
        temperatureDegree.textContent = Math.floor((floatTemperature - 32) * (5 / 9));
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
        setIcons(icon, document.getElementById('icon'));
        degreeSection.addEventListener('click', () => {
          if (degreeSpan.textContent === 'F') {
            degreeSpan.textContent = 'C';
            temperatureDegree.textContent = Math.floor(
              (floatTemperature - 32) * 0.5555555555555556,
            );
          } else {
            degreeSpan.textContent = 'F';
            temperatureDegree.textContent = temperature;
          }
        });
        //console.log(data.currently);
      });
  });

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
}
