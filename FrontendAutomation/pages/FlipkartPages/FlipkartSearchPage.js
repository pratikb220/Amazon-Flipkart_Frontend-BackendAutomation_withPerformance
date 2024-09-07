exports.FlipkartSearchPage =
class FlipkartHomePage{
    constructor(page){
        this.page = page;
        this.productName = '//div[text()="Apple iPhone 15 Plus (Black, 128 GB)"]';
    }

    async selectProduct(){
        await this.page.locator(this.productName).click();
    }
}