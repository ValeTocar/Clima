import { MapPinHouse } from 'lucide-react';
import './LocationButton.css';
function LocationButton({setCoords, setError}) {
  const HanddleLocation = () => {
		if (navigator.geolocation) {
			function success({ coords }) {
				setCoords({ lat: coords.latitude, lon: coords.longitude });
			}

			function error(err) {
				console.log('el usuario no acepto', err);
				setError('No se pudo obtener la ubicacion');
			}
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			setError('Tu navegador no soporta geolocalizacion');
		}
	};
  return (
    <button className='button' type="button" onClick={HanddleLocation}>
					<MapPinHouse className='location' />
				</button>
  )
}

export default LocationButton