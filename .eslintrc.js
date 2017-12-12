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
    "extends": [
        "eslint:recommended", 
        "plugin:react/recommended"
    ],
    // "extends": "airbnb-base",      
    "rules": {
        "semi": [2, "never"],
        "linebreak-style": ["error", "windows"],
        // "indent": [2, 4],
        "eol-last": ["error", "never"],
        "function-paren-newline": ["error", "never"],
        "no-use-before-define": ["error", {
            "functions": false,
            "classes": true
        }]
    }
}