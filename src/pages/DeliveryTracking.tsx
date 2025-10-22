import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  RefreshCw,
} from "lucide-react";

const DeliveryTracking: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    // Add default delivery info if missing
    const enriched = storedOrders.map((o: any) => ({
      ...o,
      delivery: o.delivery || {
        trackingId: `TRK-${Math.floor(Math.random() * 1000000)}`,
        status: "Processing",
        estimatedDelivery: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ).toISOString(),
      },
    }));
    setOrders(enriched);
    localStorage.setItem("orders", JSON.stringify(enriched));
  }, []);

  const statuses = ["Processing", "Shipped", "Out for Delivery", "Delivered"];

  const handleStatusChange = (id: string, newStatus: string) => {
    setUpdatingId(id);
    setTimeout(() => {
      const updated = orders.map((order) =>
        order.id === id
          ? { ...order, delivery: { ...order.delivery, status: newStatus } }
          : order
      );
      setOrders(updated);
      localStorage.setItem("orders", JSON.stringify(updated));
      setUpdatingId(null);
    }, 600); // smooth transition
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-3xl font-bold text-amber-700 flex items-center gap-2">
            <Truck className="w-8 h-8 text-amber-600" />
            Delivery Tracking
          </h1>
          <p className="text-gray-500 text-sm">
            Track and update order deliveries in real time
          </p>
        </div>

        {/* Orders list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-amber-100 dark:border-gray-700 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-amber-700">
                    Order #{order.id}
                  </h2>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                    {order.delivery.trackingId}
                  </span>
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin size={14} /> {order.address || "No address provided"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Customer: <strong>{order.customer}</strong>
                </p>

                {/* Status Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    {statuses.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute h-2 bg-amber-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (statuses.indexOf(order.delivery.status) /
                            (statuses.length - 1)) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>

                {/* Status dropdown */}
                <div className="mt-4 flex items-center gap-2">
                  <select
                    value={order.delivery.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="p-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white"
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                  {updatingId === order.id ? (
                    <RefreshCw className="animate-spin text-amber-600" />
                  ) : (
                    <CheckCircle className="text-green-600" />
                  )}
                </div>
              </div>

              {/* Estimated delivery */}
              <p className="mt-4 text-sm text-gray-500 flex items-center gap-1">
                <Clock size={14} />
                Est. Delivery:{" "}
                <strong>
                  {new Date(order.delivery.estimatedDelivery).toDateString()}
                </strong>
              </p>
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <p className="text-center text-gray-500">
            No orders found. Create some orders to track deliveries.
          </p>
        )}
      </div>
    </div>
  );
};

export default DeliveryTracking;
