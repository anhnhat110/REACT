import { useState, useEffect } from "react";
import "../styles/Filter.css";

export default function Filter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    top: false,
    bottom: false,
    outerwear: false,
    dress: false,
  });

  useEffect(() => {
    const filterParams = Object.keys(filters)
      .filter((key) => filters[key])
      .map((key) => key);
    onFilterChange(filterParams); // Gọi callback để cập nhật filterParams trong Body.jsx
  }, [filters, onFilterChange]);

  const handleFilterChange = (filterType, isChecked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: isChecked,
    }));
  };

  return (
    <> 
    <div className="box-filter">
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          className="check"
          id="check-top"
          checked={filters.top}
          onChange={(e) => handleFilterChange("top", e.target.checked)}
        />
        <label htmlFor="check-top" className="label">
          <svg width="30" height="30" viewBox="0 0 95 95">
            <rect x="30" y="20" width="50" height="50" stroke="black" fill="none" />
            <g transform="translate(0,-952.36222)">
              <path
                d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
                stroke="black"
                strokeWidth="3"
                fill="none"
                className="path1"
              />
            </g>
          </svg>
          <span>Top</span>
        </label>
      </div>
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          className="check"
          id="check-bottom"
          checked={filters.bottom}
          onChange={(e) => handleFilterChange("bottom", e.target.checked)}
        />
        <label htmlFor="check-bottom" className="label">
          <svg width="30" height="30" viewBox="0 0 95 95">
            <rect x="30" y="20" width="50" height="50" stroke="black" fill="none" />
            <g transform="translate(0,-952.36222)">
              <path
                d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
                stroke="black"
                strokeWidth="3"
                fill="none"
                className="path1"
              />
            </g>
          </svg>
          <span>Bottom</span>
        </label>
      </div>
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          className="check"
          id="check-outerwear"
          checked={filters.outerwear}
          onChange={(e) => handleFilterChange("outerwear", e.target.checked)}
        />
        <label htmlFor="check-outerwear" className="label">
          <svg width="30" height="30" viewBox="0 0 95 95">
            <rect x="30" y="20" width="50" height="50" stroke="black" fill="none" />
            <g transform="translate(0,-952.36222)">
              <path
                d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
                stroke="black"
                strokeWidth="3"
                fill="none"
                className="path1"
              />
            </g>
          </svg>
          <span>Outerwear</span>
        </label>
      </div>
      </div>
    </>
  );
}
