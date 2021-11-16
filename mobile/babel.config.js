module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@screens': './src/screens/',
            '@assets': './assets/',
            '@components': './src/components/',
            '@styles': './src/styles/',
            '@context': './src/context/',
            '@hook': './src/hook/',
            '@routes': './src/routes/',
            '@api': './src/services/api.js',
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: [],
      },
    },
  };
};
