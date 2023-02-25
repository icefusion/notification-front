import axios from 'axios'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import ListTable from '../../components/common/ListTable'
import DashCard from './DashCard'
import { getMessageList } from '../../services/messageService';
import LoadingElement from '../../components/common/LoadingElement';

function Dashboard() {
  const [messageCount, setMessageCount] = useState(0);
  const [listMessages, setListMessages] = useState([]);
  const [loadRequest, setLoadRequest] = useState(false);
  const [globalFilterValue1, setGlobalFilterValue1] = useState('');

  const getMessageCount = async () => {
    try {
      let messages = await getMessageList();

      setListMessages(messages);

      setMessageCount(messages.length);
    } catch (error) { }
  }

  useEffect(() => {
      getMessageCount()
      setLoadRequest(false)
  }, [])
  
  const renderHeaderTable = () => {
    return (
        <div className="flex justify-content-between">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
            </span>
        </div>
    )
  }

  if (loadRequest) {
    return(<LoadingElement />)
  }

  return (
    <div className="dashboard p-5 flex flex-column flex-auto">
      <div className="grid">
        <div className="col-12 lg:col-6 xl:col-3">
          <DashCard textShow={'Messages'} iconBackground={"bg-blue-100"} 
            pi_cart_property="pi-envelope text-blue-500" 
            quantity={messageCount} 
            countNew={62} 
          />
        </div>
      </div>

      <div className="mt-3">
        <div className="flex">
          <HiOutlineShoppingCart size={27} className="mr-1 mt-3" style={{top: '4px', position: 'relative'}} />
          <h2>Last Messages</h2>
        </div>
        <ListTable list={listMessages} headerTable={renderHeaderTable}/>
      </div>
    </div>
  )
}

export default Dashboard
