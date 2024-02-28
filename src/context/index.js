'use client'

const { createContext, useState } = require("react");

export const LoginContext = createContext({
    open: false,
    handleOpen: () => {}
})

export const LoginProvider = ({children}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <LoginContext.Provider
            value={
                {
                    open,
                    handleOpen
                }
            }
        >
            {children}
        </LoginContext.Provider>
    );
}