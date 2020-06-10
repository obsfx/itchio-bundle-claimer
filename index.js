const minimist = require('minimist');

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const options = new chrome.Options();

// setting 'debuggerAddress'
// reference: https://stackoverflow.com/a/42095309
options.options_['debuggerAddress'] = '127.0.0.1:9000';

const argv = minimist(process.argv.slice(2));    

if (typeof argv.pages != 'number' || typeof argv.url != 'string') {
    console.log('please be sure you passed parameters correct.'); 
    return process.exit(0);
}

const PAGE_COUNT = Number(argv.pages) || 0;
const BUNDLE_DOWNLOAD_URL = argv.url || '';

const ANCHOR_DOWNLOAD_CLASSNAME = 'button game_download_btn';
const BTN_DOWNLOAD_SELECTOR = 'button[value=claim]';
const AFTER_CLICK_LOAD_CLASSNAME = 'nav_btn return_link';
const GAME_NAME_SELECTOR = '.stat_header_widget .text_container .object_title';

let state = {
    counter: 0,
    downloadBtns: [],
}

const getDownloadBtns = async driver => {

    let anchorDownloads = await driver.findElements(By.className(ANCHOR_DOWNLOAD_CLASSNAME));
    let buttonDownloads = await driver.findElements(By.css(BTN_DOWNLOAD_SELECTOR));

    return [ ...anchorDownloads, ...buttonDownloads ]; 
}

(async () => { 
    const driver = await new Builder()
                    .forBrowser('chrome')
                    .setChromeOptions(options)
                    .build();
    
    for (let i = 1; i <= PAGE_COUNT; i++) {
        let URL = `${BUNDLE_DOWNLOAD_URL}?page=${i}`; 

        await driver.get(URL);

        console.log('PAGE: ', i);
        console.log('current url:', await driver.getCurrentUrl());
        console.log('-----------------------------------------')

        state.allDownloadBtns = await getDownloadBtns(driver);

        for (let j = 0; j < state.allDownloadBtns.length; j++) {
            
            await driver.executeScript('arguments[0].click();', state.allDownloadBtns[j]);

            await driver.wait(
                until.elementLocated(By.className(AFTER_CLICK_LOAD_CLASSNAME)),
                5000);

            let head = await driver
                .findElement(By.css(GAME_NAME_SELECTOR))
                .getText();
            
            console.log(++state.counter, head);
            
            await driver.get(URL);
            state.allDownloadBtns = await getDownloadBtns(driver);
        }
    }
    
})();
