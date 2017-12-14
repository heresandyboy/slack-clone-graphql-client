module.exports = {
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "es6":     true,
        "browser": true,
        "node":    true,
        "mocha":   true
    },
    "parser": "babel-eslint",
    "extends": [
        "airbnb-base",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "react/display-name": 0,
        "react/jsx-uses-vars": [2],
        "semi": [2, "never"],
        "linebreak-style": ["error", "windows"],
        // "indent": [2, 4],
        "eol-last": ["error", "never"],
        // "function-paren-newline": ["error", "multiline"],
        "no-use-before-define": ["error", {
            "functions": false,
            "classes": true
        }]
    }
}