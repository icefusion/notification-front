import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from '../context/AuthProvider'
import routes from '../routes'

function AppContent() {
    return (
        <Routes>
            {routes.map((route, idx) => {
                return (
                    route.element && ( <Route key={idx} path={route.path} element={<RequireAuth> <route.element /> </RequireAuth>} /> )
                )
            })}
        </Routes>
    )
}

export default AppContent
