exports.FlipkartHomePage =
class FlipkartHomePage{
    constructor(page){
        this.page = page;
        this.searchProductInput = '//input[@class="Pke_EE"]';
        this.searchProductButton = '//button[@class="_2iLD__"]';
    }

    async gotoFlipkartHomePage(url){
        await this.page.goto(url);
    }

    async searchProduct(flipkartProduct){
        await this.page.locator(this.searchProductInput).fill(flipkartProduct);
        await this.page.locator(this.searchProductButton).click();
    }
}