const path = require('path');
//const target = 'https://dev.w26.exolog.net/'
//const target = 'https://zonweringstunter.w26.exolog.net/'
//const target = 'https://latenzo.w26.exolog.net/'
//const target = 'https://route.w28.exolog.net/'
//const target = 'https://route.d02.fidela.net/'
//const target = 'https://blauwhuis.w26.exolog.net/'

// Local development target - connect to your Docker setup
const target = 'https://anastaciatolstonog.com'  // Your nginx container

module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,
    publicPath: '/exo_admin',
    outputDir: '../../../homepages.webkracht.nl/htdocs/exo_admin/',
    productionSourceMap: true,
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/api/*': {
                //server should be in testmode
                target,
                secure: false,
                cookieDomainRewrite: ""
            },
            '/redir/*': {
                target,
                secure: false,
                cookieDomainRewrite: ""
            },
            '/utils/*': {
                target,
                secure: false,
                cookieDomainRewrite: ""
            },
            /*'/js/!*': {
                target,
                secure: false,
                cookieDomainRewrite: ""
            },
            '/css/!*': {
                target,
                secure: false,
                cookieDomainRewrite: ""
            },*/
            /*'/file/!*': {
                target,
                secure: false,
                cookieDomainRewrite: ""
            },*/
            '/media/*': {
                target,
                secure: false,
                cookieDomainRewrite: ""
            }
        }

    },
    configureWebpack: {
        resolve: {
            alias: {
                //share between projects (dealer|exo_admin)
                '@modules': path.resolve(__dirname, './modules'),
                '@': path.resolve(__dirname, './src'),
            }
        },
        // Optimization for faster builds
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    }
                }
            }
        },
        // Suppress warnings for faster builds
        stats: {
            warnings: false
        }
    },
    css: {
        loaderOptions: {
            sass: {
                //additionalData: `@import "~@/variables.sass"`
            },

            scss: {
                sassOptions: {
                    quietDeps: true,
                    // Suppress deprecation warnings for faster builds
                    silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'slash-div'],
                    logger: {
                        warn: function() {} // Suppress all warnings
                    }
                },
                //additionalData: `@import "~@/variables.scss";`
            },
        }
    }
};
