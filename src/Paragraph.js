export default function Paragraph({text, setText, violation}) {
    console.log(violation);
    if (violation !== null) {
        console.log('violation is not null! yippee!');
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
        console.log('violation is null. boo.');
        return text;
    }
}