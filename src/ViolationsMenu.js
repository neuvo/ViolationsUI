import ViolationControls from "./ViolationControls.js"
import Dropdown from 'react-bootstrap/Dropdown'

export default function ViolationsMenu({paragraphText, violations, selectViolation}) {
    if (paragraphText === null || violations === null) {
        return <></>
    }

    const dropdownItems = violations.map(violation => {
        return (
            <Dropdown.Item 
                key={violation.id}
                href=""
                onClick={() => selectViolation(violation)}>
                    {violation.id}
            </Dropdown.Item>
        );
    });

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Violations
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {dropdownItems}
            </Dropdown.Menu>
        </Dropdown>
    );
}