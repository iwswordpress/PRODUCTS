import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
const ExpenseItem = ({ expense, handleDelete, handleEdit }) => {
  //console.log(expense);
  const { id, product_name, stock } = expense;
  //console.log('ITEM ', handleDelete, handleEdit);
  return (
    <li className='item'>
      <div className='itemRow'>
        <div className='info'>
          <span className='expense'>
            ID: <b>{id}</b>: {product_name}
          </span>
          <span className='amount'>{stock}</span>
        </div>
        <div className='btnRow'>
          <button
            className='edit-btn'
            aria-label='edit button'
            onClick={() => {
              console.log('ITEM EDIT', id);
              handleEdit(id);
            }}
          >
            <MdEdit />
          </button>
          <button
            className='clear-btn'
            aria-label='delete button'
            onClick={() => {
              console.log('ITEM DELETE', id);
              handleDelete(id);
            }}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ExpenseItem;
