# express-demo-api

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).









# serverMiddleware nedir ?

- Normal şartlarda `nuxt.js` instance olarak alt tarafta ki server'a bağlanabiliyor.
- Yani bundan kaynaklı olarak dilediğimiz bir middlewari servre üzerinden yapabiliriz.
- Mesela dışarda php , java , python vs. backend dilleri kullanıyoruz. işte bunlara `nuxt.js` ile birlikte uygulama geliştirirken
  ihtiyacımız kalmayabilir.
- Tamamen kendi yazmış ve oluşturduğumuz api onu server içinde referans olarak verip kullanabiliriz.
- Bu api tamamen `express.js` ile BLL katmanı oluyor.
- Express.js bir SSR freamwroki diyebiliriz. `Node.js`'in bir freamworküdür.
- Mesela `php`'den hiç bir farkı yok. fazlası var eksiği yok. php mi kaldı be :)
- VUE RENDER'DAN ÖNCE ÇALIŞMASINI İSTEDİĞİMİZ SERVERSIDE İÇİNDE ÇALIŞMASINI İSTEDİĞİMİZ ARKADŞALARI BURADA TANIMLIYORUZ DİYEBİLİRİZ.

Tanımı : `nuxt.config.js` ' de gerçekleşir.

```js
serverMiddleware: []; // bir dizi alır. bir kaç farklı türde veri alır.
```

# serverMiddleware ile middleware arasında ki fark nedir ?

| middleware                                   | serverMiddleware                                        |
| :------------------------------------------- | :------------------------------------------------------ |
| Client ' da çalışır                          | Server üzerinde çalışır                                 |
| Her routte ve ya sayfa yenilemesinde çalışır | sunucu başlatıldığında yürütülen işlemleri temsil eder. |

# Hadi başlayalım

Önce bir kaç tane bağımlıklarımız var.
1 - Express : Server side olarak `node.js` tabanlı bir SSR freamworkü
2 - body-parser: POST, PUT gibi http isteklerinde kullanıcıdan bilgileri genelde bodyden alırız. body-parser bu body isteklerini json halde almamızı sağlayan yardımcı bir kütüphanedir.
3- Axios : http requestlerimizi bu kütüphane ile atacağız.

dowlonad: `npm install --save express body-parser axios`

# express.js ile bir backend tarafı oluşturalım ve kendimi "demo veriler işleyelim."

- Bunun için öncelik ilk `~/api/index.js` adlı bir path oluşturuyorum.

```js
const express = require("express"); //paketi içe gömdüm

const app = express();

module.exports = {
  path: "/api", //sunucum hangi url'den ayakta duracak.
  handler: app, //hangi yapıyı ele alacağını belirtiyorum.
};
```

Şimdi yapılandırma tamamlandı ama bunun çalışması için `nuxt.config.js` ' de **`serverMiddleware`** tarafında tanıtmam lazım.

```js
//nuxt.config.js
serverMiddleware: ["`~/api"], // benim `path: "/api", //sunucum hangi url'den ayakta duracak.` demiştim işte bunuda burada tanımlıyorum.
```

