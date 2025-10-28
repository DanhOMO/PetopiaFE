"use client";

import { useState, useEffect } from "react";
import {
  HiCalendar,
  HiUser,
  HiMail,
  HiDocumentText,
  HiCurrencyDollar,
  HiTag,
  HiCheckCircle,
  HiPlus,
  HiTrash,
  HiArrowLeft,
  HiSave,
  HiShoppingCart,
  HiOfficeBuilding,
} from "react-icons/hi";

const statusOptions = ["Paid", "Unpaid", "Pending", "Overdue"];
const currencies = [
  "United States Dollar (USD)",
  "Vietnamese Dong (VND)",
  "Euro (EUR)",
  "Japanese Yen (JPY)",
];

export default function CreateInvoice({ onBack }) {
  const [editedInvoice, setEditedInvoice] = useState({
    id: "",
    client: "",
    email: "",
    startDate: "",
    dueDate: "",
    deliveryDate: "",
    paymentCondition: "",
    currency: currencies[0],
    reference: "",
    object: "",
    status: statusOptions[0],
    note: "",
    vatApplicable: true,
  });

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: 1,
    discount: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleProductAdd = () => {
    if (!newProduct.name || !newProduct.price) return;
    const total = calculateTotal(newProduct);
    setProducts([...products, { ...newProduct, total }]);
    setNewProduct({ name: "", price: "", quantity: 1, discount: 0 });
  };

  const handleProductRemove = (index) => {
    setProducts(products.filter((_, idx) => idx !== index));
  };

  const calculateTotal = (product) => {
    const price = Number.parseFloat(product.price) || 0;
    const quantity = Number.parseInt(product.quantity) || 1;
    const discount = Number.parseFloat(product.discount) || 0;
    return ((price * quantity * (100 - discount)) / 100).toFixed(2);
  };

  const subtotal = products.reduce(
    (acc, item) => acc + Number.parseFloat(item.total),
    0
  );
  const tax = editedInvoice.vatApplicable ? subtotal * 0.15 : 0;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const handleSave = () => {
    console.log("Created Invoice:", { ...editedInvoice, products });
    onBack();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 border-green-300";
      case "Unpaid":
        return "bg-red-100 text-red-700 border-red-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Overdue":
        return "bg-orange-100 text-orange-700 border-orange-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Invoices</span>
        </button>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 font-medium shadow-sm border border-gray-200"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            className="glow-button px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
          >
            <HiSave className="inline" />
            Save Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left form */}
        <div className="space-y-6">
          {/* Invoice Details Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b border-gray-200">
              <HiDocumentText className="text-blue-500" />
              Invoice Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Invoice Number"
                icon={<HiTag />}
                value={editedInvoice.id}
                onChange={(val) =>
                  setEditedInvoice({ ...editedInvoice, id: val })
                }
                placeholder="INV-001"
              />
              <Input
                label="Customer"
                icon={<HiUser />}
                value={editedInvoice.client}
                onChange={(val) =>
                  setEditedInvoice({ ...editedInvoice, client: val })
                }
                placeholder="Customer name"
              />
              <Input
                label="Email"
                icon={<HiMail />}
                value={editedInvoice.email}
                onChange={(val) =>
                  setEditedInvoice({ ...editedInvoice, email: val })
                }
                placeholder="customer@email.com"
              />
              <Select
                label="Payment Condition"
                icon={<HiCurrencyDollar />}
                options={["Net 30", "Net 45", "Due on Receipt"]}
                value={editedInvoice.paymentCondition}
                onChange={(val) =>
                  setEditedInvoice({ ...editedInvoice, paymentCondition: val })
                }
              />
              <Select
                label="Currency"
                icon={<HiCurrencyDollar />}
                options={currencies}
                value={editedInvoice.currency}
                onChange={(val) =>
                  setEditedInvoice({ ...editedInvoice, currency: val })
                }
              />
              <DateInput
                label="Issue Date"
                value={editedInvoice.startDate}
                onChange={(val) =>
                  setEditedInvoice({ ...editedInvoice, startDate: val })
                }
              />
              <DateInput
                label="Due Date"
                value={editedInvoice.dueDate}
                onChange={(val) =>
                  setEditedInvoice({ ...editedInvoice, dueDate: val })
                }
              />
              <DateInput
                label="Delivery Date"
                value={editedInvoice.deliveryDate}
                onChange={(val) =>
                  setEditedInvoice({ ...editedInvoice, deliveryDate: val })
                }
              />
              <Input
                label="Reference"
                icon={<HiDocumentText />}
                value={editedInvoice.reference}
                placeholder="Invoice Ref ID"
                onChange={(val) =>
                  setEditedInvoice({ ...editedInvoice, reference: val })
                }
              />
              <Input
                label="Object"
                icon={<HiTag />}
                placeholder="Payment terms"
                value={editedInvoice.object}
                onChange={(val) =>
                  setEditedInvoice({ ...editedInvoice, object: val })
                }
              />
              <Select
                label="Status"
                icon={<HiCheckCircle />}
                options={statusOptions}
                value={editedInvoice.status}
                onChange={(val) =>
                  setEditedInvoice({ ...editedInvoice, status: val })
                }
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Info
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Receipt Info (optional)"
                value={editedInvoice.note}
                onChange={(e) =>
                  setEditedInvoice({ ...editedInvoice, note: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-3 mt-4 p-3 bg-blue-50 rounded-lg">
              <input
                type="checkbox"
                id="vat"
                checked={editedInvoice.vatApplicable}
                onChange={(e) =>
                  setEditedInvoice({
                    ...editedInvoice,
                    vatApplicable: e.target.checked,
                  })
                }
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="vat"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                VAT Applicable (15%)
              </label>
            </div>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b border-gray-200">
              <HiShoppingCart className="text-purple-500" />
              Products
            </h3>

            {/* Product table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                    <th className="p-3 text-left font-semibold text-gray-700">
                      Product
                    </th>
                    <th className="p-3 text-center font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="p-3 text-center font-semibold text-gray-700">
                      Qty
                    </th>
                    <th className="p-3 text-center font-semibold text-gray-700">
                      Disc%
                    </th>
                    <th className="p-3 text-right font-semibold text-gray-700">
                      Total
                    </th>
                    <th className="p-3 text-center font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                      style={{
                        animation: `fadeInUp 0.3s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      <td className="p-3">{item.name}</td>
                      <td className="p-3 text-center">${item.price}</td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-center">{item.discount}%</td>
                      <td className="p-3 text-right font-semibold text-blue-600">
                        ${item.total}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleProductRemove(idx)}
                          className="text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-200"
                        >
                          <HiTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add product row */}
            <div className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                <input
                  className="col-span-2 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white"
                  placeholder="Product name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
                <input
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white"
                  placeholder="Price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
                <input
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white"
                  type="number"
                  placeholder="Qty"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                />
                <input
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white"
                  type="number"
                  placeholder="Disc%"
                  value={newProduct.discount}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, discount: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleProductAdd}
                className="glow-button w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <HiPlus className="inline" />
                Add Product
              </button>
            </div>

            {/* Order summary */}
            <div className="mt-6 space-y-2 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-800">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (15%)</span>
                <span className="font-semibold text-gray-800">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-gray-800">
                  ${shipping.toFixed(2)}
                </span>
              </div>
              <div className="border-t-2 border-blue-300 pt-2 mt-2"></div>
              <div className="flex justify-between text-lg">
                <span className="font-bold text-gray-800">Order Total</span>
                <span className="font-bold text-blue-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right invoice preview */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl sticky top-6 h-fit">
          <div className="border-b-2 border-gray-200 pb-4 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <HiOfficeBuilding className="text-blue-500" size={24} />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Your Company
                  </h2>
                </div>
                <p className="text-sm text-gray-600">Professional Invoice</p>
              </div>
              <div
                className={`px-4 py-2 rounded-lg border-2 font-semibold ${getStatusColor(
                  editedInvoice.status
                )}`}
              >
                {editedInvoice.status}
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Date: {editedInvoice.dueDate || "N/A"}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Invoice #{editedInvoice.id || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Reference: {editedInvoice.reference || "N/A"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs font-semibold text-blue-600 mb-2">
                PAY TO:
              </p>
              <p className="text-sm font-semibold text-gray-800">
                Your Company LLC
              </p>
              <p className="text-sm text-gray-600">LOUISVILLE, Selby</p>
              <p className="text-sm text-gray-600">3864 Johnson Street</p>
              <p className="text-sm text-gray-600">United States</p>
              <p className="text-xs text-gray-500 mt-2">VAT: AA-1234567890</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-xs font-semibold text-purple-600 mb-2">
                INVOICE TO:
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {editedInvoice.client || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                {editedInvoice.email || "N/A"}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Currency:{" "}
                {editedInvoice.currency.split("(")[1]?.replace(")", "") ||
                  "USD"}
              </p>
            </div>
          </div>

          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-purple-100">
                  <th className="p-2 text-left font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="p-2 text-center font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="p-2 text-center font-semibold text-gray-700">
                    Qty
                  </th>
                  <th className="p-2 text-right font-semibold text-gray-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2 text-center">${item.price}</td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-right font-semibold">
                      ${item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">${shipping.toFixed(2)}</span>
            </div>
            <div className="border-t-2 border-blue-300 pt-2 mt-2"></div>
            <div className="flex justify-between text-lg">
              <span className="font-bold text-gray-800">Order Total</span>
              <span className="font-bold text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {editedInvoice.note && (
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-xs font-semibold text-yellow-700 mb-1">
                Additional Notes:
              </p>
              <p className="text-sm text-gray-700">{editedInvoice.note}</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientMove {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .glow-button {
          position: relative;
          overflow: visible;
        }

        .glow-button::after {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 20px;
          background: currentColor;
          filter: blur(12px);
          opacity: 0.4;
          border-radius: 50%;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .glow-button:hover::after {
          height: 24px;
          filter: blur(16px);
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

function Input({
  label,
  icon,
  value,
  onChange,
  placeholder = "",
  disabled = false,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function Select({ label, icon, options, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
            {icon}
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white`}
        >
          <option value="">Select option</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function DateInput({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <HiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
        <input
          type="date"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>
  );
}
