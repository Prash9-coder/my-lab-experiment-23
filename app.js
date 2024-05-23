const express = require('express');
const axios = require('axios');
const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define the root route
app.get('/', async (req, res) => {
    try {
        // Make a request to the live API
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const data = response.data;

        // Render the index page with the fetched data
        res.render('index', { posts: data });
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).send('Error fetching data from API');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
