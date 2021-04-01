# Udemy Course on React Testing with Jest and Enzyme

## Installation:

### Enzyme

```bash
npm i enzyme --save-dev
```


### Enzyme Adapter

This is the unofficial Enzyme Adapter for React 17.

```bash
npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 enzyme
```

If you have React 16 or lower, then you can use

```bash
npm i enzyme-adapter-react-16 enzyme
```

### Prop Types

Prop Types

```bash
npm install prop-types --save
```

Check Prop Types

https://www.npmjs.com/package/check-prop-types

```bash
npm install check-prop-types --save
```

## Removing Data Test Attribute in Production Code

1. Install

```bash
npm i --save-dev babel-plugin-react-remove-properties
```

2. Eject from Create React App

Takes config files and make them editable

```bash
npm run eject
```

3. Past in package.json

```json
"env": {
    "production": {
        "plugins": [
            ["react-remove-properties", {"properties": ["data-test"]}]
        ]
    }
},
```

4. Create production build

```bash
npm run build
```

5. Static Server

```bash
npm install -g serve
```

6. Serve production build

```bash
serve -s build
```

## Docs

https://enzymejs.github.io/enzyme/docs/api/

https://jestjs.io/docs/expect

https://www.npmjs.com/package/babel-plugin-react-remove-properties