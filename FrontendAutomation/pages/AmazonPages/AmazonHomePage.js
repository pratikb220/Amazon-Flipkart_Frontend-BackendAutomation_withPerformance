exports.AmazonHomePage =
class AmazonHomePage{
    constructor(page){
        this.page = page;
        this.searchProductInput = '//input[@id="twotabsearchtextbox"]';
        this.searchProductButton = '//input[@id="nav-search-submit-button"]';
    }

    async gotoAmazonHomepage(url){
        await this.page.goto(url);
    }

    async searchProduct(amazonProduct){
        await this.page.locator(this.searchProductInput).fill(amazonProduct);
        await this.page.locator(this.searchProductButton).click();
    }
}