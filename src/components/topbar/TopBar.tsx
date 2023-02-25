import { MegaMenu } from 'primereact/megamenu';
import './topbar.css';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';

function TopBar() {
	const auth = useAuth()
	
	const LogOut = async () => {
		console.log("LogOut")
		auth.logout()
	}

	let _user = localStorage.getItem('_user');

	const items = [
		{
			label: JSON.parse(_user!)?.name, icon: 'pi pi-user',
			items: [
				[
					{
						items: [
							{  
								label: 'LogOut',
								icon: 'pi pi-fw pi-power-off',
								command: () => {
									LogOut()
								}
							}
						]
					}
				]
			]
		}
	]

	return (
		<MegaMenu className="MenuBar" model={items} orientation="horizontal" />
	)
}
export default TopBar
