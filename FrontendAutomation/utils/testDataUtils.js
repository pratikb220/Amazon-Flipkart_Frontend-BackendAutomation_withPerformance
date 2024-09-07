const fs = require('fs');
const path = require('path');

class TestDataUtils{
    constructor(){
        this.filePath = 'testData/data.json';
        this.loadTestData();
    }

    loadTestData(){
        try{
            const data = fs.readFileSync(this.filePath, 'utf-8');
            const testData = JSON.parse(data)[0];
            Object.assign(this, testData);
        }
        catch(error){
            console.error(`Error reading file data.json: ${error}`);
        }
    }
}

module.exports = new TestDataUtils();