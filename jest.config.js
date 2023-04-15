module.exports = {
    preset: 'jest-preset-gatsby',
    transform: {
      '^.+\\.jsx?$': '<rootDir>/src/jest-preprocess.js',
    },
    moduleNameMapper: {
      '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
      '.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/file-mock.js',
    },
    testPathIgnorePatterns: ['node_modules', '.cache'],
    transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
    globals: {
      __PATH_PREFIX__: '',
    },
    testEnvironmentOptions: {
        url: 'http://localhost',
      },
    plugins: [
        'gatsby',
        `gatsby-plugin-testing`
    ],
  };
  