import typeorm from 'typeorm';
import fetchCategories from './utils/categories_extractor.js';
import { Category } from './model/category.js';
import constants from './constants.js';

typeorm.createConnection(constants.CONNECTION_CONFIG).then(async connection => {
    try {
        const cat = await fetchCategories();
        const categories = cat.map(element => new Category(element.title, element.url));
        const result = await typeorm.getRepository(Category).save(categories);
    } catch (ex) {
        console.log(ex);
    }

});