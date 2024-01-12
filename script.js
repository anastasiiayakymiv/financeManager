// Load categories from localStorage or use an empty array
let categories = JSON.parse(localStorage.getItem('categories')) || [];

document.addEventListener('DOMContentLoaded', function () {
    loadCategories();
});

function loadCategories() {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    categories.forEach((category, index) => {
        const row = categoryList.insertRow();
        row.innerHTML = `<td>${category.name}</td><td>${category.description}</td>
                          <td>
                              <button onclick="updateCategory(${index})" title="Update">
                                  <i class="fas fa-edit"></i>
                              </button>
                              <button onclick="deleteCategory(${index})" title="Delete">
                                  <i class="fas fa-trash-alt"></i>
                              </button>
                          </td>`;
    });
}
// ... (previous JavaScript code) ...

function goBack() {
    window.location.href = 'index.html';
}

// ... (remaining JavaScript code) ...


function addCategory() {
    const categoryNameInput = document.getElementById('category-name');
    const categoryDescriptionInput = document.getElementById('category-description');

    const newCategory = {
        name: categoryNameInput.value.trim(),
        description: categoryDescriptionInput.value.trim()
    };

    if (newCategory.name !== '' && newCategory.description !== '') {
        categories.push(newCategory);
        saveCategories();
        loadCategories();

        categoryNameInput.value = '';
        categoryDescriptionInput.value = '';
    }
}

function updateCategory(index) {
    const newName = prompt('Enter new name:');
    const newDescription = prompt('Enter new description:');

    if (newName !== null && newDescription !== null) {
        categories[index].name = newName.trim();
        categories[index].description = newDescription.trim();
        saveCategories();
        loadCategories();
    }
}

function deleteCategory(index) {
    const confirmDelete = confirm('Are you sure you want to delete this category?');

    if (confirmDelete) {
        categories.splice(index, 1);
        saveCategories();
        loadCategories();
    }
}

function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
    goBack();
}


function showForm() {
    const addCategoryForm = document.getElementById('add-category-form');
    const addButton = document.querySelector('button[onclick="showForm()"]');
    
    addCategoryForm.style.display = 'block';
    addButton.style.display = 'none';
}

function hideForm() {
    const addCategoryForm = document.getElementById('add-category-form');
    const addButton = document.querySelector('button[onclick="showForm()"]');
    
    addCategoryForm.style.display = 'none';
    addButton.style.display = 'block';

    document.getElementById('category-name').value = '';
    document.getElementById('category-description').value = '';
}

