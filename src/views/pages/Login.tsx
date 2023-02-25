import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './login.css'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthProvider/useAuth';
import { Toast } from 'primereact/toast';
import LoadingElemento from '../../components/common/LoadingElement';

function Login() {
    const toast = useRef<Toast>(null);
    const [loadRequest, setLoadRequest] = useState(false)
    
    const showError = (message: string) => {
        toast?.current?.show({severity:'error', summary: 'Error Message', detail: message, life: 3000});
    }

    const auth = useAuth()
    const navigate = useNavigate();

    const schema = yup.object({
        email: yup.string().required('Email is mandatory').email('use a valid email'),
        password: yup.string().required('Password is mandatory'),
    })
    .required()

    useEffect(()=>{
    }, [toast])

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
            defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data: any) => {
        setLoadRequest(true)
        const returnData = await auth.Login(data.email, data.password)       
        console.log('returnData===>', returnData) 
        if (returnData?.request.status === 400) {
            showError("Login fail. Verify your credentials and try again.")    
        } else if (returnData.response?.status > 400) {
            console.log(returnData.response.statusText)
            showError(returnData.response.statusText)
        } else {
            setLoadRequest(false)
            navigate("/admin/dashboard");
        }
    }

    if (loadRequest){
        return(<LoadingElemento />)
    }


    return (
        <div className="flex flex-column justify-content-center align-items-center w-full min-h-full">
            <Toast ref={toast} />
            <Card title="Login" subTitle="Administrator Login"  className="loginContent" style={{ width: '25rem', marginBottom: '2em' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username1" className="block">Email</label>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field }) => 
                            <InputText {...field} id="username1" aria-describedby="username1-help" 
                                className="p-inputtext-lg block w-full mb-2"/>}
                    />
                    {errors.email ? (
                        <div style={{ marginTop: '5px', fontSize: '12px', color: '#ff4d4f' }}>
                            {errors.email.message}
                        </div>
                    ) : null}

                    <label htmlFor="password1" className="block">Password</label>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <Password className=""  {...field} id="password1" feedback={false} />}
                    />
                    
                    {errors.password ? (
                        <div style={{ marginTop: '5px', fontSize: '12px', color: '#ff4d4f' }}>
                            {errors.password.message}
                        </div>
                    ) : null}
                    <Button label="Login" type="submit" className="block w-full" onClick={() => console.log('Sending login')} />
                </form>
            </Card>
        </div>
    )
}

export default Login
