
 //<reference types="../@types/jquery "/>
const searchInput = document.querySelector('.searchInput');
const searchBtn = document.querySelector('.searchBtn');

// * ------------ Fetch Data --------------
async function getData(searchValue){
 let forecastResponce =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8ee0140c2ffc4bbd934204803241407&q=${searchValue}&days=3`);
 let data =await forecastResponce.json();
 DisplayData(data);
 
}



// *------------Display Data --------------
let array=[]
function DisplayData(data){
    let location = data.location.name;
    let array = data.forecast.forecastday;
    let currentTemp = data.current.temp_c
    console.log(array);
let cartona = ``
for( var i=0 ; i<array.length ; i++){
    let x = getDay(array[i].date)
  console.log(x);
cartona +=`
  <div class="col-md-4 forecast-card bg-sec p-0">
          <div class=" d-flex justify-content-between align-items-center txt-grey p-2 card-header">
            <p class="m-0">${x.Day}</p>
           <div>
            <span>${i < 1 ? x.month : ''}</span>
           </div>
        </div>

        <div class="px-3">
          <p class="txt-grey fs-5 m-0">${i < 1 ? location : ''}</p>

         ${i<1 ?
          ` <div class="degree text-white fs-70 me-4 ">
              <span>${ currentTemp } <sup>o</sup>C</span>
          </div>`:`  <div class="py-5">
          <div class="text-white fs-3 fw-bold">
          <span class="max-temp  ">${array[i].day.maxtemp_c}</span><sup>o</sup>C</div>
          <div class="txt-grey fs-6  ">
          <span class="min-temp ">${array[i].day.mintemp_c}</span><sup>o</sup>C</div>
          </div>`
         }

          <img src="${i < 1 ? data.current.condition.icon : array[i].day.condition.icon}" alt="" width="90" class="">
          <p class="txt-blue my-4">${i <1 ? data.current.condition.text : array[i].day.condition.text}</p>

        ${i<1 ? 
            `  <div class="card-footer d-flex txt-grey">
            <div class="d-flex me-3">
              <img src="./imgs/icon-umberella.png" class="me-1" alt=""  width="20" height="20">
              <p>${array[i].day.avghumidity}%</p>
            </div>
  
            <div class="d-flex me-3">
              <img src="./imgs/icon-wind.png" class="me-1" alt="" width="20" height="20">
              <p>${array[i].day.maxwind_kph}Kph</p>
            </div>
            
            <div class="d-flex me-3">
              <img src="./imgs/icon-compass.png" class="me-1" alt="" width="20" height="20">
              <p>${data.current.wind_dir}</p>
            </div>
  
          </div>`: ''}
      </div>
         
          </div>`
}
document.querySelector(".row-container").innerHTML=cartona;
}

function getDay(x){
    let date = new Date(x)
    let Day = date.toLocaleDateString("en-us" , {weekday:"long"})
    let month = date.toLocaleDateString("en-us" , {month:"long"})
    return {Day , month }
}

searchInput.addEventListener( "input" , function(){
  if(searchInput.value.length<3)
    return false;
    getData(searchInput.value);
  
 
})

searchBtn.addEventListener("click" , function(){
  getData(searchInput.value)
})

// *Geolocation
navigator.geolocation.getCurrentPosition(success , Error);
function success(position){
console.log(position);
let x = position.coords.latitude;
let y = position.coords.longitude;
console.log(x , y);
getData(`${x},${y}`)
}
function Error(error){
getData('Cairo');
}