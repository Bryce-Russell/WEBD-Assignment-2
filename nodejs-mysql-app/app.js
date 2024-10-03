const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// MYSQL Database conection infomation
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpassword',
  database: 'webapp',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Route to display data, also displays any errors with database
app.get('/', (req, res) => {
  let searchQuery = req.query.search || '';
  let sql = `SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?`;
  connection.query(sql, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
    if (err) {
      return res.status(500).send('Error Can NOt Find Database.');
    }

    // My Basic HTML Table Generation
    let html = '<table border="1"><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Age</th><th>City</th></tr>';
    results.forEach(user => {
      html += `<tr>
        <td>${user.id}</td>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.city}</td>
      </tr>`;
    });
    html += '</table>';
    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
