import React from 'react';
import { MdSend } from 'react-icons/md';
const ExpenseForm = ({
  product_name,
  stock,
  handleChange,
  handleAmount,
  handleSubmit,
  edit
}) => {
  return (
    <div
      style={{
        background: '#fff',
        width: '100%',
        display: 'flex',
        flexBasis: 'column',
        justifyContent: 'center',
        alignItems: 'space-between'
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className=''>
          <div className='form-group'>
            <label htmlFor='product_name'>PRODUCT</label>
            <input
              type='text'
              className='form-control'
              id='product_name'
              name='product_name'
              placeholder='e.g. rent'
              value={product_name}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='stock'>STOCK</label>
            <input
              type='number'
              className='form-control'
              id='stock'
              name='stock'
              placeholder='e.g. 100'
              value={stock}
              onChange={handleAmount}
            />
          </div>
        </div>
        <button className='btn'>
          {edit ? 'edit' : 'submit'}

          <MdSend className='btn-icon' />
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
