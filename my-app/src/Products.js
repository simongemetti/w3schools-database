// ProductList.js
import React, { useEffect, useState } from 'react';

const api = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editableProductId, setEditableProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [newProduct, setNewProduct] = useState({ ProductName: '', Category: '', Price: '' });
  const [message, setMessage] = useState('');

  // Fetch products from API on component load
  useEffect(() => {
    fetch(`${api}/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // Update form input for editing
  const handleInputChange = (productId, field, value) => {
    setEditedProduct(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  // Save product updates
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
          setEditableProductId(null); // Exit edit mode
          setMessage('Product updated successfully!');
        } else {
          alert('Failed to update product');
        }
      })
      .catch(error => console.error("Error updating product:", error));
  };

  // Delete a product
  const handleDelete = (productId) => {
    fetch(`${api}/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setProducts(products.filter(product => product.ProductID !== productId));
          setMessage('Product deleted successfully!');
        } else {
          alert('Failed to delete product');
        }
      })
      .catch(error => console.error("Error deleting product:", error));
  };

  // Register a new product
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
        setProducts([...products, addedProduct]);
        setMessage('Product registered successfully!');
        setNewProduct({ ProductName: '', Category: '', Price: '' });
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const displayedProducts = products.slice(0, 10);

  return (
    <div>
      <h1 className="headline">Products</h1>
      
      {/* Registration Form */}
      <form onSubmit={handleRegister}>
        <h2>Register a Product</h2>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="ProductName"
            value={newProduct.ProductName}
            onChange={handleNewProductChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="Category"
            value={newProduct.Category}
            onChange={handleNewProductChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="Price"
            value={newProduct.Price}
            onChange={handleNewProductChange}
            required
          />
        </div>
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>

      {/* Product Table */}
      <table className="tabelle1">
        <thead>
          <tr>
            <th className="table_headline">Product Name</th>
            <th className="table_headline">Category</th>
            <th className="table_headline">Price</th>
            <th className="table_headline">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedProducts.map(product => (
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
                    value={editedProduct[product.ProductID]?.Category || product.Category}
                    onChange={(e) =>
                      handleInputChange(product.ProductID, 'Category', e.target.value)
                    }
                  />
                ) : (
                  product.Category
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
                    <button 
                      className="button2"
                      onClick={() => handleSave(product.ProductID)}
                    >
                      Save
                    </button>
                    <button 
                      className="button1"
                      onClick={() => setEditableProductId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button 
                      className="button2"
                      onClick={() => setEditableProductId(product.ProductID)}
                    >
                      Edit
                    </button>
                    <button 
                      className="button1"
                      onClick={() => handleDelete(product.ProductID)}
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

export default ProductList;
