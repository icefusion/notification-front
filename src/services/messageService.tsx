import api from './api'

const getMessageList = async () => {
    let _user = localStorage.getItem('_user');
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(_user!).token}`;
	
    const response = await api.get('/messages');
	
    return response.data
}

const getLastMessagesList = async () => {
    let _user = localStorage.getItem('_user');
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(_user!).token}`;
    
    const response = await api.get('/messages')
	
    return response.data
}

const postSendMessage = async (data: any) => {
    let _user = localStorage.getItem('_user');
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(_user!).token}`;
    
    const response = await api.post('/messages', data);
	
    return response.data;
}

export {
	getMessageList,
    getLastMessagesList,
    postSendMessage
}