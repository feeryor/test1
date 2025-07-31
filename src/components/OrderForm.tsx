import React, { useState } from 'react';
import { Plus, User, Calendar, Clock, Package } from 'lucide-react';
import { Order } from '../types/Order';

interface OrderFormProps {
  onAddOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onAddOrder }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    orderDate: '',
    orderTime: '',
    quantity: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.orderDate || !formData.orderTime) {
      alert('אנא מלא את כל השדות הנדרשים');
      return;
    }
    
    onAddOrder({
      customerName: formData.customerName,
      orderDate: formData.orderDate,
      orderTime: formData.orderTime,
      quantity: formData.quantity,
    });

    setFormData({
      customerName: '',
      orderDate: '',
      orderTime: '',
      quantity: 1,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Plus className="w-6 h-6 text-blue-600" />
        הוספת הזמנה חדשה
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              שם המזמין *
            </label>
            <div className="relative">
              <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="הכנס שם המזמין"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              כמות *
            </label>
            <div className="relative">
              <Package className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="כמות"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              תאריך ההזמנה *
            </label>
            <div className="relative">
              <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleInputChange}
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              זמן ההזמנה *
            </label>
            <div className="relative">
              <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="time"
                name="orderTime"
                value={formData.orderTime}
                onChange={handleInputChange}
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          הוסף הזמנה
        </button>
      </form>
    </div>
  );
};