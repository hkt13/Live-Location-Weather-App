const imgel = document.querySelector('.condition')
const showimgel = document.querySelector('.show_img')
const cityel = document.getElementById('city')
const dateel = document.getElementById('date')
const timeel = document.getElementById('time')
const tempel = document.querySelector('.temp')
const h4el = document.querySelector('h4')
const resultel = document.getElementsByClassName('result')
const iconel = document.querySelector('.icon')
const loadingel = document.querySelector('.loading')
const showel = document.querySelector('.show')
const loading = false;
const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let dayname = date.getDay();
let monthIndex = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


const getweather = (city) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9ceb7fe10c456b101d9c7fcdf6d8b08f&units=metric`)
    .then(response => response.json())
    .then((response) => {
      console.log(response)
      cityel.innerText = city;
      tempel.innerHTML = `${Math.floor(response.main.temp)}° <div> C</div>`
      show_weather(response)
    })
}


const search_weather = (e) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=9ceb7fe10c456b101d9c7fcdf6d8b08f&units=metric`).then(response => response.json()).then(data => show_weather(data)).catch(error => {

    h4el.innerText = 'Not Found the city you requested'
    resultel[0].innerText = 0;
    resultel[1].innerText = 0;
    resultel[2].innerText = 0;
    resultel[3].innerText = 0;
    iconel.style.display = 'none'
  })


}

const successCallback = (position) => {

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=9ceb7fe10c456b101d9c7fcdf6d8b08f`).then(data => data.json()).then(data => {
    loadingel.style.display = 'none';
    showel.style.display = 'flex';
    getweather(data.name)
  })
};

const errorCallback = (error) => {
  console.log(error);
  loadingel.style.display = 'none';
  showel.style.display = 'flex';
  getweather('Delhi')
  alert(
    "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
  )
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

const show_weather = (response) => {
  console.log(response)
  if (response.weather[0].main === 'Haze') {
    showimgel.src = './images/haze.gif'
  }
  else if (response.weather[0].main === 'Mist') {
    showimgel.src = './images/mist.gif'
  }
  else if (response.weather[0].main === 'Clear') {
    showimgel.src = './images/clear.gif'
  }
  else if (response.weather[0].main === 'Clouds') {
    showimgel.src = './images/clouds.gif'
  }
  else if (response.weather[0].main === 'Rain') {
    showimgel.src = './images/rain.gif'
  }
  dateel.innerHTML = `${dayNames[dayname]}, ${day} ${monthIndex[month]} ${year}`
  h4el.innerText = `${response.name}, ${response.sys.country}`
  console.log(response.weather[0].icon)
  iconel.style.display = 'inline'
  iconel.src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
  resultel[0].innerText = `${Math.floor(response.main.temp)}C(${response.weather[0].main})`
  resultel[1].innerText = `${response.main.humidity}%`
  resultel[2].innerText = `${Math.floor(response.main.temp_max)}C||${Math.floor(response.main.temp_min)}C`
  resultel[3].innerText = `${response.wind.speed} Km/Hr`
}

(
  function call() {

    timeel.innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", second: "2-digit", hour12: false });
    setTimeout(function () { call() }, 1000);


  }
)();
