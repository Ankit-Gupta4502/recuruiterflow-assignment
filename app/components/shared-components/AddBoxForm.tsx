import React, { useEffect, useRef } from 'react'
import Input from '../ui/Input'
import { z } from 'zod'
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import ShippingOrderServices from '~/services/ShippingOrderServices'

const schema = z.object({
    name: z.string().trim().min(1, "Receiver's Name is required"),
    weight: z.coerce.number().gt(0, "Number should be bigger than 0"),
    color: z.string().trim().min(1, "Receiver's Name is required").default("#F2F2F2")
})

type formSchema = z.infer<typeof schema>


const AddBoxForm = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(schema)
    })
    const { current: { getShippingOrders } } = useRef(ShippingOrderServices)
   
    const onSubmit: SubmitHandler<formSchema> = (data) => {
        
    }
    useEffect(()=>{
        getShippingOrders()
        .then(res=>{
            console.log(res,"ress")
        })
    },[])
    return (
        <div className='  w-full max-w-lg bg-white mx-auto  border-gray-100 rounded-md px-4 py-4  border shadow-lg ' >
            <h4 className=' text-xl font-semibold ' >Add New Shipping Box</h4>
            <form onSubmit={handleSubmit(onSubmit)} className=' mt-4 space-y-4' >
                <Input isError={!!errors.name} errorMessage={errors?.name?.message} inputProps={{
                    placeholder: "Enter receiver's name",
                    ...register("name")
                }} label="Receiver's Name *" />

                <Input isError={!!errors.weight} errorMessage={errors?.weight?.message} inputProps={{
                    placeholder: "Enter weight in KG",
                    type:"number",
                    ...register("weight")
                }} label="Weight" />


                <Input inputProps={{
                    placeholder: "Enter weight in KG",
                    type: "color",
                    className: "max-w-[100px] ",
                    ...register("color")
                }} label="Box Color" />

                <div>
                    <label htmlFor="" className='block mb-2 text-gray-700  font-medium ' >Destination Country</label>
                    <select name="" id="" className='border border-gray-300 px-2 rounded-sm py-2 w-full' >
                        <option value="">Select Country</option>
                    </select>
                </div>


                <button className='bg-blue-950 w-full text-sm text-white rounded-md px-4 py-2'>Submit </button>
            </form>
        </div>
    )
}

export default AddBoxForm