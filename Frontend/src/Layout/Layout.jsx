import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '@/Components/Footer'

function Layout() {
    const location = useLocation()

    // Dashboard routes mein footer nahi dikhana
    const isDashboard = location.pathname.startsWith('/dashboard')

    return (
        <>
            <Navbar />
            <main>
                <Outlet />   {/* child routes*/}
            </main>
            {!isDashboard && <Footer />}

        </>
    )
}

export default Layout