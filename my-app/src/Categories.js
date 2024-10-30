// CategoryList.js
import React, { useEffect, useState } from 'react';

const api = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [editableCategoryId, setEditableCategoryId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({});
  const [newCategory, setNewCategory] = useState({ CategoryName: '', Description: '' });
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State für die Suche
  const [sortOrder, setSortOrder] = useState('asc'); // State für die Sortierreihenfolge

  // Fetch categories from API on component load or when refresh state changes
  useEffect(() => {
    fetch(`${api}/categories?limit=10&sort=desc`)
      .then(response => response.json())
      .then(data => setCategories(data.slice(-10).reverse()))
      .catch(error => console.error("Error fetching categories:", error));
  }, [refresh]);

  // Update form input for editing
  const handleInputChange = (categoryId, field, value) => {
    setEditedCategory(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [field]: value,
      },
    }));
  };

  // Save category updates
  const handleSave = (categoryId) => {
    const updatedCategory = editedCategory[categoryId];
    fetch(`${api}/categories/${categoryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCategory),
    })
      .then(response => {
        if (response.ok) {
          setCategories(categories.map(category =>
            category.CategoryID === categoryId ? { ...category, ...updatedCategory } : category
          ));
          setEditableCategoryId(null);
          setMessage('Category updated successfully!');
        } else {
          setMessage('Failed to update category.');
        }
      })
      .catch(error => {
        console.error("Error updating category:", error);
        setMessage('An error occurred while updating category.');
      });
  };

  // Delete a category
  const handleDelete = (categoryId) => {
    fetch(`${api}/categories/${categoryId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setCategories(categories.filter(category => category.CategoryID !== categoryId));
          setMessage('Category deleted successfully!');
        } else {
          setMessage('Failed to delete category.');
        }
      })
      .catch(error => {
        console.error("Error deleting category:", error);
        setMessage('An error occurred while deleting category.');
      });
  };

  // Register a new category
  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        const addedCategory = await response.json();
        setCategories(prevCategories => {
          const updatedCategories = [...prevCategories, addedCategory];
          return updatedCategories.slice(-10);
        });
        setMessage('Category registered successfully!');
        setNewCategory({ CategoryName: '', Description: '' });
        setRefresh(!refresh);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  // Filter and sort categories based on search term and sort order
  const filteredAndSortedCategories = categories
    .filter(category => 
      category.CategoryName && category.CategoryName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => 
      sortOrder === 'asc' 
        ? a.CategoryName.localeCompare(b.CategoryName) 
        : b.CategoryName.localeCompare(a.CategoryName)
    );

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const toggleSortOrder = () => setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));

  return (
    <div>
      <h1 className="headline">Categories</h1>

      {message && <p className="message">{message}</p>}

      {/* Search and Sort */}
      <input
        type="text"
        placeholder="Search by category name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button onClick={toggleSortOrder} className="sort-button">
        Sort by Name ({sortOrder === 'asc' ? 'Asc' : 'Desc'})
      </button>

      {/* Registration Form */}
      <form onSubmit={handleRegister}>
        <h2>Register a Category</h2>
        <div>
          <label>Category Name:</label>
          <input className="anmeldung"
            type="text"
            name="CategoryName"
            value={newCategory.CategoryName}
            onChange={handleNewCategoryChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input className="anmeldung"
            type="text"
            name="Description"
            value={newCategory.Description}
            onChange={handleNewCategoryChange}
            required
          />
        </div>
        <button className="anmelde-button" type="submit">Register</button>
      </form>

      {/* Category Table */}
      <table className="tabelle1">
        <thead>
          <tr>
            <th className="table_headline">Category Name</th>
            <th className="table_headline">Description</th>
            <th className="table_headline">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedCategories.map(category => (
            <tr key={category.CategoryID} className="tabellen_spalte">
              <td className="table_data">
                {editableCategoryId === category.CategoryID ? (
                  <input
                    type="text"
                    value={editedCategory[category.CategoryID]?.CategoryName || category.CategoryName}
                    onChange={(e) =>
                      handleInputChange(category.CategoryID, 'CategoryName', e.target.value)
                    }
                  />
                ) : (
                  category.CategoryName
                )}
              </td>
              <td className="table_data">
                {editableCategoryId === category.CategoryID ? (
                  <input
                    type="text"
                    value={editedCategory[category.CategoryID]?.Description || category.Description}
                    onChange={(e) =>
                      handleInputChange(category.CategoryID, 'Description', e.target.value)
                    }
                  />
                ) : (
                  category.Description
                )}
              </td>
              <td className="table_data">
                {editableCategoryId === category.CategoryID ? (
                  <div>
                    <button 
                      className="button2"
                      onClick={() => handleSave(category.CategoryID)}
                    >
                      Save
                    </button>
                    <button 
                      className="button1"
                      onClick={() => setEditableCategoryId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button 
                      className="button2"
                      onClick={() => setEditableCategoryId(category.CategoryID)}
                    >
                      Edit
                    </button>
                    <button 
                      className="button1"
                      onClick={() => handleDelete(category.CategoryID)}
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

export default CategoryList;
