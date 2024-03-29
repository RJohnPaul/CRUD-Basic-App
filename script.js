// Function to show alert
function showAlert(message, classname) {
    const div = document.createElement('div');
    div.className = `alert alert-${classname}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const main = document.querySelector('.main');
    container.insertBefore(div, main);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 2000);
}

// Event listener for delete button
document.querySelector('#student-list').addEventListener('click', function(e){
    const target = e.target;
    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove();
        showAlert('Student Removed', 'danger');
    }
    e.preventDefault();
});

// Event listener for form submission
document.getElementById('student-form').addEventListener('submit', function(e){
    // Prevent default form submission behavior
    e.preventDefault();

    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const rollNo = document.getElementById('rollNo').value;

    // Validate form input
    if(firstName === '' || lastName === '' || rollNo === '') {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    // Create new table row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${rollNo}</td>
        <td>
            <button class="btn btn-warning btn-sm edit">Edit</button>
            <button class="btn btn-danger btn-sm delete">Delete</button>
        </td>
    `;

    // Append new row to table
    document.getElementById('student-list').appendChild(newRow);

    // Show success message
    showAlert('Student Added', 'success');

    // Reset form
    document.getElementById('student-form').reset();
});

// Event listener for edit button
document.querySelector('#student-list').addEventListener('click', function(e){
    const target = e.target;
    if (target.classList.contains('edit')) {
        // Get the row to edit
        const row = target.closest('tr');

        // Get the student details from the row
        const firstName = row.cells[0].textContent;
        const lastName = row.cells[1].textContent;
        const rollNo = row.cells[2].textContent;

        // Set the form values to the student details
        document.getElementById('firstName').value = firstName;
        document.getElementById('lastName').value = lastName;
        document.getElementById('rollNo').value = rollNo;

        // Remove the row from the table
        row.remove();

        // Show success message
        showAlert('You can now edit the student details', 'info');
    }
    e.preventDefault();
});
