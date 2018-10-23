module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["@meteorjs/eslint-config-meteor", "eslint:recommended", "plugin:react/recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "warn",
            2
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "semi": [
            "warn",
            "never"
        ],
        "no-console": 0,
        "react/sort-comp": 0,
        "react/jsx-props-no-multi-spaces": 0,
    }
};
