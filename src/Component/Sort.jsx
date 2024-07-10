import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Sort({ setSort }) {
  const handleSort = (sortOption) => {
    setSort(sortOption);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Sort
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSort("price:asc")}>
          Low to High
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort("price:desc")}>
          High to Low
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort(null)}>
          Default
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

Sort.propTypes = {
  setSort: PropTypes.func.isRequired,
};
