// ProductList.js
import React, { useEffect, useState } from 'react';

const api = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editableProductId, setEditableProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [newProduct, setNewProduct] = useState({ ProductName: '', Price: '' });
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch(`${api}/products?limit=10&sort=desc`)
      .then(response => response.json())
      .then(data => setProducts(data.slice(-10).reverse()))
      .catch(error => console.error("Error fetching products:", error));
  }, [refresh]);

  const handleInputChange = (productId, field, value) => {
    setEditedProduct(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSave = (productId) => {
    const updatedProduct = editedProduct[productId];
    fetch(`${api}/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(response => {
        if (response.ok) {
          setProducts(products.map(product =>
            product.ProductID === productId ? { ...product, ...updatedProduct } : product
          ));
          setEditableProductId(null);
          setMessage('Product updated successfully!');
        } else {
          setMessage('Failed to update product.');
        }
      })
      .catch(error => {
        console.error("Error updating product:", error);
        setMessage('An error occurred while updating product.');
      });
  };

  const handleDelete = (productId) => {
    fetch(`${api}/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setProducts(products.filter(product => product.ProductID !== productId));
          setMessage('Product deleted successfully!');
        } else {
          setMessage('Failed to delete product.');
        }
      })
      .catch(error => {
        console.error("Error deleting product:", error);
        setMessage('An error occurred while deleting product.');
      });
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts(prevProducts => {
          const updatedProducts = [...prevProducts, addedProduct];
          return updatedProducts.slice(-10);
        });
        setMessage('Product registered successfully!');
        setNewProduct({ ProductName: '', Price: '' });
        setRefresh(!refresh);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  // Filter and sort products based on search term and sort order
  const filteredAndSortedProducts = products
    .filter(product => 
      product.ProductName && product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => 
      sortOrder === 'asc' 
        ? a.ProductName.localeCompare(b.ProductName) 
        : b.ProductName.localeCompare(a.ProductName)
    );

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const toggleSortOrder = () => setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));

  return (
    <div>
      <h1 className="headline">Products</h1>

      {message && <p className="message">{message}</p>}

      {/* Search and Sort */}
      <input
        type="text"
        placeholder="Search by product name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button onClick={toggleSortOrder} className="sort-button">
        Sort by Name ({sortOrder === 'asc' ? 'Asc' : 'Desc'})
      </button>

      {/* Registration Form */}
      <form onSubmit={handleRegister}>
        <h2>Register a Product</h2>
        <div>
          <label>Product Name:</label>
          <input
            className="anmeldung"
            type="text"
            name="ProductName"
            value={newProduct.ProductName}
            onChange={handleNewProductChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            className="anmeldung"
            type="text"
            name="Price"
            value={newProduct.Price}
            onChange={handleNewProductChange}
            required
          />
        </div>
        <button className="anmelde-button" type="submit">Register</button>
      </form>

      {/* Product Table */}
      <table className="tabelle1">
        <thead>
          <tr>
            <th className="table_headline">Product Name</th>
            <th className="table_headline">Price</th>
            <th className="table_headline">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedProducts.map(product => (
            <tr key={product.ProductID} className="tabellen_spalte">
              <td className="table_data">
                {editableProductId === product.ProductID ? (
                  <input
                    type="text"
                    value={editedProduct[product.ProductID]?.ProductName || product.ProductName}
                    onChange={(e) =>
                      handleInputChange(product.ProductID, 'ProductName', e.target.value)
                    }
                  />
                ) : (
                  product.ProductName
                )}
              </td>
              <td className="table_data">
                {editableProductId === product.ProductID ? (
                  <input
                    type="text"
                    value={editedProduct[product.ProductID]?.Price || product.Price}
                    onChange={(e) =>
                      handleInputChange(product.ProductID, 'Price', e.target.value)
                    }
                  />
                ) : (
                  product.Price
                )}
              </td>
              <td className="table_data">
                {editableProductId === product.ProductID ? (
                  <div>
                    <button className="button2" onClick={() => handleSave(product.ProductID)}>Save</button>
                    <button className="button1" onClick={() => setEditableProductId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button className="button2" onClick={() => setEditableProductId(product.ProductID)}>Edit</button>
                    <button className="button1" onClick={() => handleDelete(product.ProductID)}>Delete</button>
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

export default ProductList;
