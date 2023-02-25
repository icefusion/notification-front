import Dashboard from './views/dashboard/Dashboard';
import MessageHistory from './views/history/MessageHistory';
import MessageSend from './views/messageSend/MessageSend';

const routes = [
  { path: '/admin/message/send', element: MessageSend },
  { path: '/admin/message/history', element: MessageHistory },
  { path: '/admin/dashboard',  element: Dashboard },
]

export default routes
