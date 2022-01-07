import cheerio from "cheerio";
import axios from "axios";
import { TAGS } from "../tags.js";
import Constants from "../constants.js";

export default async function fetchCategories(){
    const response = await axios.get(Constants.BASE_URL);
    const $ = cheerio.load(response.data);
    let categories = [];
    $(TAGS.CATEGORY_ITEM).map((i, mapItem)=>{
        const item = $(mapItem)
        const data = item.data();
        if(Object.keys(data).length !== 0){
            categories.push(
                {
                    url: item.attr().href,
                    title: data.sntParams.category_title
                }
            )
        }
    });

    return categories
}