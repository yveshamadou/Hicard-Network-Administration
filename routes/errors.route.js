const createError = require('http-errors')
const express = require('express')

const app = express()

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.send('error')
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json('Something broke!')
    res.status(500).render('errors/500')
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    /* next(createError(404)) */
    res.render('errors/404', {
        page: "errors/404",
        errors : {code : "404", description : "Contact your Administation"}
    })
});

module.exports = app