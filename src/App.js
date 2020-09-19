import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';

function App() {
  // ******************* state values  *******************
  // all expenses, add expense
  let products = [];
  const [expenses, setExpenses] = useState([]);
  // single expense
  const [product_name, setProduct] = useState('');
  //  single amount
  const [stock, setStock] = useState('');
  // alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);
  useEffect(() => {
    console.log('we called useEffect');
    //fetchUrl();
    fetch(`https://49plus.co.uk/wp-social/wp-json/social/v2/products`)
      .then(response => response.json())
      .then(data => {
        //console.log('PRODUCTS: ', data);
        products = data;
        console.log('EXPENSES: ', products);
        setExpenses(products);
      });

    //localStorage.setItem('expenses', JSON.stringify(expenses));
  }, []);
  // ******************* functionality  *******************
  const handleChange = e => {
    setProduct(e.target.value);
  };
  const handleAmount = e => {
    setStock(e.target.value);
  };

  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log('FORM SENT');
    console.log(product_name, stock);
    if (product_name !== '' && stock > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          console.log('MAP: ', item);
          // if id is one we want, use it but overwrite product_name and stock
          return item.id === id ? { ...item, product_name, stock } : item;
        });
        console.log(tempExpenses);
        // do fetch edit
        let formData = new FormData();
        formData.append('id', id);
        formData.append('product_name', product_name);
        formData.append('stock', stock);
        formData.append('active', 1);

        fetch('https://49plus.co.uk/wp-social/wp-json/social/v2/edit-product', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setExpenses(tempExpenses);
          });

        //
        setEdit(false);
        handleAlert({ type: 'success', text: 'item edited' });
        setProduct('');
        setStock('');
      } else {
        let formData = new FormData();
        formData.append('product_name', product_name);
        formData.append('stock', stock);

        fetch('https://49plus.co.uk/wp-social/wp-json/social/v2/add-product', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            console.log('new ID ', data.id);
            const newItem = {
              id: data.id,
              product_name,
              stock
            };
            setExpenses([newItem, ...expenses]);
          });
        // add to top
        setEdit(false);
        handleAlert({
          type: 'success',
          text: `Item ${product_name} for £${stock} has been added`
        });
        setProduct('');
        setStock('');
      }
    } else {
      handleAlert({
        type: 'danger',
        text: `charge can't be empty and amount value has to be bigger than £0`
      });
    }
  };
  // clear all items

  const clearItems = () => {
    console.log('clear all items');
    setExpenses([]);
    handleAlert({ type: 'danger', text: `all items deleted` });
  };

  // handle delete
  const handleDelete = id => {
    console.log('APP DELETE ', id);
    let tempExpenses = expenses.filter(item => item.id !== id);
    console.log(tempExpenses);
    setExpenses(tempExpenses);
    let formData = new FormData();
    formData.append('id', id);

    fetch('https://49plus.co.uk/wp-social/wp-json/social/v2/delete-product', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });

    handleAlert({ type: 'danger', text: `item ${id} deleted` });
  };
  // handle edit
  const handleEdit = id => {
    // get item selected
    let expense = expenses.find(item => {
      return item.id === id;
    });
    let { product_name, stock } = expense;
    setProduct(product_name);
    setStock(stock);
    setEdit(true);
    setId(id);
    console.log('EDITED PRODUCT: ', expense);
    console.log(`item edited : ${id}`);
  };

  return (
    <>
      <div id='alerts'>
        {alert.show && (
          <Alert
            type={alert.type}
            text={alert.text}
            handleAlert={handleAlert}
          />
        )}
      </div>

      <h1>stock</h1>

      <main className='App'>
        <ExpenseForm
          product_name={product_name}
          stock={stock}
          handleAmount={handleAmount}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
    </>
  );
}

export default App;
