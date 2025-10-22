import React, { useEffect, useState } from "react";

interface Subscriber {
  email: string;
  date: string;
}

const Subscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("newsletterSubscribers");
      if (stored) {
        const parsed = JSON.parse(stored);

        // ✅ Ensure consistent data structure
        if (Array.isArray(parsed)) {
          // Already an array of subscribers
          setSubscribers(parsed);
        } else if (parsed && typeof parsed === "object" && parsed.email) {
          // Just a single subscriber object
          setSubscribers([parsed]);
        } else {
          console.warn("Invalid newsletterSubscribers format:", parsed);
          setSubscribers([]);
        }
      }
    } catch (err) {
      console.error("Error parsing subscribers:", err);
      setSubscribers([]);
    }
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold mb-6 text-amber-700">
        Newsletter Subscribers
      </h1>

      {subscribers.length === 0 ? (
        <p className="text-gray-500">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <table className="w-full text-left">
            <thead className="bg-amber-50 dark:bg-gray-700">
              <tr>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Date Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-100 dark:border-gray-600 hover:bg-amber-50/40 dark:hover:bg-gray-700/40 transition"
                >
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {typeof s.email === "object"
                      ? JSON.stringify(s.email)
                      : s.email}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">
                    {typeof s.date === "object"
                      ? JSON.stringify(s.date)
                      : s.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Subscribers;
