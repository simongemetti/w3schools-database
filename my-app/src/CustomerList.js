// CustomerList.js
import React, { useEffect, useState } from 'react';

const api = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [editableCustomerId, setEditableCustomerId] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [newCustomer, setNewCustomer] = useState({ CustomerName: '', Address: '', PostalCode: '', Country: '' });
  const [message, setMessage] = useState('');

  // Fetch customers from API on component load
  useEffect(() => {
    fetch(`${api}/customers`)
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error("Error fetching customers:", error));
  }, []);

  // Update form input for editing
  const handleInputChange = (customerId, field, value) => {
    setEditedCustomer(prev => ({
      ...prev,
      [customerId]: {
        ...prev[customerId],
        [field]: value,
      },
    }));
  };

  // Save customer updates
  const handleSave = (customerId) => {
    const updatedCustomer = editedCustomer[customerId];
    fetch(`${api}/customers/${customerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then(response => {
        if (response.ok) {
          setCustomers(customers.map(customer =>
            customer.CustomerID === customerId ? { ...customer, ...updatedCustomer } : customer
          ));
          setEditableCustomerId(null); // Exit edit mode
          setMessage('Customer updated successfully!');
        } else {
          alert('Failed to update customer');
        }
      })
      .catch(error => console.error("Error updating customer:", error));
  };

  // Delete a customer
  const handleDelete = (customerId) => {
    fetch(`${api}/customers/${customerId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setCustomers(customers.filter(customer => customer.CustomerID !== customerId));
          setMessage('Customer deleted successfully!');
        } else {
          alert('Failed to delete customer');
        }
      })
      .catch(error => console.error("Error deleting customer:", error));
  };

  // Register a new customer
  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        const addedCustomer = await response.json();
        setCustomers([...customers, addedCustomer]);
        setMessage('Customer registered successfully!');
        setNewCustomer({ CustomerName: '', Address: '', PostalCode: '', Country: '' });
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const displayedCustomers = customers.slice(0, 10);

  return (
    <div>
      <h1 className="headline">Customers</h1>
      
      {/* Registration Form */}
      <form onSubmit={handleRegister}>
        <h2>Register as Customer</h2>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            name="CustomerName"
            value={newCustomer.CustomerName}
            onChange={handleNewCustomerChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="Address"
            value={newCustomer.Address}
            onChange={handleNewCustomerChange}
            required
          />
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            name="PostalCode"
            value={newCustomer.PostalCode}
            onChange={handleNewCustomerChange}
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="Country"
            value={newCustomer.Country}
            onChange={handleNewCustomerChange}
            required
          />
        </div>
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>

      {/* Customer Table */}
      <table className="tabelle1">
        <thead>
          <tr>
            <th className="table_headline">Customer Name</th>
            <th className="table_headline">Address</th>
            <th className="table_headline">Postal Code</th>
            <th className="table_headline">Country</th>
            <th className="table_headline">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedCustomers.map(customer => (
            <tr key={customer.CustomerID} className="tabellen_spalte">
              <td className="table_data">
                {editableCustomerId === customer.CustomerID ? (
                  <input
                    type="text"
                    value={editedCustomer[customer.CustomerID]?.CustomerName || customer.CustomerName}
                    onChange={(e) =>
                      handleInputChange(customer.CustomerID, 'CustomerName', e.target.value)
                    }
                  />
                ) : (
                  customer.CustomerName
                )}
              </td>
              <td className="table_data">
                {editableCustomerId === customer.CustomerID ? (
                  <input
                    type="text"
                    value={editedCustomer[customer.CustomerID]?.Address || customer.Address}
                    onChange={(e) =>
                      handleInputChange(customer.CustomerID, 'Address', e.target.value)
                    }
                  />
                ) : (
                  customer.Address
                )}
              </td>
              <td className="table_data">
                {editableCustomerId === customer.CustomerID ? (
                  <input
                    type="text"
                    value={editedCustomer[customer.CustomerID]?.PostalCode || customer.PostalCode}
                    onChange={(e) =>
                      handleInputChange(customer.CustomerID, 'PostalCode', e.target.value)
                    }
                  />
                ) : (
                  customer.PostalCode
                )}
              </td>
              <td className="table_data">
                {editableCustomerId === customer.CustomerID ? (
                  <input
                    type="text"
                    value={editedCustomer[customer.CustomerID]?.Country || customer.Country}
                    onChange={(e) =>
                      handleInputChange(customer.CustomerID, 'Country', e.target.value)
                    }
                  />
                ) : (
                  customer.Country
                )}
              </td>
              <td className="table_data">
                {editableCustomerId === customer.CustomerID ? (
                  <div>
                    <button 
                      className="button2"
                      onClick={() => handleSave(customer.CustomerID)}
                    >
                      Save
                    </button>
                    <button 
                      className="button1"
                      onClick={() => setEditableCustomerId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button 
                      className="button2"
                      onClick={() => setEditableCustomerId(customer.CustomerID)}
                    >
                      Edit
                    </button>
                    <button 
                      className="button1"
                      onClick={() => handleDelete(customer.CustomerID)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;