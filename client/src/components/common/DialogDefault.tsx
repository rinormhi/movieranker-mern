import React, { useState, ReactNode } from "react";
import RegisterForm from "../RegisterForm";
import CustomButton from "../common/Button";

interface DialogProps {
    open: boolean;
    handler: () => void;
    children: ReactNode;
}

interface ButtonProps {
    onclick: () => void;
    variant: string;
    color?: string;
    className?: string;
    children: ReactNode;
}

const DialogHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
    <h4 className="text-center pb-4">{children}</h4>
);

const DialogBody: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="mb-4">{children}</div>
);

const Dialog: React.FC<DialogProps> = ({ open, handler, children }) => {
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        handler();
    };

    return (
        <>
            {open && (
                <div className="z-8 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
                    <div className="bg-color-dark-grey mx-auto p-8 rounded-xl w-11/12 md:w-[600px]" onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}


export function DialogDefault() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>

            <CustomButton onclick={handleOpen} name="Jetzt registrieren" />
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Jetzt kostenlos starten</DialogHeader>
                <DialogBody>
                    <RegisterForm />
                </DialogBody>
            </Dialog>
        </>
    );
}
