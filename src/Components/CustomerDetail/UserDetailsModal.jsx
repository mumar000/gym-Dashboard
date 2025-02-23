import React from "react";
import Modal from "react-modal";
import { TbHistory, TbCurrencyRupee, TbCalendar, TbCheck, TbX, TbCurrencyDollar } from "react-icons/tb";
import { GoPersonFill } from "react-icons/go";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    width: "90%", // Responsive width
    maxWidth: "600px", // Max width for larger screens
    backgroundColor: "white",
    zIndex: "20",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(4px)", // Modern blur effect
  },
};

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} contentLabel="User Details">
      {user && (
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex flex-row gap-2 items-center justify-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent">
              Payment History
            </h2>
            <TbHistory size={30} className="text-black" />
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="flex items-center gap-2 text-gray-700">
                <GoPersonFill className="text-gray-500" />
                <strong>User:</strong> {user.name}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <TbCalendar className="text-gray-500" />
                <strong>Date of Admission:</strong> {formatDate(user.date)}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <TbCurrencyRupee className="text-gray-500" />
                <strong>Fees:</strong> Rs.{user.monthlyFee}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <TbCalendar className="text-gray-500" />
                <strong>Last Payment Date:</strong> {formatDate(user.lastPaymentDate)}
              </p>
            </div>

            {/* Payment History */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                Monthly Payment Status
              </h3>
              <div className="max-h-[200px] overflow-y-auto"> {/* Scrollable container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {user.paymentHistory.map((payment, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex flex-col space-y-1">
                      <p className="flex items-center gap-2 text-gray-700">
                          <strong>Month:</strong>{payment.month}
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                          <strong>Amount:</strong> Rs.{payment.amount}
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                          <strong>Date:</strong> {formatDate(payment.paymentDate)}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          Status:
                          {user.paymentStatus === "paid" ? (
                            <TbCheck className="text-green-500" size={20} />
                          ) : (
                            <TbX className="text-red-500" size={20} />
                          )}
                          <span className={`capitalize ${user.paymentStatus === "paid" ? "text-green-500" : "text-red-500"}`}>
                            {user.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-green-600 to-green-900 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200 self-center"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default UserDetailsModal;