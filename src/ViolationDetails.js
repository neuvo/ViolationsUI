import { Button } from "react-bootstrap";


/*
Violation schema:
[
    id: string,
    text: string,
    start: number,
    end: number,
    length: number,
    type: string,
    message: string,
    severity: string ['high'/'medium'/'low']
]
*/
export default function ViolationDetails({ violation, setViolations }) {
    if (!violation) {
        return <></>;
    }

    console.log(violation);
    
    return (<>
    <h2>Violation Details</h2>
    <div id='violation-details' className='d-grid gap-2 mb-2'>
        <p><strong>ID:</strong> {violation.id}</p>
        <p><strong>Type:</strong> {violation.type}</p>
        <p><strong>Severity:</strong> {violation.severity}</p>
        <p><strong>Violation:</strong> {violation.message}</p>
    </div>
    </>);
}