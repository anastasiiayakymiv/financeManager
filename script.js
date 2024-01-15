
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

function goBack() {
    window.location.href = 'index.html';
}

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

function filterCategories() {
    const searchInput = document.getElementById('search-category');
    const searchTerm = searchInput.value.toLowerCase();
    const categoryList = document.getElementById('category-list');

    categories.forEach((category, index) => {
        const categoryName = category.name.toLowerCase();
        const categoryRow = categoryList.children[index];

        if (categoryName.includes(searchTerm)) {
            categoryRow.style.display = 'table-row';
        } else {
            categoryRow.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    loadCategoriesForSelect(); 
    loadTransactions(); 
});

function loadCategoriesForSelect() {
    const categorySelect = document.getElementById('category-select');
    
    categories = JSON.parse(localStorage.getItem('categories')) || [];

    categorySelect.innerHTML = '';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}


function addTransaction() {
    const categorySelect = document.getElementById('category-select');
    const operationSelect = document.getElementById('operation-select');
    const amountInput = document.getElementById('amount-input');
    const dateInput = document.getElementById('date-input');
    const descriptionInput = document.getElementById('description-input');

    const newTransaction = {
        category: categorySelect.value,
        operation: operationSelect.value,
        amount: amountInput.value.trim(),
        date: dateInput.value,
        description: descriptionInput.value.trim()
    };

    if (newTransaction.category !== '' && newTransaction.amount !== '' && newTransaction.date !== '') {
        transactions.push(newTransaction); 
        saveTransactions(); 
        loadTransactions(); 

        categorySelect.value = '';
        operationSelect.value = 'expense'; 
        amountInput.value = '';
        dateInput.value = '';
        descriptionInput.value = '';
    }
}


function updateTransaction(index) {
    const newName = prompt('Enter new name:');
    const newDescription = prompt('Enter new description:');

    if (newName !== null && newDescription !== null) {
        transactions[index].name = newName.trim();
        transactions[index].description = newDescription.trim();
        saveTransactions();
        loadTransactions();
    }
}

function deleteTransaction(index) {
    const confirmDelete = confirm('Are you sure you want to delete this transaction?');

    if (confirmDelete) {
        transactions.splice(index, 1);
        saveTransactions();
        loadTransactions();
    }
}

function loadTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const row = transactionList.insertRow();
        row.innerHTML = `<td>${transaction.category}</td>
                         <td>${transaction.operation}</td>
                         <td>${transaction.amount}</td>
                         <td>${transaction.date}</td>
                         <td>${transaction.description}</td>
                         <td>
                             <button onclick="updateTransaction(${index})">Update</button>
                             <button onclick="deleteTransaction(${index})">Delete</button>
                         </td>`;
    });
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

