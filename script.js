const searchBtn = document.getElementById("search-btn");
const userDiv = document.getElementById("user");

// Fetch all users once
let allUsers = [];

async function fetchUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    allUsers = await res.json();
  } catch (error) {
    userDiv.innerHTML = `<p style="color: red;">⚠️ Failed to load users. Try again later.</p>`;
    console.error("Error fetching users:", error);
  }
}

// Display a random user
function showRandomUser() {
  if (allUsers.length === 0) return;

  const user = allUsers[Math.floor(Math.random() * allUsers.length)];

  userDiv.innerHTML = `
    <h2>${user.name}</h2>
    <p><span>Username:</span> ${user.username}</p>
    <p><span>Email:</span> ${user.email}</p>
    <p><span>Phone:</span> ${user.phone}</p>
    <p><span>Website:</span> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
    <p><span>Company:</span> ${user.company.name}</p>
    <p><span>Catchphrase:</span> "${user.company.catchPhrase}"</p>
    <p><span>Address:</span> ${user.address.street}, ${user.address.suite}, ${user.address.city} (${user.address.zipcode})</p>
  `;

  userDiv.style.display = "block";
}

// Load users and enable button
window.addEventListener("DOMContentLoaded", async () => {
  await fetchUsers();
  searchBtn.disabled = false;
});

searchBtn.addEventListener("click", showRandomUser);
