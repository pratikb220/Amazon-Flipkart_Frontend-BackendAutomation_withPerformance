import { test, expect} from '@playwright/test';
import testDataUtils from '../utils/testDataUtils';
import { AmazonHomePage } from '../pages/AmazonPages/AmazonHomePage';
import { AmazonSearchPage } from '../pages/AmazonPages/AmazonSearchPage';
import { AmazonProductDespPage } from '../pages/AmazonPages/AmazonProductDespPage';
import { AmazonCartPage } from '../pages/AmazonPages/AmazonCartPage';
import { FlipkartHomePage } from '../pages/FlipkartPages/FlipkartHomePage';
import { FlipkartSearchPage } from '../pages/FlipkartPages/FlipkartSearchPage';
import { FlipkartProductDespPage } from '../pages/FlipkartPages/FlipkartProductDespPage';
import { FlipkartCartPage } from '../pages/FlipkartPages/FlipkartCartPage';
import { console } from 'inspector';

test('Search Products on Amazon and Flipkart and compare the price of both product', async ({ browser }) => {
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();

    const amazonHomePage = new AmazonHomePage(page);
    const amazonSearchPage = new AmazonSearchPage(page);

    await amazonHomePage.gotoAmazonHomepage(testDataUtils.AmazonURL);

    await amazonHomePage.searchProduct(testDataUtils.amazonProduct);

    const pagePromiseAmazon = context.waitForEvent('page');
    await amazonSearchPage.selectProduct();
    const newPage = await pagePromiseAmazon;

    const amazonProductPage = new AmazonProductDespPage(newPage);

    await amazonProductPage.addToCart();

    await amazonProductPage.goToCart();

    const amazonCartPage = new AmazonCartPage(newPage);
    const AmazonProductSubTotal = await amazonCartPage.getSubTotal();

    //console.log(`Subtotal for Amazon Product is: ${AmazonProductSubTotal}`);
    process.stdout.write(`Subtotal for Amazon Product is: ${AmazonProductSubTotal}\n`);


    //-----------------------------------------------Flipkart Automation------------------------------------------------------------------

    await page.bringToFront();

    const flipkartHomePage = new FlipkartHomePage(page);
    await flipkartHomePage.gotoFlipkartHomePage(testDataUtils.flipkartURL);

    await flipkartHomePage.searchProduct(testDataUtils.flipkartProduct);

    const flipkartSearchPage = new FlipkartSearchPage(page);

    const pagePromiseFlipkart = context.waitForEvent('page');
    await flipkartSearchPage.selectProduct();
    const newFlipkartPage = await pagePromiseFlipkart;

    const flipkartProductPage = new FlipkartProductDespPage(newFlipkartPage);
    const title = await newFlipkartPage.title();
    console.log(title);

    await newFlipkartPage.waitForTimeout(3000);
    await flipkartProductPage.addToCart();
    
    const flipkartCartPage = new FlipkartCartPage(newFlipkartPage);
    const flipkartProductSubTotal = await flipkartCartPage.getSubTotal();

    //console.log(`Subtotal for Flipkart Product is: ${flipkartProductSubTotal}`);
    process.stdout.write(`Subtotal for Flipkart Product is: ${flipkartProductSubTotal}`);

    function parsePrice(priceStr){
        return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    }

    const amazonPrice = parsePrice(AmazonProductSubTotal);
    const flipkartPrice = parsePrice(flipkartProductSubTotal);

    if(amazonPrice < flipkartPrice){
        //console.log(`Amazon has the lower price : Rs${amazonPrice}`);
        process.stdout.write(`Amazon has the lower price : Rs${amazonPrice}`);
    }
    else if(flipkartPrice < amazonPrice){
        //console.log(`Flipkart has lower price : Rs${flipkartPrice}`);
        process.stdout.write(`Flipkart has lower price : Rs${flipkartPrice}`);
    }
    else{
        //console.log(`Both Amazon and Flipkart are having the same price.`);
        process.stdout.write(`Both Amazon and Flipkart are having the same price.`);
    }

    // const fs = require('fs');
    // const amazonBackendPrice = fs.readFileSync('C:\\Users\\prati\\WorkSpace\\PlayWrightAmazonFlipkart\\BackendAutomation\\AmazonAPIautomation\\amazon_BackendPrice.txt', 'utf8');

    // if(Number(amazonBackendPrice) === amazonPrice){
    //     process.stdout.write("Prices are matching.");
    // }
    // else{
    //     process.stdout.write("Prices are not matching.");
    // }
})