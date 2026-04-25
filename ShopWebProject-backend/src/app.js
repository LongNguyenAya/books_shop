require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const route = require('./routes');

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:5173'
}));

// http logger
app.use(morgan('combined'));

app.use(express.json());

route(app);

app.listen(port, () => {
  console.log(`Shop Web app listening on port ${port}`);
})