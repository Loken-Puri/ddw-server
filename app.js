require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const { isAuthenticated } = require("./middleware/jwt.middleware"); 


// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const authRouter = require('./routes/auth.routes')
app.use('/auth', authRouter)

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);
   
const commentsRouter = require('./routes/comments.routes')
app.use('/comments', isAuthenticated, commentsRouter)

const experiencesRouter = require('./routes/experiences.routes')
app.use('/experiences', isAuthenticated, experiencesRouter)

require("./error-handling")(app);

module.exports = app;