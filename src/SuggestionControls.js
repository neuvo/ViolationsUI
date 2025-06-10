import { Button } from "react-bootstrap";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import { Form } from "react-bootstrap";

export default function SuggestionControls({ selectedViolation, selectViolation, violations, setViolations, suggestions, selectedSuggestion, selectSuggestion, paragraphText, setParagraphText }) {
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
    
    function applyChange(replacementText) {
        const nextParagraphText = paragraphText.slice(0, selectedViolation.start) + 
                replacementText +
                paragraphText.slice(selectedViolation.end);
        setParagraphText(nextParagraphText);
        const textLengthDiff = selectedViolation.length - replacementText.length;
        const nextViolations = violations
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
            });
        setViolations(nextViolations);

        selectViolation(nextViolations && nextViolations[0]);
        selectSuggestion(suggestions && nextViolations && nextViolations[0] && suggestions[nextViolations[0].id][0]);
    }
    
    function submitCustomChange(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let customText = '';
        for (let value of formData.values()) {
            // form data SHOULD only have one entry
            customText = value;
        }
        applyChange(customText);
    }

    function submitDismissal(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let dismissalComment = '';
        for (let value of formData.values()) {
            // form data SHOULD only have one entry
            dismissalComment = value;
        }

        if (dismissalComment.length === 0) {
            alert('You must provide a comment to justify your dismissal');
            return;
        }

        setViolations(violations.filter(violation => violation.id !== selectedViolation.id));
        selectViolation(null);
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
    <Button variant='success' onClick={
        () => {
            applyChange(selectedSuggestion)
        }}>Accept Suggestion</Button>
    <br />
    <br />
    <div id='custom-change'>
        <Form onSubmit={submitCustomChange} className='mb-3'>
            <Form.Text id='custom-form'>Custom</Form.Text>
            <Form.Control
                placeholder='Optional: Write a custom change here instead of using a suggested change'
                aria-label='Optional: Write a custom change here instead of using a suggested change'
                aria-describedby='custom-form'
                name={'custom-change'}
            />
            <Button type='submit' variant='success'>Submit Custom Change</Button>
        </Form>
    </div>
    <br />
    <div id='dismiss-div'>
        <Form onSubmit={submitDismissal} className='mb-3'>
            <Form.Text id='dismiss-form'>Dismissal Reason</Form.Text>
            <Form.Control
                placeholder='Explain why you are dismissing the violation'
                aria-label='Explain why you are dismissing the violation'
                aria-describedby='reject-form'
                name={'dismissal-comment'}
            />
            <Button type='submit' variant='danger'>Submit Dismissal</Button>
        </Form>
        
    </div>
    </>);
}