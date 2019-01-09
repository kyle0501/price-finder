const puppeteer = require('puppeteer');
let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
await page.goto('https://shopping.friday.tw/ec2/search?sid=&hotNum=0&search=airpods');
const result = await page.evaluate(() => {

        let title_data = [];
        let titles = document.querySelectorAll(".searchlist_area .prodname h3");
        for (var element of titles) {
            let text = element.title;
            title_data.push({ text });
        }

        let price_data = [];
        let prices = document.querySelectorAll(".searchlist_area .price-table span strong");

        for (var element of prices) {
            let text = element.innerText;
            text = text.replace('$', '');
            price_data.push({ text });
        }


        return { title_data, price_data};
    
});
browser.close();
var products = new Array();
for (r in result.title_data) {
    products.push({ title: result.title_data[r].text, price: result.price_data[r].text, website: "Friday" });
}

return products;
}
scrape().then((value) => {
    console.log(value);
})