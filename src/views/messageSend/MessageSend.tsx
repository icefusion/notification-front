import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postSendMessage } from '../../services/messageService';

function MessageSend() {
	const toast = useRef<Toast>(null);

  const schema = yup
    .object({
      subject: yup.string().required('Subject is required!'),
      message: yup.string().required('Message is required!')
    })
    .required()

  const {
    register,
    control,
    handleSubmit,
    resetField,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: '',
      message: ''
    },
    resolver: yupResolver(schema),
  });
  
  const errorSubject = () =>  errors.subject?.message;
  const errorMessage = () => errors.message?.message;

  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
      { name: 'sport', code: 'sport' },
      { name: 'finance', code: 'finance' },
      { name: 'movies', code: 'movies' }
  ];

  const cancelSidebar = () => {
    reset();
  }

  const showSuccess = (message: string) => {
    if (message) {
      toast?.current?.show({severity:'success', summary: 'Success!', detail: message, life: 3000});
    }
  }

  const showError = (message: string) => {
      toast?.current?.show({severity:'error', summary: 'Error!', detail: message, life: 3000});
  }

  const sendForm = handleSubmit(async (data) => {   
    try {
      if (!selectedCategories || selectedCategories.length === 0) {
        showError("Categories not selected.");
      }

      const categories = selectedCategories.map((item: { code: string, name: string }) => {
        return item.code;
      });

      const payload = {
        subject: data.subject,
        message: data.message,
        categories: categories
      }

      const result = await postSendMessage(payload);
      
      if (result) {
        showSuccess("Message sended");
        reset();
        setSelectedCategories([]);
      }  else {
        showError("Send message fail.");
      }
    } catch (error: any) {
      showError("Send message fail.");
    }
  });

  return (
    <div className="dashboard p-5 flex flex-column flex-auto clientsPage">
      <div className="flex">
        <HiOutlineChatAlt2 size={27} className="mr-1 mt-3" style={{top: '4px', position: 'relative'}} />
        <h2 className=""> Messages Send </h2>
      </div>
      
      <Card className="w-full capitalize">
        <form>
          <div className="controlledInputs">
            <div className="field">
              <label htmlFor="nome_produto" className="block">Subject</label>
              <Controller
                name="subject" control={control} rules={{ required: true, }}
                render={({ field }) => 
                <InputText {...field} id="nome_produto" type="text" className="block mb-3 w-full" /> }
              />
              <div className="mt-1 text-xs text-red-200"> { errors.subject?.message !== undefined ? <> {errorSubject()} </> : "" } </div>
            </div>

            <div>
              <div className="field">
                <label htmlFor="username1" className="block">Message</label>
                <Controller
                  name="message" control={control}
                  render={({ field }) => 
                    <InputTextarea {...field} id="username1" rows={10} 
                    cols={30} className="w-full" 
                    autoResize /> } 
                />
                <div className="mt-1 text-xs text-red-200"> { errors.message?.message !== undefined ? <> {errorMessage()} </> : "" } </div>
              </div>
            </div>
            <div>
              <div className="field">
                <label htmlFor="username1" className="block">Categories</label>
                <ListBox 
                  value={selectedCategories} 
                  onChange={(e) => setSelectedCategories(e.value) } 
                  options={categories} 
                  optionLabel="name" 
                  className="w-full md:w-14rem"
                  multiple /> 
          
                <div className="mt-1 text-xs text-red-200"> { (selectedCategories === null || selectedCategories.length <= 0) ? "Category is required." : ""  } </div>
              </div>
            </div>
          
            <div className="grid mt-3">
                <div className="col">
                    <Button type="button" label="Cancelar" 
                      icon="pi pi-arrow-left"
                      className="p-button-outlined p-button-danger w-full" 
                      onClick={() => cancelSidebar()}
                    />
                </div>
                <div className="col">
                    <Button label="Send" className="w-full"
                      icon="pi pi-save" iconPos="right" 
                      type="button" onClick={() => sendForm()}
                    />
                </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default MessageSend
