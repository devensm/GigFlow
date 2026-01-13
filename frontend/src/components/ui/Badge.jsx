import PropTypes from 'prop-types';

/**
 * Badge Component
 * Reusable badge for status, tags, and labels
 */
const Badge = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const variantStyles = {
    primary: 'bg-blue-100 text-blue-700 border border-blue-200',
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    error: 'bg-red-100 text-red-700 border border-red-200',
    gray: 'bg-gray-100 text-gray-700 border border-gray-200',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs font-medium',
    md: 'px-3 py-1.5 text-sm font-medium',
    lg: 'px-4 py-2 text-base font-semibold',
  };

  return (
    <span
      className={`
        inline-block rounded-full whitespace-nowrap
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'success', 'warning', 'error', 'gray']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Badge;
