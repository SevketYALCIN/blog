---
title: "Setup your own Webpack 4 config for React with Typescript"
date: "2018-07-31"
tags: ["Webpack", "React", "Typescript"]
---

Webpack has become one of the most important tools for modern web development and yet, it is a blackbox to many developers. In this tutorial, we are going to setup our own basic Webpack 4 configuration from scratch for React with Typescript.

If you just want to try something or build a simple side project, you should use the `create-react-app` with [Typescript](https://github.com/wmonk/create-react-app-typescript "create-react-app-typescript's Github"). There is no configuration needed, you can focus on coding.

## Webpack's core concepts 

> At its core, Webpack is a static module bundler for modern JavaScript applications. When Webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

-- _[Webpack's documentation](https://webpack.js.org/concepts/ "Webpack's documentation")_

To get started with Webpack, we only need to understand the following core concepts: 
- Entry 
- Output 
- Loaders 
- Plugins 

The **entry** is which file, or module, should Webpack use to start resolving the dependencies. The default value in Webpack 4 is `./src/index.js` .

The **output** property tells Webpack how to name the bundle files and where it should output them. The default value in Webpack 4 is the `./dist` folder.  

The **loaders** allow Webpack to process different types of imported files other than Javascript. Without loaders, Webpack only knows how to process Javascript files. Loaders allow you to create rules in your configuration file telling webpack to use a specific loader when it encounters a specific type of file. 

**Plugins** allow you to extend Webpack's capabilities like: bundle optimization, assets management, etc. There are many [plugins that Webpack provides out-of-box.](https://webpack.js.org/plugins/ "Webpack's plugins list") 

Now that you know the basics, let's install and configure Webpack. 

## Installing Webpack 

First, let's create a new project folder and initialize it:
```bash 
mkdir react-typescript-webpack-tutorial 
cd react-typescript-webpack-tutorial 
npm init –y   #-y skips all the questions 
``` 

Let's now install Webpack and the Webpack CLI as dev-dependencies:
```bash 
#yarn 
yarn add webpack webpack-cli --dev 

#npm 
npm i webpack webpack-cli --save-dev 
``` 

Webpack 4 has two modes: `development` and `production`. The bundle will be minimized on `production` mode only. 

Let's add two npm scripts to our `package.json` to run Webpack:

```js 
"scripts": { 
  "start": "webpack --mode development", 
  "build": "webpack --mode production" 
}
``` 

If we create an `index.js` file inside an `src` folder (default entry point in Webpack 4), we can run Webpack **without any configuration**.

Let's create the `src/index.js` file with dummy code:
```js
console.log('hello')
```
And then run `npm start` to generate our Javascript bundle file named `main.js` inside the `dist` folder.

## Configuring Webpack 

Let's configure Webpack to better fit our needs. 

First, we need to create Webpack's configuration file named `webpack.config.js` in the root of our project. The basic configuration looks like this: 
```js 
const path = require("path")

module.exports = { 
  entry: "./src/index.js",   // entry point 
  output: { 
    path: path.join(__dirname, "/dist"),  // bundle output path 
    filename: "index_bundle.js"           // bundle name 
  } 
}
``` 
- We specified `src/index.js` as the entry point
- We told Webpack to output the bundle into the `dist` folder with the name `index_bundle.js`

Next, let's add Typescript.

## Adding Typescript

First, we need to install the dependencies:

```bash
#yarn
yarn add typescript awesome-typescript-loader --dev

#npm
npm i --save-dev typescript awesome-typescript-loader
```

`awesome-typescript-loader` will help Webpack compile our Typescript codeand generate sourcemaps.

### Adding a Typescript configuration file

Now we need to create a `tsconfig.json` file at the root of our project, which will contain all the compilation settings:

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react"
  },
  "include": [
    "./src/**/*"
  ]
}
```

You can learn more about the `tsconfig.json` file [here](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html "Typescript's tsconfig.json documentation")

### Configuring Webpack for Typescript

We need to tell Webpack to use our `awesome-typescript-loader` for Typescript files.
Let's update our `webpack.config.js` file, explanations are in comments:

```js
const path = require("path")

module.exports = {
  // Changed the entry point to a .tsx file
  entry: "./src/index.tsx",
  // Enable sourcemaps for debugging Webpack's output
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { 
        test: /\.tsx?$/, 
        loader: "awesome-typescript-loader" 
      }
    ]
  }
}
```

### Testing the configuration

To test our configuration, we first need to change the extension of our `index.js` file to `index.tsx` and then add simple Typescript code inside it:

```jsx
type Message = {
  body: string,
  from: string
}

let message: Message;
message.from = 'Max';
message.body = 'Hi!'

console.log(`New message from ${message.from}: ${message.body}`)
```

If we run `npm start`, you will see in the `dist` folder that Webpack transformed our Typescript code and also generated a sourcemap file. 

## Adding React

Let’s now add React and ReactDOM, along with their declaration files, as dependencies:

```bash
# yarn
yarn add react react-dom @types/react @types/react-dom

# npm
npm i react react-dom @types/react @types/react-dom
```

And create a simple `Message.tsx` React component in the `src/components` folder:

```tsx
import * as React from 'react'

class Message extends React.Component<MessageProps> {
  render() {
    return (
      <div>
        {`You got a new message from ${this.props.from}: ${this.props.body}`}
      </div>
    )
  }
}

interface MessageProps {
  body: string
  from: string
}

export default Message
```

And modify the `index.tsx` file to import React and ReactDOM and make it render our new `Message` component:

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";

import Message from "./components/Message";

ReactDOM.render(
    <Message from='Max' body='Hi !' />,
    document.getElementById("root")
);
```
Now if we run `npm start`, Webpack should be able to tranform and bundle our React code!

## Adding HTML 

I voluntarily didn't create an HTML file yet, because we are going to use a Webpack plugin called `html-webpack-plugin` for that. This plugin will generate an HTML file using a template that we are going to give him, and automatically include our Webpack bundles inside the body:

```bash 
# yarn 
yarn add html-webpack-plugin --dev 

# npm 
npm i --save-dev html-webpack-plugin 
``` 

After having installed the plugin, we need to add it to our Webpack config's plugins section: 

```js
const path = require("path") 

// Require the new plugin
const HtmlWebpackPlugin = require("html-webpack-plugin") 

module.exports = { 
  entry: "./src/index.tsx",
  devtool: "source-map",
  resolve: { 
    extensions: [".ts", ".tsx", ".js", ".json"] 
  }, 
  output: { 
    path: path.join(__dirname, "/dist"), 
    filename: "index_bundle.js" 
  }, 
  module: { 
    rules: [ 
      {  
        test: /\.tsx?$/,  
        loader: "awesome-typescript-loader"  
      }, 
      {  
        enforce: "pre",  
        test: /\.js$/,  
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"  // Specify the HTML template to use
    })
  ]
}
```

Now let's create a simple `index.html` template in the `src` folder: 

```html 
<!DOCTYPE html> 
<html lang="en"> 
  <head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
    <title>TypeScript + React</title> 
  </head> 
  <body> 
    <div id="root"> 

    </div>
  </body>
</html>
``` 

Running `npm start` will now generate our Javascript bundle and an HTML file with our bundle already included with a script tag inside the body.

## Setting up a development server 

Finally, we are going to setup a development server that will provide us **live reloading** using the `webpack-dev-server` module. 

First, we need to install the module:
```bash
# yarn 
yarn add webpack-dev-server --dev 

# npm 
npm i webpack-dev-server --save-dev 
``` 
And then change the `start` script in our `package.json` file to: 

```js 
"scripts": { 
  "start": "webpack-dev-server --mode development --open --hot", 
  "build": "webpack --mode production" 
}
``` 

We are telling Webpack DevServer to run on development mode while watching for changes.
- The `--hot` option enables Webpack's **Hot Module Replacement**. 
- The `--open` option will open our default browser when we run `npm start`. 

For more options, check out the [DevServer section in the Webpack documentation](https://webpack.js.org/configuration/dev-server/ "Webpack documentation's DevServer section") 

## Conclusion

We can now run `npm start` to start a development server with hot reloading and `npm build` to have a minimized bundle for production.  

This is only a basic configuration of Webpack for a React project in Typescript. This article is already long so I didn't add other features, but you should definitely push it further by adding other loaders, plugins and optimizing the configuration.

_If you have any question or suggestion, please leave a comment below._
