exports.FlipkartCartPage =
class FlipkartCartPage{
    constructor(page){
        this.page = page;
        this.subTotalField = '(//div[@class="_1Y9Lgu"]//span)[2]';
    }

    async getSubTotal(){
        const subTotal = await this.page.textContent(this.subTotalField);
        return subTotal;
    }
}