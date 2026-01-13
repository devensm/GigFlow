import PropTypes from 'prop-types';

/**
 * Alert Component
 * Reusable alert for messages (success, error, warning, info)
 */
const Alert = ({ type = 'info', title, message, onClose, closable = true }) => {
  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-l-4 border-l-green-600 border-r border-t border-b border-green-200',
      icon: '✓',
      iconBg: 'bg-green-600',
      iconColor: 'text-white',
      titleColor: 'text-green-900',
      messageColor: 'text-green-800',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-l-4 border-l-red-600 border-r border-t border-b border-red-200',
      icon: '✕',
      iconBg: 'bg-red-600',
      iconColor: 'text-white',
      titleColor: 'text-red-900',
      messageColor: 'text-red-800',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-l-4 border-l-yellow-600 border-r border-t border-b border-yellow-200',
      icon: '!',
      iconBg: 'bg-yellow-600',
      iconColor: 'text-white',
      titleColor: 'text-yellow-900',
      messageColor: 'text-yellow-800',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-l-4 border-l-blue-600 border-r border-t border-b border-blue-200',
      icon: 'i',
      iconBg: 'bg-blue-600',
      iconColor: 'text-white',
      titleColor: 'text-blue-900',
      messageColor: 'text-blue-800',
    },
  };

  const style = typeStyles[type];

  return (
    <div
      className={`
        ${style.bg} ${style.border} rounded-lg p-4 shadow-sm
        flex gap-4 animate-in fade-in slide-in-from-top-2 duration-300
      `}
      role="alert"
    >
      <div className={`${style.iconBg} ${style.iconColor} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
        {style.icon}
      </div>
      <div className="flex-1">
        {title && <p className={`font-semibold text-sm ${style.titleColor}`}>{title}</p>}
        <p className={`text-sm ${style.messageColor}`}>{message}</p>
      </div>
      {closable && (
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  closable: PropTypes.bool,
};

export default Alert;
