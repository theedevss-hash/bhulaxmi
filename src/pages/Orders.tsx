import React from "react";

interface Order {
  id: number;
  customer: string;
  amount: string;
  status: string;
}

const Orders: React.FC = () => {
  const sampleOrders: Order[] = [
    { id: 101, customer: "Aditi", amount: "$300", status: "Delivered" },
    { id: 102, customer: "Rahul", amount: "$450", status: "Pending" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>
      <table className="w-full text-left border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleOrders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.customer}</td>
              <td className="p-2">{order.amount}</td>
              <td className="p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
