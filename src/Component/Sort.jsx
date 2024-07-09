import { Dropdown } from "react-bootstrap"

export default function Sort() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Sort
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item >Low to High</Dropdown.Item>
        <Dropdown.Item >High to Low</Dropdown.Item>
        <Dropdown.Item >Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
