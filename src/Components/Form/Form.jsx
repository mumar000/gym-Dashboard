import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoPersonAddSharp } from "react-icons/io5";

export default function DetailForm() {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data) => {
    const API_URI = "https://gym-ms-backend-five.vercel.app/customerData";

    try {
      const response = await axios.post(API_URI, data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Customer Data created", response.data);
      reset(); // Reset the form fields after successful submission
      setApiError(null); // Clear any previous errors
      toast.success("Customer data saved successfully!"); // Show success toast
    } catch (error) {
      console.error("Data is not created", error);
      setApiError("Failed to create customer. Please try again."); // Set error message
      toast.error("Failed to save customer data."); // Show error toast
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8" 
      style={{ 
        backgroundImage:"url('https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize:'cover',
        backgroundPosition:'center'
    }}>
      <div><Toaster /></div>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-row items-center justify-center gap-2 mb-8">
          <h1 className="text-center text-3xl font-bold text-white">Add Customer</h1>
          <IoPersonAddSharp size={24} className="text-blue-600" />
        </div>

        {apiError && (
          <div className="text-red-500 text-center mb-6">
            {apiError}
          </div>
        )}

        <form
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="name"
                    aria-describedby="name-error"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                )}
              />
              {errors.name && (
                <span id="name-error" className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Father Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Father Name <span className="text-red-500">*</span>
              </label>
              <Controller
                name="fatherName"
                control={control}
                defaultValue=""
                rules={{ required: "Father Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="fatherName"
                    aria-describedby="fatherName-error"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your father's name"
                  />
                )}
              />
              {errors.fatherName && (
                <span id="fatherName-error" className="text-red-500 text-sm mt-1">
                  {errors.fatherName.message}
                </span>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact <span className="text-red-500">*</span>
              </label>
              <Controller
                name="contact"
                control={control}
                defaultValue=""
                rules={{
                  required: "Contact is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Contact number must be 11 digits",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="contact"
                    aria-describedby="contact-error"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your contact number"
                  />
                )}
              />
              {errors.contact && (
                <span id="contact-error" className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </span>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="address"
                    aria-describedby="address-error"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your address"
                  />
                )}
              />
              {errors.address && (
                <span id="address-error" className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <Controller
                name="date"
                control={control}
                defaultValue=""
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    id="date"
                    aria-describedby="date-error"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                )}
              />
              {errors.date && (
                <span id="date-error" className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </span>
              )}
            </div>

            {/* Admission Fee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admission Fee <span className="text-red-500">*</span>
              </label>
              <Controller
                name="admissionFee"
                control={control}
                defaultValue=""
                rules={{
                  required: "Admission Fee is required",
                  min: { value: 0, message: "Admission Fee must be greater than 0" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="admissionFee"
                    aria-describedby="admissionFee-error"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter admission fee"
                  />
                )}
              />
              {errors.admissionFee && (
                <span id="admissionFee-error" className="text-red-500 text-sm mt-1">
                  {errors.admissionFee.message}
                </span>
              )}
            </div>

            {/* Monthly Fee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Fee <span className="text-red-500">*</span>
              </label>
              <Controller
                name="monthlyFee"
                control={control}
                defaultValue=""
                rules={{
                  required: "Monthly Fee is required",
                  min: { value: 0, message: "Monthly Fee must be greater than 0" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="monthlyFee"
                    aria-describedby="monthlyFee-error"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter monthly fee"
                  />
                )}
              />
              {errors.monthlyFee && (
                <span id="monthlyFee-error" className="text-red-500 text-sm mt-1">
                  {errors.monthlyFee.message}
                </span>
              )}
            </div>

            {/* Locker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Locker
              </label>
              <Controller
                name="locker"
                control={control}
                defaultValue=""
                rules={{
                  min: { value: 0, message: "Locker must be a positive number" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="locker"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter Locker"
                  />
                )}
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight
              </label>
              <Controller
                name="weight"
                control={control}
                defaultValue=""
                rules={{
                  min: { value: 0, message: "Weight must be a positive number" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="weight"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter Weight"
                  />
                )}
              />
            </div>

            {/* Payment Status */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status <span className="text-red-500">*</span>
              </label>
              <Controller
                name="paymentStatus"
                control={control}
                defaultValue=""
                rules={{ required: "Payment Status is required" }}
                render={({ field }) => (
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center text-gray-700 text-sm font-medium">
                      <input
                        type="radio"
                        value="paid"
                        checked={field.value === "paid"}
                        onChange={() => field.onChange("paid")}
                        className="mr-2 h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                      Paid
                    </label>
                    <label className="flex items-center text-gray-700 text-sm font-medium">
                      <input
                        type="radio"
                        value="unpaid"
                        checked={field.value === "unpaid"}
                        onChange={() => field.onChange("unpaid")}
                        className="mr-2 h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                      Unpaid
                    </label>
                    <label className="flex items-center text-gray-700 text-sm font-medium">
                      <input
                        type="radio"
                        value="pending"
                        checked={field.value === "pending"}
                        onChange={() => field.onChange("pending")}
                        className="mr-2 h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                      />
                      Pending
                    </label>
                  </div>
                )}
              />
              {errors.paymentStatus && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.paymentStatus.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Save Customer Detail
            </button>
            <button
              type="button"
              onClick={() => reset({
                name: "",
                fatherName: "",
                contact: "",
                address: "",
                admissionFee: "",
                monthlyFee: "",
                locker: "",
                weight: "",
                paymentStatus: "",
              })}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}