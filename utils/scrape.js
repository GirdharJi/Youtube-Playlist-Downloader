const puppeteer = require("puppeteer");
const clipboardy = require("clipboardy");


const main = async (link) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(link, {
            timeout: 0,
            waitUntil: "networkidle0"
        });
        const data = await page.evaluate(async () => {
            const videos = document.querySelectorAll("a#video-title");
            let links = [];
            for (let i = 0; i < videos.length; i++) {
                links.push(videos[i].href);
            }
            return links;
        })

        for (const item of data) {
            let pages = await browser.newPage();
            await pages.goto("https://ssyoutube.com/en58/youtube-video-downloader", {
                timeout: 0,
                waitUntil: "networkidle0"
            })
            await clipboardy.write(item);
            await pages.click("#id_url");
            pages.keyboard.down("ControlLeft");
            pages.keyboard.press("V");
            pages.keyboard.up("ControlLeft");
            const download = await pages.waitForSelector("#download-mp4-720-audio");
            await download.click();
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = main;