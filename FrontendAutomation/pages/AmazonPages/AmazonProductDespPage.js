exports.AmazonProductDespPage =
class AmazonProductDespPage{
    constructor(page){
        this.page = page;
        this.addToCartButton = "//div[@class='a-section a-spacing-none a-padding-none']//span[@id='submit.add-to-cart']";
        this.closeTheDivButton = '//a[@id="attach-close_sideSheet-link"]';
        this.gotoCartButton = '//a[@id="nav-cart"]';

    }

    async addToCart(){
        await this.page.locator(this.addToCartButton).click();
    }

    async clickCloseDiv(){
        await this.page.locator(this.closeTheDivButton).click();
    }

    async goToCart(){
        await this.page.locator(this.gotoCartButton).click();
    }
}