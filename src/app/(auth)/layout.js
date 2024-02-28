import React from 'react'

const AuthLayout = ({children}) => {
    return (
        <main className="w-full h-full flex flex-col items-center justify-center gap-8 bg-gray-100">
            <img src="/images/pclogo.png" className="w-[350px]" />
            <div className="max-w-[450px] w-full bg-white p-8 rounded-lg shadow-md">
                {children}
            </div>
        </main>
    )
}

export default AuthLayout
