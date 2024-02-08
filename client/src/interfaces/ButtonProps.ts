
export interface ButtonProps {
    target?: string;
    name: string | React.ReactNode;
    onclick?: () => void;
    classes?: string;
    type?: "button" | "submit" | "reset";
}
