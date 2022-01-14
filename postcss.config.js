module.exports = {
    plugins: [
        require('autoprefixer'),
        // require('mqpacker'),
        require('postcss-filter-gradient'),
        require('cssnano')({
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true,
                    }
                }
            ]
        })
    ]
};
