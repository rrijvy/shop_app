import React from "react";

const Checkbox = () => {
  return (
    <input
      type="checkbox"
      className="w-4 h-4 text-blue-800 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      checked={true}
    />
  );
};

export default Checkbox;
