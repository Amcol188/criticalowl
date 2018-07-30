# Deluxely
Deluxely is a social community dedicated to connecting audiences with the content they love to consume. Deluxely produces engaging stories and videos on a range of topics designed to inspire, entertain and inform our readers.

## Setup
The website is built using Hugo and Gulp. Hugo builts the static site, while Gulp compiles, prefixes, minifies, and creates the HTML partial use for the critical CSS.

Hugo uses the latest Pipes feature for assets pipeline. This allows for native SCSS compiling, minification, and fingerprinting. For that, make sure to have version 0.43+ installed.

## Getting Started
1. Clone repository.
2. Install Hugo, npm, and Gulp.
3. Once installed, run `npm install` on the root project directory to install dependencies.
4. Running the local server can be done one of two ways:
  * Run `gulp watch` on one terminal window and `hugo server` on another. The former watched the changes done to critical css files. The latter runs a local server with live reload for the site itself.
  * Run `npm start`. This runs gulp and hugo concurrently achieving the same result at the first option.