document.addEventListener('DOMContentLoaded', () => {
    const weeklyChoresList = document.getElementById('weeklyChoresList');
    const earningsList = document.getElementById('earningsList');
    const resetButton = document.getElementById('resetButton');
    const calculateButton = document.getElementById('calculateButton');
    const earningsContainer = document.getElementById('earningsContainer');

    // Load data from localStorage
    let chores = JSON.parse(localStorage.getItem('chores')) || [];
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    let choreAssignments = JSON.parse(localStorage.getItem('choreAssignments')) || {};
    let completionData = JSON.parse(localStorage.getItem('completionData')) || {};

    // Function to save data to localStorage
    const saveData = () => {
        localStorage.setItem('choreAssignments', JSON.stringify(choreAssignments));
        localStorage.setItem('completionData', JSON.stringify(completionData));
    };

    // Function to calculate earnings for a specific person
    const calculatePersonEarnings = (accountId) => {
        let totalEarnings = 0;
        
        // Get all chores assigned to this person
        const assignedChores = chores.filter(chore => choreAssignments[chore.id] === accountId);
        
        // Calculate earnings for each day
        ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].forEach(day => {
            assignedChores.forEach(chore => {
                if (completionData[day] && completionData[day][chore.id] !== undefined) {
                    totalEarnings += completionData[day][chore.id] ? chore.points : -chore.points;
                }
            });
        });
        
        return totalEarnings;
    };

    // Function to calculate tithing
    const calculateTithing = (earnings) => {
        // Only calculate tithing if earnings are positive
        return earnings >= 0 ? (earnings * 0.1).toFixed(2) : 0;
    };

    // Function to update earnings display
    const updateEarningsDisplay = () => {
        earningsList.innerHTML = '';
        
        accounts.forEach(account => {
            const earnings = calculatePersonEarnings(account.id);
            const tithing = calculateTithing(earnings);
            const finalAmount = (earnings - tithing).toFixed(2);
            
            const row = document.createElement('div');
            row.className = 'earnings-row';
            
            row.innerHTML = `
                <div class="earnings-cell person">${account.name}</div>
                <div class="earnings-cell earnings">$${earnings.toFixed(2)}</div>
                <div class="earnings-cell tithing">$${tithing}</div>
                <div class="earnings-cell final">$${finalAmount}</div>
            `;
            
            earningsList.appendChild(row);
        });

        // Show the earnings container
        earningsContainer.style.display = 'block';
    };

    // Function to create a weekly chore element
    const createWeeklyChoreElement = (chore) => {
        const row = document.createElement('div');
        row.className = 'grid-row';
        
        // Chore name and points cell
        const choreCell = document.createElement('div');
        choreCell.className = 'grid-cell chore-column';
        choreCell.innerHTML = `${chore.text} <span class="points-badge">$${chore.points}</span>`;
        row.appendChild(choreCell);
        
        // Assignment cell
        const assignedCell = document.createElement('div');
        assignedCell.className = 'grid-cell assigned-column';
        const assignSelect = document.createElement('select');
        assignSelect.className = 'assign-select';
        
        // Add empty option
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'Unassigned';
        assignSelect.appendChild(emptyOption);
        
        // Add account options
        accounts.forEach(account => {
            const option = document.createElement('option');
            option.value = account.id;
            option.textContent = account.name;
            if (choreAssignments[chore.id] === account.id) {
                option.selected = true;
            }
            assignSelect.appendChild(option);
        });
        
        assignSelect.addEventListener('change', (e) => {
            const newAssignment = e.target.value ? parseInt(e.target.value) : null;
            choreAssignments[chore.id] = newAssignment;
            saveData();
        });
        
        assignedCell.appendChild(assignSelect);
        row.appendChild(assignedCell);
        
        // Add cells for each day of the week
        ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].forEach(day => {
            const cell = document.createElement('div');
            cell.className = 'grid-cell day-cell';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'day-checkbox';
            
            // Initialize completion data for this day/chore if it doesn't exist
            if (!completionData[day]) {
                completionData[day] = {};
            }
            if (completionData[day][chore.id] === undefined) {
                completionData[day][chore.id] = false;
            }
            
            // Set checkbox state from completion data
            checkbox.checked = completionData[day][chore.id];
            
            checkbox.addEventListener('change', (e) => {
                completionData[day][chore.id] = e.target.checked;
                saveData();
            });
            
            cell.appendChild(checkbox);
            row.appendChild(cell);
        });
        
        return row;
    };

    // Function to render weekly chores
    const renderWeeklyChores = () => {
        weeklyChoresList.innerHTML = '';
        
        if (chores.length === 0) {
            const emptyRow = document.createElement('div');
            emptyRow.className = 'grid-row';
            emptyRow.innerHTML = '<div class="grid-cell" style="grid-column: 1 / -1; text-align: center;">No chores added yet. Add chores from the Chores page.</div>';
            weeklyChoresList.appendChild(emptyRow);
        } else {
            chores.forEach(chore => {
                weeklyChoresList.appendChild(createWeeklyChoreElement(chore));
            });
        }
    };

    // Function to reset all data
    const resetAllData = () => {
        if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    // Add event listeners
    resetButton.addEventListener('click', resetAllData);
    calculateButton.addEventListener('click', updateEarningsDisplay);

    // Initial render
    renderWeeklyChores();
    // Hide earnings container initially
    earningsContainer.style.display = 'none';
}); 