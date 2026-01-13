import PropTypes from 'prop-types';

/**
 * Button Component
 * Reusable button with multiple variants, sizes, and states
 * Accessibility: Proper ARIA labels, keyboard focus states
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}) => {
  // Variant styles - Professional, understated design
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border border-blue-600 hover:border-blue-700 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 border border-gray-300 hover:border-gray-400 shadow-sm',
    outline: 'bg-white hover:bg-gray-50 active:bg-gray-100 text-blue-600 border border-gray-300 hover:border-blue-300 shadow-sm hover:shadow-md',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border border-red-600 hover:border-red-700 shadow-sm hover:shadow-md',
    success: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white border border-green-600 hover:border-green-700 shadow-sm hover:shadow-md',
    ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 hover:text-gray-900 border border-transparent hover:border-gray-300',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm font-medium',
    md: 'px-4 py-2 text-base font-medium',
    lg: 'px-6 py-3 text-lg font-semibold',
  };

  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-md transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-inherit disabled:hover:shadow-none
    font-sans font-medium whitespace-nowrap
  `;

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="w-4 h-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'success', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  'aria-label': PropTypes.string,
};

export default Button;
