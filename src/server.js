const express = require('express');
const cors = require('cors');
const postRouter = require('./routers/posts.js');
const todoRouter = require('./routers/todos.js');
const requestLogger = require('./middleware/request-logger.js');
const errorHandler = require('./middleware/error-handler.js');

const app = express();

//app.use(cors());
//app.options('*', cors());
console.log("Please work");
app.use(requestLogger);
app.use(express.static('dist', {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, s-maxage=86400');
    }
}));
app.use('/api', postRouter);
app.use('/api', todoRouter);
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port = 8080;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
