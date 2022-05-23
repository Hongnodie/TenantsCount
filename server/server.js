const express = require('./config/express.js')
 
// Use env port or the self-defined by-default one: 5000
const port = process.env.PORT || 5000;

const app = express.init()
app.listen(port, () => console.log(`Server now running on port ${port}!\n Access at http://localhost:${port}`));
