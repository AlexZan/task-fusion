export function IconButton({ onClick, hoverClassName, children }) {
    return (
      <button
        onClick={onClick}
        className={`ml-2 text-gray-500 transition-colors duration-200 hide-button ${hoverClassName}`}
      >
        {children}
      </button>
    );
  }
  