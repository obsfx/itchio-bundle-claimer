# itch.io bundle claimer

[Bundle for Racial Justice and Equality](https://itch.io/b/520/bundle-for-racial-justice-and-equality)

A simple script that is using `selenium` to help you for adding all bundle items
to your library by clicking all download buttons in place of you.

![](https://raw.githubusercontent.com/obsfx/itchio-bundle-claimer/master/media/demo.gif)

### Prerequisites

1. Download appropriate chrome driver for your operating system and add it to the PATH.
2. Add chrome to the PATH. It should be accessible as 'google-chrome'.
3. And of course nodejs and npm.

### Usage

1. Clone the repo

```
git clone https://github.com/obsfx/itchio-bundle-claimer.git
cd itchio_bundle_claimer
npm install
```

2. Run chrome in remote debugging mode

(port '9000' must be available)

```
npm run run-chrome
```

3. Open a new chrome window and type `127.0.0.1:9000` in the address bar.

![](https://raw.githubusercontent.com/obsfx/itchio-bundle-claimer/master/media/1.png)

4. Click that the `about:blank`

5. Type `itch.io` in that sub address bar and go to that page.

![](https://raw.githubusercontent.com/obsfx/itchio-bundle-claimer/master/media/2.png)

6. Login by defeating that annoying captcha. After you logged in you can close the browser.

7. Run the script.

```
node index.js --pages=<specify the page count> --url=<specify the bundle page url that listed all download buttons>
e.g.: node index.js --pages=48 --url=https://itch.io/bundle/download/sakfjasfkhaslkjfhlkajsfhgjkhlasf
```
