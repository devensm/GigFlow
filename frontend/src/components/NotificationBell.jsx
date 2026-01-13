import { useContext, useState, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";

const NotificationBell = () => {
  const { notifications } = useContext(NotificationContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [displayNotifications, setDisplayNotifications] = useState([]);

  useEffect(() => {
    setDisplayNotifications(notifications);
  }, [notifications]);

  const dismissNotification = (id) => {
    setDisplayNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-1.5 text-gray-700 hover:text-blue-600 transition-colors duration-200 hover:bg-gray-100 rounded-md"
        aria-label="Notifications"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {displayNotifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {displayNotifications.length}
          </span>
        )}
      </button>

      {/* dropdown menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-200">
          <h3 className="font-semibold text-base mb-4 text-gray-900">Notifications</h3>

          {displayNotifications.length === 0 ? (
            <p className="text-gray-500 text-center py-6 text-sm font-normal">No new notifications</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {displayNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className="bg-blue-50 border-l-4 border-blue-600 p-3 rounded-md flex justify-between items-start hover:shadow-sm transition duration-200"
                >
                  <div className="flex-1">
                    <p className="text-sm font-normal text-gray-800">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notif.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <button
                    onClick={() => dismissNotification(notif.id)}
                    className="text-gray-400 hover:text-gray-600 transition duration-200 ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
