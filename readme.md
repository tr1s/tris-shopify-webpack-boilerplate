# tris-shopify-webpack-boilerplate

This boilerplate is great for working with Shopify from scratch as well as migrating existing Shopify themes and building overtop of them. It uses Webpack 4 to bundle all your js and compile your styles into Shopify's assets folder.

The idea of this boilerplate is to get you started developing on Shopify's platform with minimal effort while reducing the amount of http requests your store sends off. We'll achieve this by bundling all of our scripts/styles into 1 file each.

## Usage

Use [Themekit](https://shopify.github.io/themekit/) to pull down a theme from Shopify and then...

* `npm install`
* `theme watch` Themekit watches all your files and then uploads them to your store upon any changes
* `npm run watch` will watch for changes and then bundle both the scripts and styles into shopify assets folder
* `npm run watchall` will do the above two tasks combined in one terminal window
* `npm run build` will bundle and uglify your scripts but the styles will still stay unoptimized for Shopify to handle

## Caveats

* You cannot use liquid syntax inside of your src/ `.scss`/`.js` files nor will Webpack compile `.scss.liquid`/`.js.liquid` files, so do not rename them to that. You can however get away with some liquid syntax, for example use `background-image: url( "{{ '../path/to/assets/img.jpg' | asset_url }}" )` for retrieving and using assets. The quotes arround the liquid tags allow this to work.

If you need more complicated liquid syntaxing in your project then insert it via scss `{% stylesheets %}` and js `{% scripts %}` at the end of your sections.

* The npm plugin for Webpack `optimize-css-assets-webpack-plugin` does not work in this case because it will not optimize `.scss` nor `.scss.liquid` files into css. That's why we can't do things like minification. Rest assured though that Webpack is handling the autoprefixing and Shopify will handle the rest of the optimizing of the `.scss.liquid` file in your assets folder.

## Dealing with a Shopify Theme's core JS/SCSS files

When you pull down a Theme to use, it will most likely have a few core js files in the assets folder, along with the main theme styles. We can help redude the amount of requests your store makes by letting Webpack bundle these scripts and styles in to one file.

Firstly, move all of your core js files from `assets/` into `src/scripts/core/` and then import those core files into the `src/theme.js` file. E.g `import 'src/scripts/core/core-file-1.js`.

Secondly, move the main styles for the theme from your `assets/` into your `src/styles/` and import them into your `theme.scss` right above where you plan to input your own custom styles. E.g `@import "./styles/global/_shopify-theme.scss";`.

If you check back in the console you might come across some undefined variable errors 😩, don’t panic. This will be because the theme contained some libraries that export themselves as modules instead of global variables if the libraries detect you’re now using an environment that supports exports. There are a few ways you can deal with this...

* The “correct” but time consuming way: **Split the libraries out and import them individually, maybe moving some dependencies like JQuery to be managed with NPM.**

* The quick but risky way: **Remove the exports code condition from the libraries source code so it forces the lib to be included as a global.**

* The quick and safe but less optimised way: **Leave the file with the imported libraries as a separate script included in `layout/theme.liquid`**

For example in the [Debut Theme](https://themes.shopify.com/themes/debut/styles/default) the file called `vendor.js` contains all these types of libraries so you can just move this file back into the `layout/theme.liquid` for the time being.

## A note on Pull Requests

If you can make this better, feel free to submit a pull request!

Thanks!

Follow me on twitter [@triscodes](https://twitter.com/triscodes) 💎.