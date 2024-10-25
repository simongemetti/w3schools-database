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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Postal Code</th>
            <th className="py-2 px-4 border-b">Country</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedCustomers.map(customer => (
            <tr key={customer.CustomerID} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">
                {editableCustomerId === customer.CustomerID ? (
                  <input
                    className="border p-2 w-full"
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
              <td className="py-2 px-4 border-b">
                {editableCustomerId === customer.CustomerID ? (
                  <input
                    className="border p-2 w-full"
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
              <td className="py-2 px-4 border-b">
                {editableCustomerId === customer.CustomerID ? (
                  <input
                    className="border p-2 w-full"
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
              <td className="py-2 px-4 border-b">
                {editableCustomerId === customer.CustomerID ? (
                  <input
                    className="border p-2 w-full"
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
              <td className="py-2 px-4 border-b">
                {editableCustomerId === customer.CustomerID ? (
                  <div className="flex space-x-2">
                    <button 
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleSave(customer.CustomerID)}
                    >
                      Save
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => setEditableCustomerId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button 
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => setEditableCustomerId(customer.CustomerID)}
                    >
                      Edit
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-2 rounded"
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
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}

export default CustomerList;
