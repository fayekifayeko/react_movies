
interface ButtonProps {
    children: React.ReactNode;
    onClick(): void;
}

export default function Button (props: ButtonProps) {
    return (
        <button className="btn btn-primary" onClick={props.onClick}>{props.children}</button>
    );
}