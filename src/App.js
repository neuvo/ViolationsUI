import { useState } from 'react';
import Paragraph from './Paragraph.js';
import ViolationsMenu from './ViolationsMenu.js';
import ViolationControls from './ViolationControls.js';
import rawViolations from './data/violations.json'
import rawParagraph from './data/paragraph.json'
import { Button } from 'react-bootstrap';


export default function ComplianceDashboard() {
    const [paragraphText, setParagraphText] = useState('');
    const [violations, setViolations] = useState(null);
    const [selectedViolation, selectViolation] = useState(null);

    function loadViolations() {
        console.log(rawViolations);
        console.log(rawParagraph);
        setParagraphText(rawParagraph);
        setViolations(rawViolations);
    }

    return <>
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
            <Paragraph id='paragraph' text={paragraphText} setText={setParagraphText} violation={selectedViolation}/>
        </div>
        <div id='violation-details'>
            <ViolationControls violation={selectedViolation} />
        </div>
    </>
}
