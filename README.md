# Deluxely
Deluxely is a social community dedicated to connecting audiences with the content they love to consume. Deluxely produces engaging stories and videos on a range of topics designed to inspire, entertain and inform our readers.

## Usage
### Prerequisites
You need to have the latest versions of [Hugo](https://gohugo.io/getting-started/installing/) and [npm](https://docs.npmjs.com/getting-started/what-is-npm) installed.
Next, clone repository and on the root project directory run:
`npm install`

### Development
Running the local server can be done one of two ways:
  * Run `gulp watch` on one terminal window and `hugo server` on another. The former watched the changes done to critical CSS files. The latter runs a local server with live reload for the site itself.

  * Run `npm start`. This runs gulp and hugo concurrently achieving the same result as the first option.

The project should be available on `localhost:3000` from your browser.

## Structure
```
|--assets           // Files that will pass through the asset pipeline
|  |--icons         // Icons files in the root of this folder will be minified, fingerprinted, and end up in /icons/...
|  |--img      	    // Image files in the root of this folder will be minified, fingerprinted, and end up in /img/...
|  |--js      	    // JS files in the root of this folder will be optimized, fingerprinted, and  end up in /js/...
|  |--scss          // Sass files in the root of this folder will be compiled, minified, fingerprinted, and end up in /scss/...
|--content          // Pages and collections
|  |--articles      // Article/Posts
|--layouts          // This is where all templates go
|  |--_default      // This is where base templates and blocks live
|  |--partials      // This is where includes live
|  |--shortcodes    // This is where shortcodes live
|  |--index.html    // The index page
|--static     	    // Files in here end up in the public folder
```

## Version Control
All changes under development are hosted on the **staging** branch which is viewable via staging.deluxely.co.

Once a new version of the site is approve, these change can then be merge into the master branch.