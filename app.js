require('dotenv').config()
const express = require("express");
var cors = require('cors')

const app = express();
const port = process.env.PORT;
const morgan = require('morgan');
require('./models/index')

app.use(cors())

// ApplicationBased middlware
app.use(express.json());
app.use(morgan('dev'))


// userRoutes
const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);


// questions Routes
const CategoriesRoutes = require('./routes/categories.routes');
app.use('/api/questions', CategoriesRoutes)

//Answer Routes
const answerRoutes = require('./routes/answer.routes');
app.use('/api/answers',answerRoutes)

app.get("/", (req, res) => res.send("Hello World!"));


// server listen
app.listen(port, () => console.log(`Example app listening on port ${port}`));
