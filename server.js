const express = require('express');
const mysql = require('mysql2');
const app = express();

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'david.oladepo.me@gmail.com',
    password: "G!r?i'3JD.P?P5a",
    database: 'bincomphptest'
})

//  Connect to the database
connection.connect(err => {
   if(err){
     console.error('Error connecting to database');
     return;
   } 
   console.log('Connected to database');
});


// Define route to display individual polling unit\
app.get('/polling-unit/:id', (req, res) => {
    const pollingUnitId = req.params.id;
    const sql = 'SELECT * FROM agentname WHERE pollingunit_uniqueid = ?';

    connection.query(sql, [pollingUnitId], (err, results) => {
       if(err) {
         console.error('Error querying database: ' + err.stack);
         return res.status(500).send('Internal Server error')
       } 
       if (results.length === 0){
         return res.status(404).send('Polling unit not found');
       }

       // Render a web page to display the polling unit details
        res.render('polling_unit', { pollingUnit: results[0] });
     });
   });

   // Set the view engine and directory for views
   app.set('view engine', 'ejs');
   app.set('views', __dirname + '/views');
   
   
   // Start the server
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
   })
























