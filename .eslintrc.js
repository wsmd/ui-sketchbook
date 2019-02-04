module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',

  env: {
    browser: true
  },

  rules: {
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/destructuring-assignment': 'off'
  }
};
