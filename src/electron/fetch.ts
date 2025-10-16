import "dotenv/config"; 
import { URLSearchParams } from "url";

const steamSessionID = process.env.steamSessionID;
const steamLoginSecure = process.env.steamLoginSecure;
const csfloatAPIKey = process.env.csfloatAPIKey;

// @ts-ignore
// Get the inspect link of item from Steam
export const fetchInspectLinkFromSteam = async (itemName, pageCount = 10) => {
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

        const listings = data["listinginfo"];
        
        // Obtain the latest listing on the page (used when pageCount = 10)
        const latestListingId = Object.keys(listings).reduce((maxId, currentId) => {
            return BigInt(currentId) > BigInt(maxId) ? currentId : maxId;
        }, "0");
        const latestListing = listings[latestListingId];
        
        // Get the latest listing's index/position
        const listingIds = Object.keys(listings);
        const latestListingIndex = listingIds.indexOf(latestListingId) + 1

        if(!latestListing) {
            console.log("There are no listings for this item.");
        }

        // @ts-ignore
        const priceUnconverted = latestListing["converted_price"];
        const priceConverted = priceUnconverted / 100;
        // @ts-ignore
        const assetID = latestListing["asset"]["id"];
        // @ts-ignore
        const templateLink: string = latestListing["asset"]["market_actions"][0]["link"];

        // Replace generic template inspect link M and A values
        const inspectLink = templateLink
            .replace("%listingid%", latestListing["listingid"])
            .replace("%assetid%", assetID);
        console.log(priceConverted)
        return {inspectLink, priceConverted, latestListingIndex};
    } catch(err) {
        console.error(err);
    }
}

// @ts-ignore
// Use inspect link from Steam to obtain float/pattern info
export const fetchInspectDataFromAPI = async (inspectLink) => {
    const inspectAPIURL = `http://localhost/?url=${inspectLink}`;

    try {
        const res = await fetch(inspectAPIURL);

        if(!res.ok) {
            throw new Error(`Err: ${res.status}`);
        }

        const data = await res.json();

        const keychainData = data["iteminfo"]["keychains"];
        const keychainPatternTemplate = keychainData[0].pattern;
        return keychainPatternTemplate;
    } catch(err) {
        console.error(err);
    }
}

// @ts-ignore
// Fetch CSFloat data from CSFloat API
export const fetchFromCSFloat = async (limit, sort, minFloat, maxFloat, paintSeed, type, marketHashName) => {
    const csfloatURL = new URL("https://csfloat.com/api/v1/listings");
    const params = new URLSearchParams();

    if(limit !== undefined) {params.append("limit", limit.toString())};
    if(sort) {params.append("sort_by", sort)};
    if(minFloat !== undefined) {params.append("min_float", minFloat.toString())};
    if(maxFloat !== undefined) {params.append("max_float", maxFloat.toString())};
    if(paintSeed !== undefined) {params.append("paint_seed", paintSeed.toString())};
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

        const data = await res.json();
        console.log(data)
    } catch(err) {
        console.error(err);
    }
}