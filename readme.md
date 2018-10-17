# tris-shopify-webpack-boilerplate

This boilerplate is great for working with Shopify from scratch as well as migrating existing Shopify themes and building overtop of them. It uses Webpack 4 to bundle all your js and compile your styles into Shopify's assets folder.

The idea of this boilerplate is to get you started doing custom development on Shopify's platform with minimal effort while reducing the amount of http requests your store sends off. We'll achieve this by bundling all of our scripts/styles into 1 file each.

## Usage

Use [Themekit](https://shopify.github.io/themekit/) to pull down a theme from Shopify and then...

* `npm install`
* `theme watch` Themekit watches all your Shopify files and then uploads them to your store upon any changes
* `npm run watch` will watch for changes in the `src/` and then bundle both the scripts and styles into Shopify's assets folder
* `npm run watchall` will do the above two tasks combined in one terminal window
* `npm run build` will bundle and uglify your scripts but the styles will still stay unoptimized for Shopify to handle

## Caveats

* **Live Reloading** — `webpack-dev-server` will not work because the files are hosted on Shopify's servers. I personally have been using [LivePage](https://livepage.mikerogers.io/) chrome extension. It simply watches the web page for any server changes, and refreshes the page right after the server updates.

Sometimes you'll hit too many requests and Shopify will temporarily block you out. To fix this, go into LivePage settings and change the `Polling Settings:` to `2000ms` instead of `200ms`.

* **Liquid Syntaxing** — You cannot use liquid syntax inside of your src/ `.scss`/`.js` files nor will Webpack compile `.scss.liquid`/`.js.liquid` files, so do not rename them to that. You can however get away with some liquid syntax, for example use `background-image: url( "{{ '../path/to/assets/img.jpg' | asset_url }}" )` for retrieving and using assets. The quotes around the liquid tags allow this to work. The quotes around the path and liquid tags can't be the same, use double quotes for one and single quotes for the other.

If you need more complicated liquid syntaxing in your project then insert it via scss `{% stylesheets %}` and js `{% scripts %}` at the end of your sections.

* **CSS optimizations** — The npm plugin for Webpack `optimize-css-assets-webpack-plugin` does not work in this case because it will not optimize `.scss` nor `.scss.liquid` files into css. That's why we can't do things like minification. However Webpack will handle autoprefixing and Shopify will handle the rest of the optimizing of the `.scss.liquid` file in your assets folder. No need to worry.

## Dealing with a Shopify Theme's core JS/SCSS files

When you pull down a Theme to use, it will most likely have a few core js files in the assets folder, along with the main theme styles. We can help reduce the amount of requests your store makes by letting Webpack bundle these scripts and styles in to one file.

Firstly, move the default theme styles from your `assets/` into your `src/styles/` and import them into your `theme.scss` right above where you plan to input your own custom styles. E.g `@import "./styles/global/_shopify-theme.scss";`.

Secondly, move all of your core js files from `assets/` into `src/scripts/core/` and then import those core files into the `src/theme.js` file. E.g `import 'src/scripts/core/core-file-1.js`.

---------------------------

If you check back in the console you *might* come across some undefined variable errors ⚠️, don’t panic. This will be because the theme contained some libraries that export themselves as modules instead of global variables if the libraries detect you’re now using an environment that supports exports. There are a few ways you can deal with this...

* The “correct” but time consuming way: **Split the libraries out and import them individually, maybe moving some dependencies like JQuery to be managed with NPM.**

* The quick but risky way: **Remove the exports code condition from the libraries source code so it forces the lib to be included as a global.**

* The quick and safe but less optimized way: **Leave the file with the imported libraries as a separate script included in `layout/theme.liquid`**

For example in the [Debut Theme](https://themes.shopify.com/themes/debut/styles/default), the file called `vendor.js` contains all these types of libraries, so you can just move this file back into the `assets` folder for now and you'll be fine, I promise.

## CSS Frameworks

My favourite CSS framwork [Bulma](https://bulma.io/) is included in this setup. If you would like to use something different, or nothing at all, feel free to `npm uninstall bulma` and remove `@import "../node_modules/bulma/bulma";` from the `theme.scss`.

## A note on Pull Requests

If you can make this better, or notice any issues, please feel free to submit a pull request!

Thanks!

Follow me on twitter [@triscodes](https://twitter.com/triscodes) 💎.