import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable, useSortBy, usePagination } from "react-table";
import { IoPersonSharp } from "react-icons/io5";
import { GoTrash, GoCheck, GoEye } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";
import UserDetailsModal from './UserDetailsModal'
import PaymentForm from "./PaymentForm";
import { MdOutlinePayments } from "react-icons/md";

import Modal from "react-modal";


const CustomerDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
  const [addPayment, setaddPayment] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://gym-msserver.vercel.app/customerData");
        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          setError("Data format is invalid. Expected an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  // Mark as paid function
  const markAsPaid = async (id) => {
    try {
      await axios.put(`https://gym-msserver.vercel.app/customerData/${id}`, { paymentStatus: "paid" });
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, paymentStatus: "paid" } : item
        )
      );
      toast.success("Payment updated to Paid!");
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status.");
    }
  };

  // Delete customer data function
  const deleteData = async (id) => {
    try {
      await axios.delete(`https://gym-msserver.vercel.app/customerData/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      toast.success("Customer Deleted!");
    } catch (error) {
      console.error("Error deleting customer data:", error);
      toast.error("Failed to delete the customer data. Please try again.");
    }
  };

  const openPaymentModal = (user) => {
    setaddPayment(true);
  }

  const closePaymentModal = () => {
    setaddPayment(false);
    setSelectedUser(null)
  }

  // Open user details modal
  const openUserDetailsModal = (user) => {
    setSelectedUser(user);
    setIsUserDetailsModalOpen(true);
  };


  // Close user details modal
  const closeUserDetailsModal = () => {
    setIsUserDetailsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSubmit = (data) => {
    const API_URI = ''
  }

  // Define columns for the table
  const columns = useMemo(
    () => [
      { Header: "Date", accessor: "date", Cell: ({ value }) => formatDate(value) },
      { Header: "Name", accessor: "name", Cell: ({ value }) => value.toLowerCase() },
      { Header: "Father's Name", accessor: "fatherName" },
      { Header: "Address", accessor: "address", Cell: ({ value }) => <span className="text-sm tracking-tight">{value}</span> },
      { Header: "Monthly Fee", accessor: "monthlyFee", Cell: ({ value }) => `Rs. ${value}` },
      { Header: "Admission Fee", accessor: "admissionFee", Cell: ({ value }) => `Rs. ${value}` },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        Cell: ({ value }) => (
          <span
            className={`px-4 py-1 rounded-md border-1 text-sm font-light ${value === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ row }) => {
          const status = row.original.paymentStatus;
          return (
            <div className="flex flex-row ">
              <button
                onClick={() => deleteData(row.original._id)}
                className="text-red-900 px-1 py-1 hover:text-red-500 cursor-pointer"
              >
                <GoTrash />
              </button>
              {(status === "pending" || status === "unpaid") && (
                <button
                  onClick={() => markAsPaid(row.original._id)}
                  className="px-1 py-1 flex items-center gap-1 border-green-500 rounded-md hover:bg-green-500 transition duration-200"
                >
                  <GoCheck size={14} />
                </button>
              )}
              <button
                onClick={() => openUserDetailsModal(row.original)}
                className="px-2 py-1 flex items-center gap-1 text-gray-500  border-cyan-500 hover:text-cyan-600 transition duration-200"
              >
                <GoEye size={18} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  // Use the useTable hook to create a table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
  } = useTable({ columns, data }, useSortBy, usePagination);

  // Loading state
  if (loading) return <div className="flex justify-center text-lg text-gray-700 items-center h-full py-6">Loading...</div>;

  // Error state
  if (error) return <div className="text-red-600 text-center py-6 text-lg font-medium">{error}</div>;

  // No data state
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        <div className="text-lg font-medium">No customer data available.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Toaster />
      <div className="flex flex-row items-center justify-between">
        <button
          className="text-sm rounded-full  font-bold bg-gray-800 text-white px-3 py-2 mb-3 flex flex-row items-center gap-1"
          onClick={() => openPaymentModal()}
        >
          Add Payment
          <MdOutlinePayments />
        </button>
        <div className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          <div className="flex flex-row items-center gap-2 justify-center">
            Customer Data
            <IoPersonSharp className="my-1" />
          </div>
        </div>
        <div className="text-sm rounded-full  font-bold bg-gray-800 text-white px-3 py-2 mb-3 flex flex-row items-center gap-1">
          <h1>Add Customer</h1>
          <MdOutlinePayments />
        </div>
      </div>

      {/* Displaying customer data as a table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <table {...getTableProps()} className="min-w-full">
          <thead className="bg-gray-800 text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-3 px-5 text-center font-semibold"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={`${row.index % 2 === 0 ? "bg-white" : "bg-white"} hover:bg-gray-50 transition-all duration-200`}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="py-4 px-5 border-b text-center capitalize border-gray-200"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-row gap-2 my-2 items-center justify-center">
        <button
          className="border px-2 rounded-lg hover:scale-105 cursor-pointer bg-gray-800 text-white"
          disabled={!canPreviousPage}
          onClick={previousPage}
        >
          Prev Page
        </button>
        <span>
          {pageIndex + 1} of {pageCount}
        </span>
        <button
          className="border px-2 hover:scale-105 cursor-pointer rounded-lg bg-gray-800 text-white"
          disabled={!canNextPage}
          onClick={nextPage}
        >
          Next Page
        </button>
      </div>

      <UserDetailsModal
        isOpen={isUserDetailsModalOpen}
        onClose={closeUserDetailsModal}
        user={selectedUser}
      />
      <PaymentForm
        isOpen={addPayment}
        onClose={closePaymentModal}
        customerData={data}
      />
    </div>
  );
};

export default CustomerDetails;