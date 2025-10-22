import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

const CustomerNotify: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const subscribers = JSON.parse(localStorage.getItem("newsletterSubscribers") || "[]");

    if (subscribers.length === 0) {
      toast.error("No subscribers found!");
      return;
    }

    if (!subject || !message) {
      toast.error("Please enter both subject and message.");
      return;
    }

    // ✅ Simulate sending email
    const sentTo = subscribers.map((sub: any) => sub.email);

    // Store notification log
    const existingLogs = JSON.parse(localStorage.getItem("notificationLogs") || "[]");
    const newLog = {
      subject,
      message,
      date: new Date().toLocaleString(),
      recipients: sentTo,
    };
    localStorage.setItem("notificationLogs", JSON.stringify([...existingLogs, newLog]));

    toast.success(`Sent to ${sentTo.length} subscribers successfully!`);
    setSubject("");
    setMessage("");
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8 border border-amber-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="text-amber-600 w-6 h-6" />
          <h1 className="text-2xl font-semibold text-amber-700">
            Customer Notify
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Send updates, offers, or important announcements to all newsletter subscribers with one click.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-amber-500"
          />
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleSend}
            className="flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg shadow hover:bg-amber-700 transition w-full sm:w-auto"
          >
            <Send className="w-5 h-5" /> Send Notification
          </button>
        </div>

        {/* ✅ Notification Logs */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3 text-amber-700">Previous Notifications</h2>
          {JSON.parse(localStorage.getItem("notificationLogs") || "[]").length === 0 ? (
            <p className="text-gray-500">No notifications sent yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
                <thead className="bg-amber-50 dark:bg-gray-800">
                  <tr>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Subject</th>
                    <th className="p-3 text-left">Recipients</th>
                  </tr>
                </thead>
                <tbody>
                  {JSON.parse(localStorage.getItem("notificationLogs") || "[]").map(
                    (log: any, index: number) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="p-3">{log.date}</td>
                        <td className="p-3">{log.subject}</td>
                        <td className="p-3">{log.recipients.length} emails</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerNotify;
