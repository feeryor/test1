import React from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { Order } from '../types/Order';
import { OrderCard } from './OrderCard';

interface OrdersListProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const OrdersList: React.FC<OrdersListProps> = ({
  orders,
  onEdit,
  onDelete,
  searchTerm,
  onSearchChange,
}) => {
  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-green-600" />
          רשימת הזמנות ({orders.length})
        </h2>
        
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="חיפוש לפי שם מזמין..."
            className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 w-64"
          />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'לא נמצאו הזמנות התואמות לחיפוש' : 'אין הזמנות עדיין'}
          </p>
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              נקה חיפוש
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};