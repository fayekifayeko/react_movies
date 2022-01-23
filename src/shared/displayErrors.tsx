
interface DisplayErrorsProps {
    errors?: string[];
}

export default function DisplayErrors(props: DisplayErrorsProps) {
    const style = {color: 'red'};
return (
<>
{props.errors ? 
<ul style={style}>
{props.errors.map((item, index) => <li key={index}>{item}</li>)}
</ul> : null
}
</>
);
}