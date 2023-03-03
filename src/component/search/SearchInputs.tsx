import React, { useState } from "react";
import { Category } from "../../models/nobelPrize";
import { initialSearchParams, SearchParams } from "../../models/search";
import { Input } from "../input/Input";
import "./SearchInputs.css";

type SearchInputsProps = {
  onSearch: (params: SearchParams) => void
}
export const SearchInputs: React.FC<SearchInputsProps> = ({ onSearch }) => {
  const [filter, setFilter] = useState<SearchParams>(initialSearchParams);
  
  const handleInputChange = ({ target: {value, name} }) => {
    setFilter((prevState) => ({
      ...prevState,
      [name]: String(value)
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSearch(filter);
  };

  return (
    <>
      <div className="tooltip">
        <h4 className="warning">!</h4>
        <span className="tooltip-text">Respect capital letters on the name</span>
      </div>
      <form onSubmit={handleOnSubmit} className="form">
        <div className="form-inputs">
          <div className="inputs">
            <Input label="Name" name="name" type="text" onChange={handleInputChange} />
            <Input label="Year" name="year" type="number" onChange={handleInputChange} />
            <Input label="Motivation" name="motivation" type="text" onChange={handleInputChange} />
          </div>

          <div>
            <p>Category:</p>
            <input type="radio" id="none" name="category" value={""} checked={!filter.category} onChange={handleInputChange} />
            <label htmlFor="none">None</label><br/>

            <input type="radio" id="physics" name="category" value={Category.physics} checked={filter.category === Category.physics} onChange={handleInputChange} />
            <label htmlFor="physics">Physics</label><br/>

            <input type="radio" id="chemistry" name="category" value={Category.chemistry} checked={filter.category === Category.chemistry} onChange={handleInputChange} />
            <label htmlFor="chemistry">Chemistry</label><br/>

            <input type="radio" id="medicine" name="category" value={Category.medicine} checked={filter.category === Category.medicine} onChange={handleInputChange} />
            <label htmlFor="medicine">Medicine</label><br/>

            <input type="radio" id="literature" name="category" value={Category.literature} checked={filter.category === Category.literature} onChange={handleInputChange} />
            <label htmlFor="literature">Literature</label><br/>

            <input type="radio" id="peace" name="category" value={Category.peace} checked={filter.category === Category.peace} onChange={handleInputChange} />
            <label htmlFor="peace">Peace</label><br/>

            <br/>
          </div>
        </div>

        <button className="button" type="submit">Search</button>
      </form>
    </>
  );
};
