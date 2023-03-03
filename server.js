const express = require("express");
const { urlencoded } = require("body-parser");
const apiRoutes = require('./Develop/routes/api.js');
const htmlRoutes = require('./Develop/routes/htmlRoutes.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("Develop/public"));
app.use('/api/notes', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
