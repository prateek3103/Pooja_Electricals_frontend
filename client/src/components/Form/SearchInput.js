import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../styles/input.css'
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {    
      console.log(error);
    }
  };
  return (
    <div>   
      <form
        className="form"
        role="search"
        onSubmit={handleSubmit}
      >
       <div className="search-input">
        <div className="search-input-container">
        <input
          className="rounded-input"
          type="search"
          placeholder="Search for Products"
          aria-label="Search for Products"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <i className="fas fa-search search-icon" onClick={handleSubmit}></i> 
        </div>
        </div>   
      </form>
    </div>
  );
};  

export default SearchInput;
