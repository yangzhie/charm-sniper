// const floatURL = "https://csfloat.com/api/v1/listings/659338661696086430";
const steamURL = "https://steamcommunity.com/market/listings/730/Charm%20%7C%20Lil%27%20Yeti/render?count=20&start=0&currency=1&country=US&language=english";

export const fetchUrl = async () => {
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

        const [id, listing] = firstListing;
        // @ts-ignore
        const params = listing["asset"]["market_actions"];

        console.log(`First Listing ID: ${id}`);
        console.log(`Market Actions:`, params);
    } catch (err) {
        console.error(err);
    }
}