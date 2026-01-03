const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
        <div className="mt-4 text-center text-gray-600 font-medium">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
