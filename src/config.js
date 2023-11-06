const dev = process.env.NODE_ENV === 'development';

module.exports = {
    baseURL: dev ? '' : '/projects/flip-me',
    publicPath: dev ? './' : '/flip-me'
};