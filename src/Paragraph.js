export default function Paragraph({text, setText, violation}) {
    if (violation) {
        return (
            <p>
                {text.slice(0, violation.start)}
                <mark>
                    <span style={{color: 'red'}}>{text.slice(violation.start, violation.end)}</span>
                </mark>
                {text.slice(violation.end)}
            </p>
        );
    } else {
        return text;
    }
}