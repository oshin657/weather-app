const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "e58ea2b202e39f85a1ff4d981cde0e6c";
const submitBtn = document.querySelector("#submit-btn");

submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const input = cityInput.value;
  if (input) {
    try {
      const weatherData = await getWeatherData(input);
      displayWeatherDataInfo(weatherData);
    } catch (error) {
      displayError(error);
    }
  } else {
    displayError("Please Enter some city name");
  }
});

async function getWeatherData(input) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new error("City Not Found");
  }

  return await response.json();
}

function displayWeatherDataInfo(data) {
  const city = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  card.textContent = "";
  card.style.display = "block";

  const cityDisplay = document.createElement("h1");
  const TempDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  card.appendChild(cityDisplay);
  TempDisplay.textContent = `${temperature.toFixed(1)}°C`;
  card.appendChild(TempDisplay);
  descDisplay.textContent = description;
  descDisplay.classList.add("desc");
  card.appendChild(descDisplay);
}

function displayError(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "block";
  card.appendChild(errorMessage);
}
