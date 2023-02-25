import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { AppContent, TopBar, SideBarMenu } from '../components'
import { useAuth } from '../context/AuthProvider/useAuth'
import Login from '../views/pages/Login'

function DefaultLayout() {
	const auth = useAuth()
	const userJson: any = localStorage.getItem('_user')
	
	const navigate = useNavigate();
	
	React.useEffect(() => {
		if (userJson === null) {
			navigate('/login');
		}
	},[]);

	return (    
		<>  
			{(!auth?.email || !userJson) ? 
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
				</Routes>
				: 
				<div className="flex theme_Text">
					<SideBarMenu />
					<div className="Principals w-full">
						<TopBar />
						<AppContent />
					</div>
				</div>
			}
		</>
	)
}

export default DefaultLayout
