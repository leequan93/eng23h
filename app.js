// dotenv
require('dotenv').config();

const express = require('express');
const app = express();

// use static
app.use('/public', express.static('public'))

// use session
const session = require('express-session');
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: true,
    saveUninitialized: true
}));

// connect DB
const db = require('./configs/db');
db.connect();

// body parser
app.use(express.json());

// use templdate
const expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.use(expressLayouts);

// init router
const indexRouter = require('./routers/indexRouter');
const adminRouter = require('./routers/adminRouter');
const lessonRouter = require('./routers/lessonRouter');

app.use('/', indexRouter);
app.use('/api/admin', adminRouter);
app.use('/api/lesson', lessonRouter);

// init error handler
const { errorHandler } = require('./middlewares/errorHandler');
app.use(errorHandler);

app.use((req, res, next) => {
    res.status(404).render('404');
});

// listen port
app.listen(process.env.APP_PORT, () => {
    console.log(`App running on port ${process.env.APP_PORT} !!!`);
});
