import React, { useState } from 'react';
import { OrderForm } from './components/OrderForm';
import { OrdersList } from './components/OrdersList';
import { EditOrderModal } from './components/EditOrderModal';
import { Order } from './types/Order';
import { ShoppingCart } from 'lucide-react';

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setIsEditModalOpen(true);
  };

  const handleSaveOrder = (id: string, updatedData: Omit<Order, 'id' | 'createdAt'>) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id
          ? { ...order, ...updatedData }
          : order
      )
    );
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק הזמנה זו?')) {
      setOrders(prev => prev.filter(order => order.id !== id));
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShoppingCart className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">מערכת ניהול הזמנות</h1>
          </div>
          <p className="text-gray-600 text-lg">נהל את ההזמנות שלך בקלות ויעילות</p>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          <OrderForm onAddOrder={handleAddOrder} />
          
          <OrdersList
            orders={orders}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        <EditOrderModal
          order={editingOrder}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveOrder}
        />
      </div>
    </div>
  );
}

export default App;