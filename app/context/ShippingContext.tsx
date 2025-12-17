import React, { createContext } from "react"


const Context = createContext({})


const ShippingContext = ({ children }: { children: React.ReactNode }) => {
    return <Context.Provider value={{}}>
        {children}
    </Context.Provider>
}

export default ShippingContext