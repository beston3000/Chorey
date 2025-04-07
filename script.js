document.addEventListener('DOMContentLoaded', () => {
    const choresList = document.getElementById('choresList');
    const newChoreInput = document.getElementById('newChore');
    const chorePointsInput = document.getElementById('chorePoints');
    const addButton = document.getElementById('addButton');

    // Load chores from localStorage
    let chores = JSON.parse(localStorage.getItem('chores')) || [];

    // Function to save chores to localStorage
    const saveChores = () => {
        localStorage.setItem('chores', JSON.stringify(chores));
    };

    // Function to create a new chore item
    const createChoreElement = (chore) => {
        const li = document.createElement('li');
        li.className = 'chore-item';
        
        const choreInfo = document.createElement('div');
        choreInfo.className = 'chore-info';
        
        const choreText = document.createElement('span');
        choreText.className = 'chore-text';
        choreText.textContent = chore.text;
        
        const pointsBadge = document.createElement('span');
        pointsBadge.className = 'points-badge';
        pointsBadge.textContent = `$${chore.points}`;
        
        choreInfo.appendChild(choreText);
        choreInfo.appendChild(pointsBadge);
        
        const actions = document.createElement('div');
        actions.className = 'chore-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.onclick = () => editChore(chore.id);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => deleteChore(chore.id);
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        li.appendChild(choreInfo);
        li.appendChild(actions);
        
        return li;
    };

    // Function to render all chores
    const renderChores = () => {
        choresList.innerHTML = '';
        chores.forEach(chore => {
            choresList.appendChild(createChoreElement(chore));
        });
    };

    // Function to add a new chore
    const addChore = () => {
        const text = newChoreInput.value.trim();
        const points = parseInt(chorePointsInput.value) || 1;
        
        if (text) {
            const newChore = {
                id: Date.now(),
                text: text,
                points: points
            };
            chores.push(newChore);
            saveChores();
            renderChores();
            newChoreInput.value = '';
            chorePointsInput.value = '1';
        }
    };

    // Function to edit a chore
    const editChore = (id) => {
        const chore = chores.find(c => c.id === id);
        if (chore) {
            const newText = prompt('Enter new chore name:', chore.text);
            if (newText && newText.trim()) {
                const newPoints = prompt('Enter new dollar value:', chore.points);
                const points = parseInt(newPoints) || chore.points;
                
                chore.text = newText.trim();
                chore.points = points;
                saveChores();
                renderChores();
            }
        }
    };

    // Function to delete a chore
    const deleteChore = (id) => {
        chores = chores.filter(chore => chore.id !== id);
        saveChores();
        renderChores();
    };

    // Event listeners
    addButton.addEventListener('click', addChore);
    newChoreInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addChore();
        }
    });
    chorePointsInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addChore();
        }
    });

    // Initial render
    renderChores();
}); 