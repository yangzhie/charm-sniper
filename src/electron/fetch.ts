import "dotenv/config"; 

const steamAPIKey = process.env.steamAPIKey

// TODO: PRICE CONVERSION
// @ts-ignore
// Get the inspect link of item from Steam
export const fetchInspectLinkFromSteam = async (itemName, pageCount = 1) => {
    const steamURL = `https://steamcommunity.com/market/listings/730/${itemName}/render?count=${pageCount}&start=0&currency=1&country=US&language=english`;
    // @ts-ignore
    let type: string = "Charm";
    try {
        // Group items by type
        if(itemName.includes("Charm")) {
            type = "Charm";
        } else {
            type = "Skin";
        }

        const res = await fetch(steamURL);

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
        const assetID = listing["asset"]["id"];
        // @ts-ignore
        const templateLink: string = listing["asset"]["market_actions"][0]["link"];

        // Replace generic template inspect link M and A values
        const inspectLink = templateLink
            .replace("%listingid%", listingID)
            .replace("%assetid%", assetID);
        // @ts-ignore
        return {inspectLink, type};
    } catch(err) {
        console.error(err);
    }
}

// @ts-ignore
// Use inspect link from Steam to obtain float/pattern info
export const fetchInspectDataFromAPI = async (inspectLink, type) => {
    const inspectAPIURL = `http://localhost/?url=${inspectLink}`;

    try {
        const res = await fetch(inspectAPIURL);

        if(!res.ok) {
            throw new Error(`Err: ${res.status}`);
        }

        const data = await res.json();

        // Get data based on type of asset
        if(type == "Charm") {
            const keychainData = data["iteminfo"]["keychains"];
            const keychainPatternTemplate = keychainData[0].pattern;
            return keychainPatternTemplate;
        } else if(type == "Skin") {
            const float = data["iteminfo"]["floatvalue"];
            const stickersApplied = data["iteminfo"]["stickers"];
            const keychainsApplied = data["iteminfo"]["keychains"];
            return {float, stickersApplied, keychainsApplied};
        }
    } catch(err) {
        console.error(err);
    }
}

