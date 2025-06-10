import Dropdown from 'react-bootstrap/Dropdown'

export default function ViolationsMenu({paragraphText, violations, selectViolation}) {
    if (paragraphText === null || violations === null) {
        return <></>
    }

    if (violations.length === 0) {
        return <p><h3>All violations have been resolved!</h3></p>
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
            <Dropdown.Toggle variant='info' id='dropdown-basic'>
                Violations remaining: {violations && violations.length}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {dropdownItems}
            </Dropdown.Menu>
        </Dropdown>
    );
}