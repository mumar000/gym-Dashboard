import React from 'react';
import Modal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

Modal.setAppElement("#root");

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "white",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const fields = [
  {
    name: "fees",
    label: "Fees",
    type: "number",
    rules: { required: "Fees is required" },
  },
  {
    name: "paymentDate",
    label: "Payment Date",
    type: "date",
    rules: { required: "Payment Date is required" },
  },
  {
    name: "month",
    label: "Month",
    type: "text",
    rules: { required: "Month is required" },
  },
];

const PaymentForm = ({ isOpen, onClose, customerData }) => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const onSubmit = async (record) => {
    try {
      const response = await axios.put(`https://gym-server-k1jq.vercel.app/updatePayment/${selectedCustomer._id}`, {
        month: record.month,
        amount: record.fees,
        paymentDate: record.paymentDate,
      });
      console.log("Payment Updated Successfully", response.data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error updating payment", error);
    }
  };

  const handleCustomerChange = (event) => {
    const selectedId = event.target.value;
    const customer = customerData.find(c => c._id === selectedId);
    setSelectedCustomer(customer);
    setValue("name", customer?.name || "");
    setValue("fatherName", customer?.fatherName || "");
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyle} contentLabel='Payment Form'>
      <div className="p-2">
      <div className='flex flex-row items-center  justify-between'>
        <h1 className="text-center text-4xl   from-green-400 to-green-700 font-bold mb-6">Payment Recipient</h1>
        <RxCrossCircled 
          className='mb-6 text-red-800 cursor-pointer ' 
          size={28}
          onClick={onClose}
        />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-bold text-gray-700">Name</label>
            <select 
              onChange={handleCustomerChange} 
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Customer</option>
              {customerData.map(customer => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-bold text-gray-700">Father's Name</label>
            <input
              type="text"
              value={selectedCustomer?.fatherName || ""}
              readOnly
              className="border border-gray-300 rounded-lg p-2 bg-gray-100"
            />
          </div>

          {fields.map((field) => (
            <div key={field.name} className="flex flex-col space-y-1">
              <label className="text-sm font-bold text-gray-700">{field.label}</label>
              <Controller
                name={field.name}
                control={control}
                defaultValue=""
                rules={field.rules}
                render={({ field: { onChange, value } }) => (
                  <input
                    type={field.type || "text"}
                    value={value}
                    onChange={onChange}
                    className={`border border-gray-300 rounded-lg p-2 ${
                      errors[field.name] ? 'border-red-500' : ''
                    }`}
                  />
                )}
              />
              {errors[field.name] && (
                <span className="text-red-500 text-sm">{errors[field.name].message}</span>
              )}
            </div>
          ))}

          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentForm;