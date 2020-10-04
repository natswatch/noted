const express = require('express');
const { notes } = require('./db/db');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//middleware functions
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})