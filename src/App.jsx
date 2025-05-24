import axios from 'axios';
import { useState, useEffect } from 'react';
import Search from './componets/Search';
import LocationButton from './componets/LocationButton';
import WeatherInfo from './componets/WeatherInfo';
import { SearchIcon } from 'lucide-react';
import './App.css';
import Image from './assets/img/clima.webp';

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
					icon: res.data.weather[0].icon,
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
const urlImage = `url(${Image})`;
	// Main
	return (
		<div className="container"
				style={{
				backgroundImage: urlImage,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				
				backgroundAttachment: 'fixed',
				filter: 'blur(0px)',
				
				
				}}
>
			<div className="card">
				<h1 className='title'>Estadisticas del Clima</h1>
				<div className="card__header">
					{
						<Search
							HanddleSubmit={HanddleSubmit}
							value={value}
							setValue={setValue}
						/>
					}
					<LocationButton setCoords={setCoords} setError={setError} />
				</div>
				<div className='card__body'>
				{error && <p> {error} </p>}
				{weather && <WeatherInfo weather={weather} />}
				
				</div>
			</div>
		</div>
	);
}
export default App;
SearchIcon