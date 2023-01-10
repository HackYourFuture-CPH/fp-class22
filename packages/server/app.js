const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const router = require('./api/routes/index');
const HttpError = require('./api/lib/utils/http-error');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`/api/`, router);

app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.httpStatus).json({ error: err.message });
  } else {
    next(err);
  }
});

module.exports = app;
