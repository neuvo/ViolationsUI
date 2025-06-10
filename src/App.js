import { useState } from 'react';
import Paragraph from './Paragraph.js';
import ViolationsMenu from './ViolationsMenu.js';
import ViolationDetails from './ViolationDetails.js';
import rawViolations from './data/violations.json'
import rawParagraph from './data/paragraph.json'
import rawSuggestions from './data/suggestions.json'
import { Button, Container } from 'react-bootstrap';
import SuggestionControls from './SuggestionControls.js';


export default function ComplianceDashboard() {
    const [paragraphText, setParagraphText] = useState('');
    const [violations, setViolations] = useState(null);
    const [selectedViolation, selectViolation] = useState(null);
    const [suggestions, setSuggestions] = useState(null);

    function loadViolations() {
        // TODO: in a production app, this would need to hit a backend API to load the appropriate data
        // For this exercise, we simply load them from files
        setParagraphText(rawParagraph);
        setViolations(rawViolations);
        setSuggestions(rawSuggestions);
    }

    return <Container className='mt-4 panel'>
        <div id='load-button'>
            <label>
                <Button id='load-button' onClick={loadViolations} violations={violations} setViolations={setViolations}>Load Violations</Button>
            </label>
        </div>
        <br/>
        <div id='violations-div'>
            <ViolationsMenu id='violations-menu' violations={violations} setViolations={setViolations} selectViolation={selectViolation} />
        </div>
        <div id='paragraph-div'>
            {paragraphText && <h1>Text:</h1>}
            <Paragraph id='paragraph' text={paragraphText} setText={setParagraphText} violation={selectedViolation}/>
        </div>
        <div id='violation-details'>
            <ViolationDetails violation={selectedViolation} />
        </div>
        <div>
            <SuggestionControls 
                selectedViolation={selectedViolation}
                selectViolation={selectViolation}
                violations={violations} 
                setViolations={setViolations} 
                suggestions={suggestions} 
                paragraphText={paragraphText} 
                setParagraphText={setParagraphText} />
        </div>
    </Container>
}