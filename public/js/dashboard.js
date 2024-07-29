document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/students')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#student-table tbody');
        data.forEach(student => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td>
              <button  onclick="editStudent(${student.id})">Edit</button>
              <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      });
  });
  
  function showAddStudentForm() {
    document.getElementById('student-form').style.display = 'block';
  }
  
  document.getElementById('add-student-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('student-name').value;
    const age = document.getElementById('student-age').value;
    const email = document.getElementById('student-email').value;
  
    fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, age, email })
    }).then(response => response.json())
      .then(student => {
        // Append new student to table
        const tableBody = document.querySelector('#student-table tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.email}</td>
          <td>
            <button onclick="editStudent(${student.id})">Edit</button>
            <button onclick="deleteStudent(${student.id})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
  });
  
  function editStudent(id) {
    // Implement edit functionality
  }
  
  function deleteStudent(id) {
    fetch(`/api/students/${id}`, {
      method: 'DELETE'
    }).then(() => {
      // Remove student from table
      document.querySelector(`#student-table tr[data-id="${id}"]`).remove();
    });
  }
  