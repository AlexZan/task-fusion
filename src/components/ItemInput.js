function ItemInput({ value, onChange, onKeyPress, placeholder, isOpen }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onKeyPress(e);
  };

  return (
    <form onSubmit={handleSubmit} className={`pl-2 pr-2 slide-in ${isOpen ? 'open' : ''}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyPress}
        className="item-input-theme w-full dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
        placeholder={placeholder}
      />
    </form>
  );
}


  export default ItemInput;
  