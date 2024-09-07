exports.AmazonSearchPage = 
class AmazonSearchPage{
    constructor(page){
        this.page = page;
        this.productName = '//*[@id="search"]/div[1]/div[1]/div/span[1]/div[1]/div[3]/div/div/div/div/span/div/div/div/div[2]/div/div/div[1]/h2/a/span';
    }

    async selectProduct(){
        await this.page.locator(this.productName).click();
    }
}
