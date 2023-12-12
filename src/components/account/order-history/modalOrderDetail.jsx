import React from 'react';
import Modal from 'react-modal';

const OrderDetailModal = ({ isOpen, onClose, order, orderStatus }) => {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const totalAmount = order.price + order.shipping_price

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Order Detail Modal"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white border rounded-md shadow-md p-4 w-full sm:w-96">
        <h2 className="text-xl font-bold mb-2">Order Detail</h2>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500">Order ID: {order.id}</p>
          <p className="text-sm text-gray-500">Date: {formatDate(order.updated_at)}</p>
        </div>
        <div className="border-b">
          <div className="flow-root">
            <p className="float-left text-lg font-semibold">Total Price: </p>
            <p className="float-right text-lg font-semibold">
              {order.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
              }
            </p>
          </div>
        </div>
        <div className="border-b">
          <div className="flow-root">
            <p className="float-left text-lg font-semibold">Shipping Fee: </p>
            <p className="float-right text-lg font-semibold">
              {order.shipping_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
              }
            </p>
          </div>
        </div>
        <div className="border-b">
          <div className="flow-root">
            <p className="float-left text-lg font-semibold">Total Amount: </p>
            <p className="float-right text-lg font-semibold">
              {totalAmount.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
              }
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600">Status: {orderStatus}</p>
        <div className="flex justify-between">
          <div></div>
          <button
            className="bg-primary text-white px-4 py-2 rounded-md mt-4"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
