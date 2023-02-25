import { Card } from 'primereact/card';
import React from 'react'

type paramType = {
    textShow: string,
    quantity: number,
    countNew: number,
    pi_cart_property: string,
    iconBackground: string
}

function DashCard({textShow, quantity, countNew, pi_cart_property, iconBackground }: paramType) {
  return (
    <Card className="flex-auto w-full">
        <div className="flex justify-content-between mb-3">
            <div>
                <span className="block text-500 font-medium mb-3">{textShow}</span>
                <div className="text-900 font-medium text-xl">{quantity}</div>
            </div>
            <div className={`flex align-items-center ${iconBackground} justify-content-center border-round`} style={{width: '2.5rem', height: '2.5rem'}}>
                <i className={`pi ${pi_cart_property} text-xl`}></i>
            </div>
        </div>

    </Card>
  )
}

export default DashCard
