const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute inset-1 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
