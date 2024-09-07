exports.FlipkartProductDespPage =
class FlipkartProductDespPage{
    constructor(page){
        this.page = page;
        this.addToCartButton = '//*[@id="container"]/div/div[3]/div[1]/div[1]/div[2]/div/ul/li[1]/button';//QqFHMw vslbG+ In9uk2
    }

    async addToCart(){
        await this.page.locator(this.addToCartButton).click();
    }
}