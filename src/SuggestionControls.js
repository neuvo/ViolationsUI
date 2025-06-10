import { Button } from "react-bootstrap";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function SuggestionControls({ selectedViolation, selectViolation, violations, setViolations, suggestions, paragraphText, setParagraphText }) {
    const [selectedSuggestion, selectSuggestion] = useState(null);
    if (!selectedViolation) {
        return <></>;
    }

    const dropdownItems = suggestions[selectedViolation.id]
        .map((suggestion, index) => {
            const key = selectedViolation.id + '.' + index;
            return (
                <Dropdown.Item
                    key={key}
                    href=''
                    onClick={() => selectSuggestion(suggestion)}>
                        Suggestion {index+1}
                </Dropdown.Item>
            );
        });
    
    function acceptSuggestion() {
        const nextParagraphText = paragraphText.slice(0, selectedViolation.start) + 
            selectedSuggestion +
            paragraphText.slice(selectedViolation.end);
        setParagraphText(nextParagraphText);
        const textLengthDiff = selectedViolation.length - selectedSuggestion.length;
        setViolations(violations
            .filter(violation => violation.id !== selectedViolation.id)
            .map(violation => {
                let nextStart = violation.start;
                let nextEnd = violation.end;

                if (violation.start > selectedViolation.start) {
                    nextStart -= textLengthDiff;
                    nextEnd -= textLengthDiff;
                }

                return {
                    ...violation,
                    start: nextStart,
                    end: nextEnd
                }
            })
        );

        selectViolation(null);

    }
    
    function submitChange(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        setViolations(violations.filter(violation => violation.id !== selectedViolation));
        setParagraphText(nextParagraphText);
    }

    return (<>
    <Dropdown>
        <Dropdown.Toggle variant='warning'>
            Suggestions
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {dropdownItems}
        </Dropdown.Menu>
    </Dropdown>
    <br />
    <p><strong>Suggested replacement:</strong> <span style={{color:'red'}}>{selectedSuggestion}</span></p>
    <Button variant='success' onClick={acceptSuggestion}>Accept Suggestion</Button>
    <br />
    <br />
    <div id='custom-change'>
        <InputGroup className='mb-3'>
            <InputGroup.Text id='custom-form'>Custom</InputGroup.Text>
            <Form.Control
                placeholder='Optional: Write a custom change here instead of using a suggested change'
                aria-label='Optional: Write a custom change here instead of using a suggested change'
                aria-describedby='custom-form'
                onSubmit={submitChange}
            />
        </InputGroup>
        <Button type='submit' variant='success'>Submit Custom Change</Button>
    </div>
    <br />
    <div id='dismiss-div'>
        <InputGroup className='mb-3'>
            <InputGroup.Text id='dismiss-form'>Reject message</InputGroup.Text>
            <Form.Control
                placeholder='Explain why you are dismissing the violation'
                aria-label='Explain why you are dismissing the violation'
                aria-describedby='reject-form'
            />
        </InputGroup>
        <Button onClick={() => console.log('reject clicked')} variant='danger'>Submit Dismissal</Button>
    </div>
    </>);
}