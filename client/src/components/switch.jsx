import { useState } from 'react';

const Switch = ({ label, defaultChecked = false }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <div className={`block w-14 h-8 rounded-full transition-colors duration-200 ease-in-out ${
          isChecked ? 'bg-blue-600' : 'bg-gray-200'
        }`} />
        <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ease-in-out ${
          isChecked ? 'transform translate-x-6' : 'transform translate-x-0'
        }`} />
      </div>
      <span className="ml-3 text-gray-700">{label}</span>
    </label>
  );
};

export default Switch;