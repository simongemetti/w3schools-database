import React, { useEffect, useState } from 'react';

const api = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [editableCustomerId, setEditableCustomerId] = useState(null); // Track which customer is being edited
  const [editedCustomer, setEditedCustomer] = useState({}); // Track changes to the edited customer
  const [showAll, setShowAll] = useState(false); // Track whether to show all customers or just the first 15

  useEffect(() => {
    fetch(`${api}/customers`) // Passe dies an den korrekten Endpunkt der W3Schools API an
      .then(response => response.json())
      .then(data => setCustomers(data));
  }, []);

  const handleInputChange = (customerId, field, value) => {
    setEditedCustomer(prev => ({
      ...prev,
      [customerId]: {
        ...prev[customerId],
        [field]: value,
      },
    }));
  };

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
        } else {
          alert('Failed to update customer');
        }
      });
  };

  const handleDelete = (customerId) => {
    fetch(`${api}/customers/${customerId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setCustomers(customers.filter(customer => customer.CustomerID !== customerId));
        } else {
          alert('Failed to delete customer');
        }
      });
  };

  const displayedCustomers = showAll ? customers : customers.slice(0, 15);

  return (
    <div className="">
      <h1 className="headline">Customers</h1>
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
                    className=""
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
                    className=""
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
                    className=""
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
                    className=""
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
                  <div className="">
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
                  <div className="">
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

      {customers.length > 15 && (
        <button
          className="button3"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}

export default CustomerList;
