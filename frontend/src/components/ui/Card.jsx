import PropTypes from 'prop-types';

/**
 * Card Component
 * Reusable card for consistent layout and styling
 */
const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'base',
  hoverable = false,
  ...props
}) => {
  const paddingStyles = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowStyles = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    base: 'shadow-md',
    md: 'shadow-lg',
    lg: 'shadow-xl',
  };

  const hoverStyle = hoverable ? 'hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer' : '';

  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200
        ${paddingStyles[padding]} ${shadowStyles[shadow]} ${hoverStyle}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['sm', 'md', 'lg']),
  shadow: PropTypes.oneOf(['none', 'sm', 'base', 'md', 'lg']),
  hoverable: PropTypes.bool,
};

export default Card;
