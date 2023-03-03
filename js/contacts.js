const contacts = [];

// Helper function to render the contact list
function renderContacts() {
  const tbody = document.getElementById("contact-list-body");
  // Clear the table body first
  tbody.innerHTML = "";
  // Sort the contacts by name in ascending order
  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  // Loop through the sorted contacts and add them to the table
  sortedContacts.forEach(contact => {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    const lastNameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const phoneTd = document.createElement("td");
    const deleteTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    nameTd.innerText = contact.name;
    lastNameTd.innerText = contact.lastName;
    emailTd.innerText = contact.email;
    phoneTd.innerText = contact.phone;
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      // Remove the contact from the array
      const index = contacts.indexOf(contact);
      if (index !== -1) {
        contacts.splice(index, 1);
        // Re-render the contact list
        renderContacts();
      }
    });
    deleteTd.appendChild(deleteBtn);
    tr.appendChild(nameTd);
    tr.appendChild(lastNameTd);
    tr.appendChild(emailTd);
    tr.appendChild(phoneTd);
    tr.appendChild(deleteTd);
    tbody.appendChild(tr);
  });
}

// Helper function to add a contact
function addContact(name, lastName, email, phone) {
  const contact = { name, lastName, email, phone };
  contacts.push(contact);
  // Clear the input fields
  document.getElementById("name-input").value = "";
  document.getElementById("last-name-input").value = "";
  document.getElementById("email-input").value = "";
  document.getElementById("phone-input").value = "";
  // Re-render the contact list
  renderContacts();
}

// Add event listener for the "Add Contact" button
document.getElementById("add-contact-btn").addEventListener("click", () => {
  const name = document.getElementById("name-input").value.trim();
  const lastName = document.getElementById("last-name-input").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const phone = document.getElementById("phone-input").value.trim();
  if (name && lastName && email && phone) {
    addContact(name, lastName, email, phone);
  }
});

// Add event listener for the search bar input
document.getElementById("search-input").addEventListener("input", () => {
  const searchQuery = document.getElementById("search-input").value.trim().toLowerCase();
  const filteredContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(searchQuery) ||
      contact.lastName.toLowerCase().includes(searchQuery) ||
      contact.email.toLowerCase().includes(searchQuery) ||
      contact.phone.toLowerCase().includes(searchQuery)
    );
  });
  // Re-render the contact list with the filtered contacts
  const tbody = document.getElementById("contact-list-body");
  // Clear the table body first
  tbody.innerHTML = "";
  // Loop through the filtered contacts and add them to the table
  filteredContacts.forEach(contact => {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    const lastNameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const phoneTd = document.createElement("td");
    const deleteTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    nameTd.innerText = contact.name;
    lastNameTd.innerText = contact.lastName;
    emailTd.innerText = contact.email;
    phoneTd.innerText = contact.phone;
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      // Remove the contact from the array
      const index = contacts.indexOf(contact);
      if (index !== -1) {
        contacts.splice(index, 1);
        // Re-render the contact list
        renderContacts();
      }
    });
    deleteTd.appendChild(deleteBtn);
    tr.appendChild(nameTd);
    tr.appendChild(lastNameTd);
    tr.appendChild(emailTd);
    tr.appendChild(phoneTd);
    tr.appendChild(deleteTd);
    tbody.appendChild(tr);
  });
});

// Render the initial contact list
renderContacts();

