import { Search as SearchIcon} from 'lucide-react';
import './Search.css';
function Search({HanddleSubmit, value, setValue}) {

	
	return (
			<form className="search__form" onSubmit={HanddleSubmit}>
	
			<SearchIcon className='search__icon' />
			<input
			className="search__input"
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Buscar ciudad"
			/>
		</form>
	)
}

export default Search