import axios from 'axios';
import userAgent from "./user_agent.js"
import CONSTANTS from "./constants.js"
import mongoose from 'mongoose';
import Category from "./schema/category_schema.js";
import SubCategory from "./schema/subcategory_schema.js";
import Product from "./schema/product_schema.js";

mongoose.connect('mongodb://127.0.0.1/Digikala');


async function getSubCategories(catId) {
    console.log("Fetching sub categories", `categories/${catId}/`);
    const subCategoryResponse = (await axios.get(`${CONSTANTS.BASE_URL}/categories/${catId}/`, {
        headers: {'User-Agent': userAgent[getRandomInt(0, userAgent.length - 1)]}
    })).data;

    const sub = subCategoryResponse.data
    for (let blockIndex in sub) {
        if (sub[blockIndex].type === "category_pane") {
            SubCategory.create(sub[blockIndex].data);
        }
    }
    console.log("Fetching sub categories done!");
}

async function getCategories() {
    console.log("Fetching categories...");
    const categoriesResponse = (await axios.get(CONSTANTS.BASE_URL + "/categories/", {
        headers: {'User-Agent': userAgent[getRandomInt(0, userAgent.length - 1)]}
    })).data;
    Category.insertMany(categoriesResponse.data.widgets).then().catch(ex => console.log(ex));

    for (let catIndex in categoriesResponse.data.widgets) {
        const sub = categoriesResponse.data.widgets[catIndex];
        if ("category_child_view" === sub.type) {
            for (let subIndex in sub.data.child) {
                await getSubCategories(sub.data.child[subIndex].id);
            }
        }
    }
    console.log("All done!");
}

async function getSubCategoriesFromDB() {
    const categories = []
    for await (const doc of SubCategory.find()) {
        doc.categories.forEach(
            (element) => {
                if (element !== undefined && element.id !== undefined) categories.push(element.id);
            }
        )
    }
    return categories;
}

async function getProducts(id) {
    let pageLimit = 100;
    let offset = 1;
    console.log(`Focus on ${id}`);
    while (offset <= pageLimit) {
        console.log(`Extracting page ${offset}`)
        const subCategoryResponse = (await axios.get(`${CONSTANTS.BASE_URL}/category/${id}/?page=${offset}`, {
            headers: {'User-Agent': userAgent[getRandomInt(0, userAgent.length - 1)]}
        })).data;
        let totalPages = subCategoryResponse.data.pager.total_pages;

        if (totalPages <= 100) {
            pageLimit = totalPages;
        }
        await Product.insertMany(subCategoryResponse.data.products);
        console.log(`done!\n------------------------------`);
        offset++;
    }


    console.log()
}

async function iterateOverProducts() {
    const categories = await getSubCategoriesFromDB();
    for (const element of categories) {
        await getProducts(element);
    }
    console.log(categories);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


async function main() {

    if ((await Category.count()) === 0) {
        await getCategories();
    }

    console.log("Ready to crawl")
    await iterateOverProducts();

}


main();
