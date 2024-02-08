import { ReactNode } from "react";

export interface DialogProps {
    open: boolean;
    handler: () => void;
    children: ReactNode;
}
