import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";


export default function DetailForm() {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data) => {
    const API_URI = 'https://gym-server-k1jq.vercel.app/customerData'
    try {
      await axios.post(API_URI, data, {
        headers: { "Content-Type": "application/json" },
      });
      reset();
      setApiError(null);
      toast.success("Customer data saved successfully!");
    } catch (error) {
      console.error("Data is not created", error);
      setApiError("Failed to create customer. Please try again.");
      toast.error("Failed to save customer data.");
    }
  };

  const renderInput = (name, label, rules, type = "text", placeholder = "") => (
    <div>
      <label className="block text-md  font-medium text-black mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            placeholder={placeholder}
          />
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>
      )}
    </div>
  );

  const renderRadio = (name, label, options) => (
    <div className="col-span-full">
      <label className="block text-md font-medium text-black mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: `${label} is required` }}
        render={({ field }) => (
          <div className="flex items-center space-x-4">
            {options.map((option) => (
              <label key={option} className="flex items-center text-gray-700 text-md font-medium">
                <input
                  type="radio"
                  value={option}
                  checked={field.value === option}
                  onChange={() => field.onChange(option)}
                  className="mr-2 h-4 w-4 text-green-500 rounded focus:ring-green-500" 
                />
                {option}
              </label>
            ))}
          </div>
        )}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1">{errors[name].message}</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen  bg-gray-50 py-8" style={{ 
      backgroundImage: "url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Toaster />
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-row items-center justify-between gap-2 mb-8">
          <h1 className="text-center text-3xl font-bold text-white">Add Customer</h1>
          <Link to='/details'>
          <button className="px-4 py-1 cursor-pointer hover:scale-110 transition-all ease-in-out duration-300 active:scale-95 flex flex-row items-center gap-1 text-white  rounded-full bg-gradient-to-r from-green-500 to-green-900  ">
            <IoChevronBack />
             Back to Data
            </button>
            </Link>
        </div>

        {apiError && <div className="text-red-500 text-center mb-6">{apiError}</div>}

        <form className="bg-white border-green-500 border-1  p-8 rounded-xl  shadow-lg  " onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("name", "Name", { required: "Name is required" }, "text", "Enter your name")}
            {renderInput("fatherName", "Father Name", { required: "Father Name is required" }, "text", "Enter your father's name")}
            {renderInput("contact", "Contact", { required: "Contact is required", pattern: { value: /^[0-9]{11}$/, message: "Contact number must be 11 digits" } }, "number", "Enter your contact number")}
            {renderInput("address", "Address", { required: "Address is required" }, "text", "Enter your address")}
            {renderInput("date", "Date", { required: "Date is required" }, "date")}
            {renderInput("admissionFee", "Admission Fee", { required: "Admission Fee is required", min: { value: 0, message: "Admission Fee must be greater than 0" } }, "number", "Enter admission fee")}
            {renderInput("monthlyFee", "Monthly Fee", { required: "Monthly Fee is required", min: { value: 0, message: "Monthly Fee must be greater than 0" } }, "number", "Enter monthly fee")}
            {renderInput("locker", "Locker", { min: { value: 0, message: "Locker must be a positive number" } }, "number", "Enter Locker")}
            {renderInput("weight", "Weight", { min: { value: 0, message: "Weight must be a positive number" } }, "number", "Enter Weight")}
            {renderRadio("paymentStatus", "Payment Status", ["paid", "unpaid", "pending"])}
          </div>

          <div className="flex gap-4 mt-8">
            <button type="submit" className="w-full bg-green-800 text-white py-3 rounded-full  hover:bg-green-700  transition duration-200">
              Save Customer Detail
            </button>
            <button type="button" onClick={() => reset()} className="w-full bg-gray-200 text-gray-700 py-3 rounded-full hover:bg-gray-300 transition duration-200">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}