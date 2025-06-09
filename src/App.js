import { useState } from 'react';
import Paragraph from './Paragraph.js';
import Violations from './Violations.js';

export default function ComplianceDashboard() {
    const [paragraphText, setParagraphText] = useState('Hello world!');
    return <>
        <div id='paragraph-div'><Paragraph id='paragraph' text={paragraphText} setText={setParagraphText}/></div>
        <div id='violations-div'><Violations /></div>
    </>
}
