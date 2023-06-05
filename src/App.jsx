import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [backgroundClass, setBackgroundClass] = useState('')
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5ab2e8c3c5c0ce369531c65092497e5e&units=metric`;
  
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
      setLocation("");
    }
  };

  useEffect(() => {
    if(data.weather) {
      const weather = data.weather[0].main;
      const background = getBackgroundByWeather(weather);
      setBackgroundClass(background)
    }
  }, [data.weather, backgroundClass])

  const getBackgroundByWeather = (weather) => {
    switch(weather) {
      case "Clear":
        return "clear";
      case "Night":
        return "night";
      case "Clouds":
        return "rain";
      case 'Rain':
        return 'rain'
      case "Snow":
        return "snow";
      default:
        return "";
    }
  }

  return (
    <div c  className={`app ${backgroundClass}`}
    style={{
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className='search'>
        <input
          className='input'
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder='Search for city'
          type='text'
        ></input>
      </div>
      <div className="current-location"><button className="current">Current location</button></div>
      {data.name !== undefined && (
        <div className='container'>
          <div className='top'>
            <div className='location'>
              <p>{data.name}</p>
            </div>
            <div className='temperature'>
              {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
            </div>
          </div>
          <div className='description bold'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

          <div className='bottom'>
            <div className='feels'>
              {data.main ? (
                <p className='bold'>{Math.round(data.main.feels_like)}°C</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className='humidity'>
              {data.main ? (
                <p className='bold'>{data.main.humidity} %</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? (
                <p className='bold'>{data.wind.speed} KM/h</p>
              ) : null}
              <p>Wind speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;