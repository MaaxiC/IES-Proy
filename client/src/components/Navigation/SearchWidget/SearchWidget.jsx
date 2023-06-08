import "./SearchWidget.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const SearchWidget = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordInput, setWordInput] = useState("");

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordInput(searchWord);
    const newFilter = data.filter((value) => {
      return value.nombre.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord !== "") return setFilteredData(newFilter)
    
    return setFilteredData([]);
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordInput("");
  };

  return (
    <div className="search mx-3">
      <div className="d-flex">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          style={{ backgroundColor: "white" }}  
          onChange={handleFilter}
          value={wordInput}
        />
        <div
          className="searchIcon d-grid"
          style={{
            width: "50px",
            backgroundColor: "white",
            placeItems: "center",
          }}
        >
          {wordInput.length !== 0 ? (
            <AiOutlineClose size="20px" onClick={clearInput} id="clearBtn"/>
          ) : (
            <FaSearch size="20px" />
          )}
        </div>
      </div>
      {filteredData.length !== 0 ? (
        <div
          className="dataResult mt-2"
          style={{
            width: "300px",
            maxHeight: "200px",
            position: "absolute",
            overflow: "hidden",
            overflowY: "auto",
            backgroundColor: "white",
            boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
            zIndex: 1000,
            visibility: 'visible',
            //boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
          }}
        >
          {filteredData.slice(0, 10).map((item) => (
            <Link
              to={`/item/${item.id}`}
              className="nav-link item-link"
              onClick={clearInput}
              key={item.id}
            >
              <p className="text-center py-2 m-0" style={{ height: "40px" }}>
                {item.nombre}
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchWidget;
