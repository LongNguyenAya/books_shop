const homeRouter = require('./home');
const categoriesRouter = require('./categories');
const productsRouter = require('./products');
const cartsRouter = require('./carts');
const ordersRouter = require('./orders');
const usersRouter = require('./users');
const contactRequestsRouter = require('./contact-requests');

const authRouter = require('./auth');
const { authenticate, authorize, optionalAuthenticate } = require('../app/middlewares/AuthMiddleware');

function route(app) {
    app.use('/', homeRouter);

    app.use('/api/categories', categoriesRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/admin/carts', authenticate, authorize('admin'), cartsRouter);
    app.use('/api/cart', cartsRouter);
    app.use('/api/orders', ordersRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/contact-requests', optionalAuthenticate, contactRequestsRouter);
}

module.exports = route;
