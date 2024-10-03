import React, { useEffect, useRef, useState } from 'react';
import "./Weather.css";
import SearchImg from "./../assets/search.png";
import Clear_icon from "./../assets/clear.png";
import Cloud_icon from "./../assets/cloud.png";
import Drizzle_icon from "./../assets/drizzle.png";
import Snow_icon from "./../assets/snow.png";
import Wind_icon from "./../assets/wind.png";
import Humidity_icon from "./../assets/humidity.png";
import axios from 'axios';

const Weather = () => {
  // https://api.weatherapi.com/v1/current.json?key=e97ec64760924dbc9e5161357243008&q=delhi
  const [inputData, setInputData] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperature,setTemperature] = useState("");
  const [wind, setWind] = useState("");
  const [location, setLocation] = useState("");
  const [icon, setIcon] = useState();
  const inputRef = useRef()

  const HandleChange=(e)=>{
    setInputData(e.target.value);
  }
  const Search = async()=>{
    if(inputRef.current.value===""){
      alert("Please Enter City Name");
      return;
    }
  
    try{
      const URL = `https://api.weatherapi.com/v1/current.json?key=e97ec64760924dbc9e5161357243008&q=${inputData}`;
      const data = await axios.get(URL);
      const finalData = data.data;
      setHumidity(finalData.current.humidity);
      setTemperature(Math.floor(finalData.current.temp_c));
      setWind(Math.floor(finalData.current.wind_kph));
      setLocation(finalData.location.name);
      setIcon(finalData.current.condition.icon)
      
    }catch(err){

    }
  }
  // useEffect(()=>{
  //   Search()
  // },[])
  return (
    <>

      <div className="weather">
        <div className="searchBar">
            <input ref={inputRef} type="text" onChange={HandleChange} placeholder='Search' />
            <img src={SearchImg} onClick={Search} alt="searchIcon" />
        </div>
        <img src={icon} className='weatherICON' />
        <p className='temperature'>{temperature}°C</p>
        <p className='location'>{location}</p>
        <div className="weather_data">
          <div className="col">
            <img src={Humidity_icon} />
            <div>
              <p>{humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>

          <div className="col">
            <img src={Wind_icon} />
            <div>
              <p>{wind} KM/H</p>
              <span>Wind Speed</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Weather;
