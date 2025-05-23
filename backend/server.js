const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Generate 10,000 users with extra data
const users = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,  // Username (shown in grid)
  email: `user${i + 1}@example.com`,
  phone: `+44 7000 ${1000 + i}`,
  address: `Street ${i + 1}, City, Country`,
  company: `Company ${i % 50}`,
  jobTitle: `Software Engineer ${i % 10}`,
  salary: `${50000 + (i % 10000)}`,
  createdAt: new Date(2023, i % 12, (i % 28) + 1).toISOString(),
  lastLogin: new Date(2024, i % 12, (i % 28) + 1).toISOString()
}));

// API for paginated user data with search functionality
app.get('/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const searchQuery = req.query.search ? req.query.search.toLowerCase() : '';

  // Filter users based on search query
  let filteredUsers = users;
  if (searchQuery) {
    filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery) ||
      user.company.toLowerCase().includes(searchQuery)
    );
  }

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;

  res.json({
    records: filteredUsers.slice(startIndex, endIndex),
    total: filteredUsers.length
  });
});

app.listen(3000, () => console.log('Backend server running on port 3000'));
