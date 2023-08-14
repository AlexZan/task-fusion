function ItemInput({ value, onChange, onKeyPress, placeholder }) {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyPress}
        className="input-theme w-full dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
        placeholder={placeholder}
      />
    );
  }
  
  export default ItemInput;
  