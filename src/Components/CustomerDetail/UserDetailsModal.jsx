import React from "react";
import Modal from "react-modal";
import { TbHistory, TbCurrencyRupee, TbCalendar, TbCheck, TbX, TbCurrencyDollar } from "react-icons/tb";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "50px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "90%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex flex-row gap-2 items-center justify-center mb-6">
            <h2 className="text-4xl font-bold text-center tracking-tighter">Payment History</h2>
            <TbHistory size={30} />
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="flex items-center gap-2">
                <TbCalendar className="text-gray-600" />
                <strong className="text-gray-600">Date of Admission:</strong> {formatDate(user.createdAt)}
              </p>
              <p className="flex items-center gap-2">
                <TbCurrencyRupee className="text-gray-600" />
                <strong className="text-gray-600">Fees:</strong> Rs.{user.monthlyFee}
              </p>
              <p className="flex items-center gap-2">
                <TbCalendar className="text-gray-600" />
                <strong className="text-gray-600">Last Payment Date:</strong> {formatDate(user.lastPaymentDate)}
              </p>
            </div>

            {/* Payment History */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                {/* <TbHistory className="text-gray-600" /> */}
                Monthly Payment Status
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {user.paymentHistory.map((payment, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex flex-col justify-between items-center">
                      <div>
                        <p className="flex items-center gap-2">
                          <TbCalendar className="text-gray-600" />
                          <strong className="text-gray-600">Month:</strong> {payment.month}
                        </p>
                        <p className="flex items-center gap-2">
                          <TbCurrencyDollar className="text-gray-600" />
                          <strong className="text-gray-600">Amount:</strong> Rs.{payment.amount}
                        </p>
                        <p className="flex items-center gap-2">
                          <TbCalendar className="text-gray-600" />
                          <strong className="text-gray-600">Date:</strong> {formatDate(payment.paymentDate)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        Status:
                        {user.paymentStatus === "paid" ? (
                          <TbCheck className="text-green-500" size={20} />
                        ) : (
                          <TbX className="text-red-500" size={20} />
                        )}
                        <span className={`text-sm font-semibold ${user.paymentStatus === "paid" ? "text-green-500 capitalize" : "text-red-500"}`}>
                          {user.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 self-center"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default UserDetailsModal;