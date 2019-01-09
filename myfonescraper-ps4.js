        const puppeteer = require('puppeteer');
        let scrape = async () => {
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
        await page.goto('https://search.myfone.com.tw/searchResult.php?keyword=ps4%E4%B8%BB%E6%A9%9F&source_id=1&show_type=1&order_type=1&min_price=&max_price=&sort_id=ID_4726_12138_12141_22829');
  
    const result = await page.evaluate(() => {
        let title_data = [];
        let titles = document.querySelectorAll("#rightBox #sub_page_1 .categoryPdcSmall .title");
        for (var element of titles) {
            let text = element.innerText;
            title_data.push({ text });
        }

        let price_data = [];
        let prices = document.querySelectorAll("#rightBox #sub_page_1 .categoryPdcSmall .price");

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
        products.push({ title: result.title_data[r].text, price: result.price_data[r].text, website: "myfone" });
    }

    return products;
}
scrape().then((value) => {
    console.log(value);
})
