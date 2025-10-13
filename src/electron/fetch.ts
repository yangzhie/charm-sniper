import "dotenv/config"; 

const steamURL = "https://steamcommunity.com/market/listings/730/M4A4%20%7C%20Neo-Noir%20%28Minimal%20Wear%29/render?count=20&start=0&currency=1&country=US&language=english";
const inspectLink = "steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20M650327037878456658A45734023881D17152713756802352648";
const apiURL = `https://api.csfloat.com/?url=${encodeURIComponent(inspectLink)}`;
const listing_id = 664968161364302228
const floatURL = `https://csfloat.com/api/v1/listings/664968161364302228`;
const apiKey: any = process.env.apiKey;

export const fetchSteamUrl = async () => {
    try {
        const res = await fetch(steamURL);

        if(!res.ok) {
            throw new Error(`Err: ${res.status}`);
        }

        const data = await res.json();

        if(data["success"] == false) {
            console.log("Request could not be processed at this time.")
        }

        const listings = data["listinginfo"];
        const firstListing = Object.entries(listings)[0];

        if(!firstListing) {
            console.log("There are no listings for this item.")
        }

        const [listingID, listing] = firstListing;
        // @ts-ignore
        const assetID = listing["asset"]["id"];
        // @ts-ignore
        const templateLink: string = listing["asset"]["market_actions"][0]["link"];

        const inspectLink = templateLink
            .replace("%listingid%", listingID)
            .replace("%assetid%", assetID);

        console.log(listingID);
        return inspectLink;
    } catch(err) {
        console.error(err);
    }
}

export const fetchCSFloatURL = async () => {
    try {
        const res = await fetch(floatURL, {
            headers: {
                "Authorization": apiKey
            }
        });

        if(!res.ok) {
            throw new Error(`Err: ${res.status}`)
        }

        const data = await res.json();
        console.log(data)
    } catch(err) {
        console.error(err);
    }
}