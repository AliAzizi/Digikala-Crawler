import typeorm from 'typeorm';
import fetchCategories from '../utils/categories_extractor.js';
import { Category } from '../model/category.js';
import constants from '../constants.js';
import axios from "axios";
import cheerio from "cheerio"
import userAgent from "../user_agent.js"

console.log(await (getDetailsFromProductId('3847115')));

typeorm.createConnection(constants.CONNECTION_CONFIG).then(async connection => {

    try {
        const cat = await fetchCategories();
        const categories = cat.map(element => new Category(element.title, element.url));
        const result = await typeorm.getRepository(Category).save(categories);


        const products = await getProductsFromPage(result[0].route,2);

        for(var p in products){
            await getDetailsFromProductId(p);
        }

    } catch (ex) {
        console.log(ex);
    }

});

async function getProductsFromPage(category, page) {
    const body = (await axios.get(`https://www.digikala.com/ajax${category}?sortby=4&pageno=${page}`)).data;
    const $ = cheerio.load(body.data.products);
    return $('.c-listing__items.js-plp-products-list').children().map((_, child) => {
        const item = $(child).children().attr();
        // console.log({
        //     id : item['data-id'],
        //     title_fa : item['data-title-fa'],
        //     additionalData : JSON.parse(item['data-enhanced-ecommerce'])
        // });
        return item['data-id']

    }).get();
}

async function getDetailsFromProductId(id) {
    const details = (await axios.get(` https://www.digikala.com/product/dkp-${id}`, {
        headers: { 'User-Agent': userAgent[getRandomInt(0, userAgent.length - 1)] }
    })).data;
    console.log("Extracting...")
    const rgx = new RegExp("ecpd2 = (.*?);")
    console.log(JSON.parse(rgx.exec(details)[1]))
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}