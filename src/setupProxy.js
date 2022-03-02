const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
//     app.use(
//         createProxyMiddleware(
//         '/cartography', {
//             target: 'http://localhost:9000',
//             changeOrigin: true,
//         })
//     );
    app.use(
        createProxyMiddleware('/auth',{
            target: 'https://test3.agrosignal.com',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/fieldTree',{
            target: 'https://test3.agrosignal.com',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/unitTree',{
            target: 'https://test3.agrosignal.com',
            changeOrigin: true,
        })
    );
    
    //================================================================>
    // app.use(
    //     createProxyMiddleware(
    //         '/cartography', {
    //             target: 'https://cartography-test.infobis.ru',
    //             changeOrigin: true,
    //         })
    // );
    // app.use(
    //     createProxyMiddleware('/auth',{
    //         target: 'https://test17.agrosignal.com',
    //         changeOrigin: true,
    //     })
    // )
    // app.use(createProxyMiddleware('/storage',{
    //         target: 'https://filestorage.infobis.ru',
    //         changeOrigin: true,
    //     })
    // );
};