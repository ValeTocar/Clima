import axios from 'axios';
import { useState, useEffect } from 'react';

// API Weather
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = 'd29e1fb1eee76ee8a2dd9e87dc06c1e8';
const query = 'q={city name}';
const coordsx = 'lat={lat}&lon={lon}';
const options = '&lang=es&units=metric';
// Function to get the weather by city name or coordinates
function App() {
	// city and cords
	const [weather, setWeather] = useState({});
	const [city, setCity] = useState('Caracas');
	const [coords, setCoords] = useState({ lat: 0, lon: 0 });
	const [value, setValue] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		getWeatherByCity();
	}, [city, coords]);

	const getWeatherByCity = async () => {
		const { lat, lon } = coords;
		setError(null);
		// Axios Get request
		axios
			.get(
				`${BASE_URL}${
					lat !== 0 && lon !== 0 ? `lat=${lat}&lon=${lon}` : `q=${city}`
				}&appid=${API_KEY}${options}`,
			)
			.then((res) => {
				const timeOptions = {
					hour: '2-digit',
					minute: '2-digit',
				};
				setWeather({
					name: res.data.name,
					county: res.data.sys.country,
					weather: res.data.weather[0].description,
					description: res.data.weather[0].description,
					temp: Math.ceil(res.data.main.temp),
					humidity: res.data.main.humidity,
					wind: res.data.wind.speed,
					pressure: res.data.main.pressure,
					visibility: res.data.visibility,
					feels_like: res.data.main.feels_like,
					clouds: res.data.clouds.all,
					sunrise: new Date(res.data.sys.sunrise * 1000).toLocaleTimeString(
						[],
						timeOptions,
					),
					sunset: new Date(res.data.sys.sunset * 1000).toLocaleTimeString(
						[],
						timeOptions,
					),
					coords: {
						lat: res.data.coord.lat,
						lon: res.data.coord.lon,
					},
				});
			})
			.catch((err) => {
				if (err.response?.status === 404) {
					setError('Ciudad no Disponible');
					console.error(err.response?.data?.message || err.message);
				}
			});
	};
	const HanddleSubmit = (e) => {
		e.preventDefault();
		setCity(value);
		setCoords({ lat: 0, lon: 0 });
		setValue('');
	};
	const HanddleLocation = () => {
		if (navigator.geolocation) {
			function success({ coords }) {
 
	setCoords({ lat: coords.latitude, lon: coords.longitude });
}

function error(err) {
  console.log('el usuario no acepto', err)
	setError('No se pudo obtener la ubicacion');
}
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			setError('Tu navegador no soporta geolocalizacion');
		}
	}
	// Main
	return (
		<div>
			<h1>Weather App</h1>
			<div style ={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
				{/* Buscador por Pais */}
				<form onSubmit={HanddleSubmit}>
					<input
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</form>
				<button type='button' onClick={HanddleLocation}>ubicacion</button>
			</div>
			{error && <p> {error} </p>}

			{/* Informacion del estado del clima */}

			{weather && (
				<>
					<h3>
						{weather.name},<span>{weather.county}</span>
					</h3>
					<p>Temperatura: {weather.temp}°C</p>
					<p>Humedad: {weather.humidity}%</p>
					<p>Viento: {weather.wind} m/s</p>
					<p>
						Coordenadas: {weather.lat} {weather.lon}
					</p>
					<p>Descripción: {weather.weather}</p>
				</>
			)}
		</div>
	);
}
export default App;
