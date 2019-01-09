
const puppeteer = require('puppeteer');
let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    await page.goto('https://www.momoshop.com.tw/search/searchShop.jsp?keyword=airpods&searchType=1&curPage=1&_isFuzzy=0&showType=chessboardType');
    
    const result = await page.evaluate(() => {
        let title_data = [];
        let price_data = [];
        let titles  = document.querySelectorAll('.searchPrdListArea .listArea ul li .prdName'); 
            
            for (var element of titles){ 
                let title = element.innerText; 
                title_data.push({title}); 
        }
        let prices = document.querySelectorAll(".searchPrdListArea .listArea ul li .money .price");

            for (var element of prices) {
                let price = element.innerText;
                price = price.replace('$', '');
                price_data.push({ price });
            }
        return {title_data,price_data}; 
    });

    browser.close();

    var products = new Array();
    for (r in result.title_data) {
    products.push({ title: result.title_data[r].title, price: result.price_data[r].price, website: "Momo" });
        }
return products;
}

 scrape().then((value) => {
     console.log(value);
 })
 

 
