import React from 'react'
import { useSelector } from 'react-redux'

function ThemeProvider({ children }) {
    const { theme } = useSelector(state => state.theme)
    return (
        <div className={theme}>
            <div className='bg-background text-foreground'>
                {children}
            </div>
        </div>
    )
}

export default ThemeProvider