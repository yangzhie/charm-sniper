import "dotenv/config"; 

const steamSessionID = process.env.steamSessionID
const steamLoginSecure = process.env.steamLoginSecure

// @ts-ignore
// Get the inspect link of item from Steam
export const fetchInspectLinkFromSteam = async (itemName, pageCount = 1) => {
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

        // Obtain the first listing in the page
        const listings = data["listinginfo"];
        const firstListing = Object.entries(listings)[0];

        if(!firstListing) {
            console.log("There are no listings for this item.");
        }

        const [listingID, listing] = firstListing;
        // @ts-ignore
        const priceUnconverted = listing["converted_price"];
        const priceConverted = priceUnconverted / 100;
        // @ts-ignore
        const assetID = listing["asset"]["id"];
        // @ts-ignore
        const templateLink: string = listing["asset"]["market_actions"][0]["link"];

        // Replace generic template inspect link M and A values
        const inspectLink = templateLink
            .replace("%listingid%", listingID)
            .replace("%assetid%", assetID);
        return {inspectLink, priceConverted};
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
        console.log(keychainPatternTemplate)
        return keychainPatternTemplate;
    } catch(err) {
        console.error(err);
    }
}

