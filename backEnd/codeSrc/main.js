const express= require('express');
const db= require('../db/createdb.js');
const path= require("path")
const morgan= require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "/public")));


app.use('/api', require('./api.js'))


const PORT= process.env.PORT || 3330;
const init = async function() {
    await db.Users.sync()
    app.listen(PORT, function() {
      console.log(`Server is listening on port ${PORT}!`);
    });
}
  
  init();