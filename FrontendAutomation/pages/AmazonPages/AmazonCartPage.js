exports.AmazonCartPage =
class AmazonCartPage{
    constructor(page){
        this.page = page;
        this.subTotalField = '//*[@id="sc-subtotal-amount-buybox"]/span';
    }

    async getSubTotal(){
        const subTotal = await this.page.textContent(this.subTotalField);
        return subTotal;
    }
}