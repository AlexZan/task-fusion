import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

export default function DeleteButton({ onDelete }) {
    return (
      <button
        onClick={onDelete}
        className="ml-2 text-gray-500 transition-colors duration-200 hide-button hover:text-red-500"
        aria-label="Delete task"
      >
        <AiOutlineDelete />
      </button>
    );
  }
  