const path = require('path');

module.exports = {
    entry: {
        main: ['./public/js/RecommendedProductComponent.js', 
                  './public/js/ProductComponent.js',
                  './public/js/mainCartComponent.js',
                  './public/js/ErrorComp.js',
                  './public/js/FilterComp.js',
                  './public/js/CatalogComponent.js',
                  './public/js/CartComponent.js',
                  './public/js/main.js'
                ]
    },

    output:{
        path:path.resolve(__dirname,'public'),
        filename:'dist/[name].js',
    },
}