import { useState } from 'react';
import Paragraph from './Paragraph.js';
import ViolationsMenu from './ViolationsMenu.js';
import ViolationDetails from './ViolationDetails.js';
import rawViolations from './data/violations.json'
import rawParagraph from './data/paragraph.json'
import rawSuggestions from './data/suggestions.json'
import { Button, Container } from 'react-bootstrap';
import SuggestionControls from './SuggestionControls.js';


/*
TODO:
Add a header that explains the workflow
Automatically select the first violation that's been loaded
    Maybe mention that you can navigate with TAB/SHIFT+TAB/ENTER?
If all violations are resolved, announce this to the user and present them with the final version
Use banners instead of alerts
*/
export default function ComplianceDashboard() {
    const [paragraphText, setParagraphText] = useState('');
    const [violations, setViolations] = useState(null);
    const [selectedViolation, selectViolation] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [selectedSuggestion, selectSuggestion] = useState(null);

    function loadViolations() {
        // In a production app, this would need to hit a backend API to load the appropriate data
        // For this exercise, we simply load them from files
        setParagraphText(rawParagraph);
        setViolations(rawViolations);
        setSuggestions(rawSuggestions);
        selectViolation(rawViolations && rawViolations[0]);
        selectSuggestion(rawSuggestions && rawViolations && rawSuggestions[rawViolations[0].id][0]);
    }

    return <Container className='mt-4 panel'>
        <div id='header-div'>
            <label>
                <h1><strong>ViolationsUI</strong></h1>
            </label>
            <p>Click on "Load Violations" to get started.</p>
            <p>Then for each violation, either:</p>
            <ul>
                <li>Accept one of three suggested changes,</li>
                <li>Supply your own, custom change,</li>
                <li>Or dismiss the violation</li>
            </ul>
        </div>
        <br/>
        <div id='load-button-div'>
            <label>
                <Button id='load-button' onClick={loadViolations} violations={violations} setViolations={setViolations}>Load Violations</Button>
            </label>
        </div>
        <br/>
        <div id='violations-div'>
            <ViolationsMenu id='violations-menu' violations={violations} setViolations={setViolations} selectViolation={ violation => {
                selectViolation(violation);
                selectSuggestion(suggestions[violation.id][0]);
            }} />
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
                selectedSuggestion={selectedSuggestion}
                selectSuggestion={selectSuggestion}
                paragraphText={paragraphText} 
                setParagraphText={setParagraphText} />
        </div>
    </Container>
}