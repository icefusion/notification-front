import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineClipboardList, HiOutlineUserGroup } from 'react-icons/hi';
import LoadingElement from '../../components/common/LoadingElement';
import { getMessageList } from '../../services/messageService';
import ListMessages from '../../components/listTables/ListMessages';

function MessageHistory() {
	const toast = useRef<Toast>(null)
	const [listMessages, setListMessages] = useState<any>([])
  const [load, setLoad] = useState(false)

	const getMessages = async () => {
    try {
      let list = await getMessageList()
      setListMessages(list);
    } catch (error) { }
  }

  useEffect(() => {
    setLoad(true)
    getMessages()
    setLoad(false)
  }, []);

  const renderHeaderTable = () => {
    return (
      <div className="flex justify-content-between" />
    )
  }

  if (load) {
    return(<LoadingElement />)
  } 

  return (
    <div className="dashboard p-5 flex flex-column flex-auto clientsPage">
      <Toast ref={toast} />
      <div className="flex">
        <HiOutlineClipboardList size={27} className="mr-1 mt-3" style={{top: '4px', position: 'relative'}} />
        <h2 className=""> Messages History </h2>
      </div>
      
      <ListMessages
        list={listMessages} 
        headerTable={renderHeaderTable}
      />

    </div>
  )
}

export default MessageHistory
