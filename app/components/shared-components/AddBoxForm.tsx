import React, { useRef, useState } from "react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ShippingOrderServices from "~/services/ShippingOrderServices";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Receiver's Name is required"),
  weight: z.coerce.number().gt(0, "Number should be bigger than 0").default(0),
  color: z
    .string()
    .trim()
    .default("#F2F2F2"),
  destination: z.string().trim().min(1, "Destination country is required"),
});

type formSchema = z.infer<typeof schema>;

const currencies: Record<string, number> = {
  Sweden: 7.35,
  China: 11.53,
  Brazil: 15.63,
  Australia: 50.09,
};

const AddBoxForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const {
    current: { addShippingOrder },
  } = useRef(ShippingOrderServices);
  const destinationCountry = watch("destination");
  const [isPending, setIsPending] = useState(false);
  const weight = watch("weight") as number;


  const estiMatedPrice = (currencies[destinationCountry] || 0) * weight;

  const onSubmit: SubmitHandler<formSchema> = async (params) => {
    setIsPending(true);
    const { data, error } = await addShippingOrder({
      receiver: params.name,
      weight_kg: params.weight,
      color: params.color,
      country: params.destination,
      shipping_cost: estiMatedPrice,
    });
    if (error) {
      console.error("something went wrong", error);
      toast.error("Oops! Something went wrong");
    } else {
      toast.success("Shipping Box Added Successfully");
      reset();
    }
    setIsPending(false);
  };

  return (
    <div className="  w-full max-w-lg bg-white mx-auto  border-gray-100 rounded-md px-4 py-4  border shadow-lg ">
      <h4 className=" text-xl font-semibold ">Add New Shipping Box</h4>
      <form onSubmit={handleSubmit(onSubmit)} className=" mt-4 space-y-4">
        <Input
          isError={!!errors.name}
          errorMessage={errors?.name?.message}
          inputProps={{
            placeholder: "Enter receiver's name ",
            ...register("name"),
          }}
          label="Receiver's Name *"
        />

        <Input
          isError={!!errors.weight}
          errorMessage={errors?.weight?.message}
          inputProps={{
            placeholder: "Enter weight in KG",
            type: "number",
            defaultValue: 0,
            min: 0,
            ...register("weight"),
          }}
          label="Weight"
        />

        <Input
          inputProps={{
            placeholder: "Enter weight in KG",
            type: "color",
            defaultValue: "#F2F2F2",
            className: "max-w-[50px]  py-0 px-0 border-0 [block-size:32px]",
            ...register("color"),
          }}
          label="Choose Box Color *"
        />

        <Select
          label="Destination Country *"
          isError={!!errors.destination}
          errorMessage={errors.destination?.message}
          selectProps={{
            ...register("destination"),
          }}
        >
          <option value="">Select Country</option>
          <option value="Sweden">Sweden (7.35 INR)</option>
          <option value="China">China (11.53 INR)</option>
          <option value="Brazil">Brazil (15.63 INR)</option>
          <option value="Australia">Australia (50.09 INR)</option>
        </Select>

        {!!estiMatedPrice && (
          <div className=" bg-gray-50 px-4 py-1.5 rounded-md">
            <p className=" text-sm font-medium text-gray-700 ">
              Estimated Price
            </p>
            <p className=" text-xl font-semibold text-gray-900 ">
              {estiMatedPrice.toFixed(2)} INR
            </p>
          </div>
        )}

        <button
          disabled={isPending}
          className="bg-blue-950 cursor-pointer w-full text-sm text-white rounded-md px-4 py-2"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddBoxForm;
