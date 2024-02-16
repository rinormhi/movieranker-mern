import GenreDropdown from './GenresDropdown';
import YearDropdown from './YearDropdown';
import PriceDropdown from './PriceDropdown';
import RatingDropdown from './RatingDropdown';
import SortDropdown from './SortDropdown';

const FilterMenu = () => {
    return (
        <div className=" flex gap-4 text-md font-medium">
            <div className="filterOption text-color-link hover:text-color-link-hover cursor-pointer">
                <YearDropdown name="Erscheinungsjahr" />
            </div>

            <div className="filterOption text-color-link hover:text-color-link-hover cursor-pointer">
                <GenreDropdown name="Genres" />
            </div>

            <div className="filterOption text-color-link hover:text-color-link-hover cursor-pointer">
                <PriceDropdown name="Preis" />
            </div>

            <div className="filterOption text-color-link hover:text-color-link-hover cursor-pointer">
                <RatingDropdown name="Bewertung" />
            </div>
            <div className="relative filterOption text-color-link hover:text-color-link-hover cursor-pointer">
                <SortDropdown name="Sortieren nach" />
            </div>
        </div>
    );
}

export default FilterMenu;