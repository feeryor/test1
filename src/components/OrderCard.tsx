import React from 'react';
import { Edit3, Trash2, User, Calendar, Clock, Package } from 'lucide-react';
import { Order } from '../types/Order';

interface OrderCardProps {
  order: Order;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">{order.customerName}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(order)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="ערוך הזמנה"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(order.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="מחק הזמנה"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{formatDate(order.orderDate)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{order.orderTime}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Package className="w-4 h-4" />
          <span className="text-sm font-medium">{order.quantity} יחידות</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          נוצר: {order.createdAt.toLocaleDateString('he-IL')} {order.createdAt.toLocaleTimeString('he-IL')}
        </span>
      </div>
    </div>
  );
};