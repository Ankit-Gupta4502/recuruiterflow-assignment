import React, { useRef } from 'react'
import Input from '../ui/Input'
import { z } from 'zod'
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import ShippingOrderServices from '~/services/ShippingOrderServices'
import { classNameMerger } from '~/utils'

const schema = z.object({
    name: z.string().trim().min(1, "Receiver's Name is required"),
    weight: z.coerce.number().gt(0, "Number should be bigger than 0").default(0),
    color: z.string().trim().min(1, "Receiver's Name is required").default("#F2F2F2"),
    destination: z.string().trim().min(1, "Destination country is required")
})

type formSchema = z.infer<typeof schema>


const AddBoxForm = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(schema)
    })
    const { current: { addShippingOrder } } = useRef(ShippingOrderServices)

    const onSubmit: SubmitHandler<formSchema> = (data) => {

    }

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
                    type: "number",
                    defaultValue: 0,
                    ...register("weight")
                }} label="Weight" />


                <Input inputProps={{
                    placeholder: "Enter weight in KG",
                    type: "color",
                    defaultValue:"#F2F2F2",
                    className: "max-w-[50px]  py-0 px-0 border-0 [block-size:32px]",
                    ...register("color")
                }} label="Choose Box Color" />

                <div>
                    <label htmlFor="" className='block mb-2 text-gray-700  font-medium ' >Destination Country</label>
                    <select {...register("destination")} name="" id="" className={classNameMerger('border  px-2 rounded-sm py-2 w-full', errors.destination ? "border-red-600 focus:outline-red-600" : "border-gray-300")} >
                        <option value="">Select Country</option>
                    </select>
                    {errors.destination && <span className=" text-red-600 text-sm placeholder:text-red-600  " >
                        {errors.destination?.message}
                    </span>}
                </div>


                <button className='bg-blue-950 w-full text-sm text-white rounded-md px-4 py-2'>Submit </button>
            </form>
        </div>
    )
}

export default AddBoxForm