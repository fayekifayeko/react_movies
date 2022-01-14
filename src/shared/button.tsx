
interface ButtonProps {
    children: React.ReactNode;
    onClick?(): void;
    type: 'button' | 'submit';
    disabled: boolean;
    className: string;
}

export default function Button (props: ButtonProps) {
    return (
        <button 
        className={props.className}
         onClick={props.onClick}
        type={props.type}
        disabled={props.disabled}
        >

        {props.children}

        </button>
    );
}

Button.defaultProps ={
    type: 'button',
    disabled: false,
    className: "btn btn-primary"
}