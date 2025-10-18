import "dotenv/config"; 
import { URLSearchParams } from "url";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

const steamSessionID = process.env.steamSessionID;
const steamLoginSecure = process.env.steamLoginSecure;
const csfloatAPIKey = process.env.csfloatAPIKey;

// @ts-ignore
// Get the inspect link of item from Steam
export const fetchInspectLinkFromSteam = async (itemName, pageCount = 10) => {
    // @ts-ignore
    // Array to contain top ten listings
    let listingArray = [];

    // Page count: 1 = cheapest, 10 = latest 
    const steamURL = `https://steamcommunity.com/market/listings/730/${itemName}/render?count=${pageCount}&start=0&currency=1&country=US&language=english`;

    try {
        const res = await fetch(steamURL, {
            headers: {
                Cookie: `steamLoginSecure=${steamLoginSecure}; sessionid=${steamSessionID};`,
            }
        });

        if(!res.ok) {
            throw new Error(`Err: ${res.status}`);
        }

        const data = await res.json();

        if(data["success"] == false) {
            console.log("Request could not be processed at this time.");
        }

        // Extract objects from listings
        const keys = Object.keys(data);
        const listings = Object.values(data["listinginfo"]);
            
        // Loop through listings and extract data
        for(let i = 0; i < keys.length; i++) {
            let listingObj = {};
            const listing = listings[i];
            // @ts-ignore
            const price = listing["converted_price"] / 100;
            // @ts-ignore
            const assetID = listing["asset"]["id"];
            // @ts-ignore
            const templateLink = listing["asset"]["market_actions"][0]["link"];

            // Replace generic template inspect link M and A values
            const inspectLink = templateLink
                // @ts-ignore
                .replace("%listingid%", listing["listingid"])
                .replace("%assetid%", assetID);
            
            // @ts-ignore
            listingObj["price"] = price;
            // @ts-ignore
            listingObj["inspectLink"] = inspectLink;

            listingArray.push(listingObj);
        }
        
        return listingArray;
    } catch(err) {
        console.error(err);
    }
}

// @ts-ignore
// Use inspect link from Steam to obtain float/pattern info
export const fetchInspectDataFromAPI = async (listingArray) => {
    // Extract keys from listings array
    const keys = Object.keys(listingArray);
    
    // Loop through every element of listing array and pass onto API
    for(let i = 0; i < keys.length; i++) {
        // Extract data from listings array
        const listing = listingArray[i];
        const inspectLink = listing["inspectLink"];
        const inspectAPIURL = `http://localhost/?url=${inspectLink}`;

        const res = await fetch(inspectAPIURL);
    
        if(!res.ok) {
            throw new Error(`Err: ${res.status}`);
        }
    
        // Extract data from API
        const data = await res.json();
        const keychainPattern = data["iteminfo"]["keychains"][0]["pattern"];

        // @ts-ignore
        // Insert pattern into object and array
        listing["charmPattern"] = keychainPattern;
    }
    
    return listingArray;
}

// @ts-ignore
// Fetch CSFloat data from CSFloat API
export const fetchFromCSFloat = async (
    limit = 10, 
    sort = "lowest_price", 
    minFloat = null, 
    maxFloat = null, 
    paintSeed = null, 
    type = "buy_now",
    // @ts-ignore 
    marketHashName) => 
{
    const csfloatURL = new URL("https://csfloat.com/api/v1/listings");
    const params = new URLSearchParams();

    if(limit !== undefined) {params.append("limit", limit.toString())};
    if(sort) {params.append("sort_by", sort)};
    // @ts-ignore
    if(minFloat !== null) {params.append("min_float", minFloat.toString())};
    // @ts-ignore
    if(maxFloat !== null) {params.append("max_float", maxFloat.toString())};
    // @ts-ignore
    if(paintSeed != null) {params.append("paint_seed", paintSeed.toString())};
    if(type !== undefined) {params.append("type", type)};
    if(marketHashName !== undefined) {params.append("market_hash_name", marketHashName)};

    csfloatURL.search = params.toString();

    try {
        const res = await fetch (csfloatURL, {
            // @ts-ignore
            headers: {
                "Authorization": process.env.csfloatAPIKey
            }
        });

        if(!res.ok) {
            throw new Error(`Err: ${res.status}`);
        }

        let data = await res.json();

        // Extract data
        const itemID = data["data"][0]["id"];

        const timestamp = data["data"][0]["created_at"];
        const postedTime = dayjs(timestamp);
        dayjs.extend(relativeTime);
        const timeMessage = postedTime.fromNow();

        const price = data["data"][0]["price"] / 100;

        const charmIndex = data["data"][0]["item"]["keychain_index"];
        const charmPattern = data["data"][0]["item"]["keychain_pattern"];
        const icon = data["data"][0]["item"]["icon_url"];
        const name = data["data"][0]["item"]["market_hash_name"];
        const inspectLink = data["data"][0]["item"]["inspect_link"];

        const obj = {
            itemID,
            timeMessage,
            price,
            charmIndex,
            charmPattern,
            icon,
            name,
            inspectLink,
        };

        return obj;
    } catch(err) {
        console.error(err);
    }
}