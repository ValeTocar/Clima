import { Droplets } from 'lucide-react';
import { Thermometer } from 'lucide-react';
import { Wind } from 'lucide-react';
import { Cloud } from 'lucide-react';
import { Sunrise } from 'lucide-react';
import { Sunset } from 'lucide-react';
import { Gauge } from 'lucide-react';
import { MapPin } from 'lucide-react';
import './WeatherInfo.css';

function WeatherInfo({ weather }) {
	return (
		<div className="card__info">
			{weather && (
				<div className="card__contenido">
					<h2 card__title>
						<MapPin className="card__icon" />
						{weather.name},<span className="card_spam">{weather.county}</span>
					</h2>

					<img
					className='card__img'
						src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
						alt={weather.description}
					/>

					<h3 className="card__temp">{weather.temp}°C</h3>

					<div className="card__details">
						<div className="card__details">
							<p className="card__details_item">
								<Droplets className="icon" />
								<span className="card__details__text">
									Humedad
									<span className="card__details__item_value">
										{weather.humidity}%
									</span>
								</span>
							</p>
						</div>
						<div className="card__details">
							<p className="card__details_item">
								<Wind className="icon" />
								<span className="card__details__text">
									Velocidad
									<span className="card__details__item_value">
										{weather.wind} m/s
									</span>
								</span>
							</p>
						</div>
						<div className="card__details">
							<p className="card__details_item">
								<Cloud className="icon" />
								<span className="card__details__text">
									Clima
									<span className="card__details__item_value">
										{weather.description}
									</span>
								</span>
							</p>
						</div>
						<div className="card__details">
							<p className="card__details_item">
								<Gauge className="icon" />
								<span className="card__details__text">
									Presion
									<span className="card__details__item_value">
										{weather.pressure} hPa
									</span>
								</span>
							</p>
						</div>
						<div className="card__details">
							<p className="card__details_item">
								<Thermometer className="icon" />
								<span className="card__details__text">
									Sensacion Termica
									<span className="card__details__item_value">
										{weather.feels_like}°C
									</span>
								</span>
							</p>
						</div>
						<div className="card__details">
							<p className="card__details_item">
								<Cloud className="icon" />
								<span className="card__details__text">
									Nubosidad
									<span className="card__details__item_value">
										{weather.clouds}%
									</span>
								</span>
							</p>
						</div>
						<div className="card__details">
							<p className="card__details_item">
								<Sunrise className="icon" />
								<span className="card__details__text">
									Amanecer
									<span className="card__details__item_value">
										{weather.sunrise}
									</span>
								</span>
							</p>
						</div>
						<div className="card__details">
							<p className="card__details_item">
								<Sunset className="icon" />
								<span className="card__details__text">
									Atardecer
									<span className="card__details__item_value">
										{weather.sunset}
									</span>
								</span>
							</p>
						</div>
						<div className="card__details">
							<p className="card__details_item">
								<Sunset className="icon" />
								<span className="card__details__text">
									Visibilidad
									<span className="card__details__item_value">
										{weather.visibility}km
									</span>
								</span>
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default WeatherInfo;
