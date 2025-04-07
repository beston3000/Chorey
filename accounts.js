document.addEventListener('DOMContentLoaded', () => {
    const accountsList = document.getElementById('accountsList');
    const newAccountInput = document.getElementById('newAccountName');
    const addAccountButton = document.getElementById('addAccountButton');

    // Load accounts from localStorage
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Function to save accounts to localStorage
    const saveAccounts = () => {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    };

    // Function to create a new account element
    const createAccountElement = (account) => {
        const li = document.createElement('li');
        li.className = 'account-item';
        
        const accountInfo = document.createElement('div');
        accountInfo.className = 'account-info';
        
        const accountName = document.createElement('span');
        accountName.textContent = account.name;
        
        const accountRole = document.createElement('span');
        accountRole.textContent = account.role || 'Member';
        accountRole.className = 'role-badge';
        
        accountInfo.appendChild(accountName);
        accountInfo.appendChild(accountRole);
        
        const actions = document.createElement('div');
        actions.className = 'account-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.onclick = () => editAccount(account.id);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => deleteAccount(account.id);
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        li.appendChild(accountInfo);
        li.appendChild(actions);
        
        return li;
    };

    // Function to render all accounts
    const renderAccounts = () => {
        accountsList.innerHTML = '';
        accounts.forEach(account => {
            accountsList.appendChild(createAccountElement(account));
        });
    };

    // Function to add a new account
    const addAccount = () => {
        const name = newAccountInput.value.trim();
        if (name) {
            const newAccount = {
                id: Date.now(),
                name: name,
                role: 'Member'
            };
            accounts.push(newAccount);
            saveAccounts();
            renderAccounts();
            newAccountInput.value = '';
        }
    };

    // Function to edit an account
    const editAccount = (id) => {
        const account = accounts.find(acc => acc.id === id);
        if (account) {
            const newName = prompt('Enter new name:', account.name);
            if (newName && newName.trim()) {
                account.name = newName.trim();
                saveAccounts();
                renderAccounts();
            }
        }
    };

    // Function to delete an account
    const deleteAccount = (id) => {
        if (confirm('Are you sure you want to delete this account?')) {
            accounts = accounts.filter(account => account.id !== id);
            saveAccounts();
            renderAccounts();
        }
    };

    // Event listeners
    addAccountButton.addEventListener('click', addAccount);
    newAccountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addAccount();
        }
    });

    // Initial render
    renderAccounts();
}); 