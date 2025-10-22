import "dotenv/config";
import { URLSearchParams } from "url";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

const steamSessionID = process.env.steamSessionID;
const steamLoginSecure = process.env.steamLoginSecure;
const csfloatAPIKey = process.env.csfloatAPIKey;

// Get the inspect link of item from Steam
export const fetchInspectLinkFromSteam = async (
	itemName: string,
	pageCount: PageCount = 10
): Promise<ListingArray> => {
	// Array to contain top ten listings
	let listingArray: ListingArray = [];

	// Page count: 1 = cheapest, 10 = latest
	const steamURL: string = `https://steamcommunity.com/market/listings/730/${itemName}/render?count=${pageCount}&start=0&currency=1&country=US&language=english`;

	try {
		const res: Response = await fetch(steamURL, {
			headers: {
				Cookie: `steamLoginSecure=${steamLoginSecure}; sessionid=${steamSessionID};`,
			},
		});

		if (!res.ok) {
			throw new Error(`Err: ${res.status}`);
		}

		const data: SteamResponse = await res.json();

		if (data["success"] == false) {
			console.log("Request could not be processed at this time.");
		}

		// Extract objects from listings
		const keys: string[] = Object.keys(data);
		const listings: ListingInfoItem[] = Object.values(data["listinginfo"]);

		// Loop through listings and extract data
		for (let i: number = 0; i < keys.length; i++) {
			const listing: ListingInfoItem = listings[i];
			const price: number = listing["converted_price"] / 100;
			const assetID: string = listing["asset"]["id"];
			const templateLink: string =
				listing["asset"]["market_actions"][0]["link"];

			// Replace generic template inspect link M and A values
			const inspectLink: string = templateLink
				.replace("%listingid%", listing["listingid"])
				.replace("%assetid%", assetID);

			const listingObj: ListingArrayItem = {
				price,
				inspectLink,
			};

			listingArray.push(listingObj);
		}

		return listingArray;
	} catch (err) {
		console.error(err);
		return [];
	}
};

// Use inspect link from Steam to obtain float/pattern info
export const fetchInspectDataFromAPI = async (
	listingArray: ListingArray
): Promise<ListingArray> => {
	// Extract keys from listings array
	const keys: string[] = Object.keys(listingArray);

	// Loop through every element of listing array and pass onto API
	for (let i: number = 0; i < keys.length; i++) {
		// Extract data from listings array
		const listing: ListingArrayItem = listingArray[i];
		const inspectLink: string = listing["inspectLink"];
		const inspectAPIURL: string = `http://localhost/?url=${inspectLink}`;

		const res: Response = await fetch(inspectAPIURL);

		if (!res.ok) {
			throw new Error(`Err: ${res.status}`);
		}

		// Extract data from API
		const data: CSFloatItemObject = await res.json();
		const keychainPattern: number =
			data["iteminfo"]["keychains"][0]["pattern"];

		// Insert pattern into object and array
		listing["charmPattern"] = keychainPattern;
	}

	return listingArray;
};

// Fetch CSFloat data from CSFloat API
export const fetchFromCSFloat = async (
	limit: Limit = 10,
	sort: Sort = "lowest_price",
	minFloat: number | null = null,
	maxFloat: number | null = null,
	paintSeed: number | null = null,
	type: RERE = "buy_now",
	marketHashName: string
): Promise<CSFloatObj | null> => {
	const csfloatURL: URL = new URL("https://csfloat.com/api/v1/listings");
	const params: URLSearchParams = new URLSearchParams();

	if (limit !== undefined) {
		params.append("limit", limit.toString());
	}
	if (sort) {
		params.append("sort_by", sort);
	}

	if (minFloat !== null) {
		params.append("min_float", minFloat.toString());
	}

	if (maxFloat !== null) {
		params.append("max_float", maxFloat.toString());
	}

	if (paintSeed != null) {
		params.append("paint_seed", paintSeed.toString());
	}
	if (type !== undefined) {
		params.append("type", type);
	}
	if (marketHashName !== undefined) {
		params.append("market_hash_name", marketHashName);
	}

	csfloatURL.search = params.toString();

	try {
		const res: Response = await fetch(csfloatURL, {
			headers: {
				// Non-null assertion with "!"
				Authorization: process.env.csfloatAPIKey!,
			},
		});

		if (!res.ok) {
			throw new Error(`Err: ${res.status}`);
		}

		let data: CSFloatData = await res.json();

		// Extract data
		const itemID: string = data["data"][0]["id"];

		const timestamp: string = data["data"][0]["created_at"];
		const postedTime = dayjs(timestamp);
		dayjs.extend(relativeTime);
		const timeMessage: string = postedTime.fromNow();

		const price: number = data["data"][0]["price"] / 100;

		const charmIndex: number = data["data"][0]["item"]["keychain_index"];
		const charmPattern: number =
			data["data"][0]["item"]["keychain_pattern"];
		const icon: string = data["data"][0]["item"]["icon_url"];
		const name: string = data["data"][0]["item"]["market_hash_name"];
		const inspectLink: string = data["data"][0]["item"]["inspect_link"];

		const obj: CSFloatObj = {
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
	} catch (err) {
		console.error(err);
		return null;
	}
};

// Fetch collections data
export const fetchCollections =
	async (): Promise<FetchCollectionsResult | null> => {
		const collectionsAPIURL: string =
			"https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/keychains.json";

		try {
			const res: Response = await fetch(collectionsAPIURL);
			const data: CollectionsFetch[] = await res.json();

			// Declare arrays
			const missingLinkArr: Charms[] = [];
			const smallArmsArr: Charms[] = [];
			const drBoomArr: Charms[] = [];
			const missingLinkCommunityArr: Charms[] = [];
			const collectionArr: CollectionsObj[] = [];

			// Hard-coded as data contains Highlight charms too
			for (let i = 0; i < 78; i++) {
				// Extract charm data
				const charm: CharmsObj = {
					name: data[i]["name"],
					image: data[i]["image"],
					color: data[i]["rarity"]["color"],
				};

				// Extract collection data
				const collection: CollectionsObj = {
					collectionName: data[i]["collections"][0]["name"],
					collectionImage: data[i]["collections"][0]["image"],
				};

				// Check if this collection is already in collectionArr
				const collectionExists: boolean = collectionArr.some(
					(col) => col.collectionName === collection.collectionName
				);

				// Create a new collection object only if it doesn't exist
				if (!collectionExists) {
					collection["collectionName"] = collection.collectionName;
					collection["collectionImage"] = collection.collectionImage;

					collectionArr.push(collection);
				}

				// Push charm data into main collection array
				// Push collection data into collection array if not in already
				if (
					collection.collectionName == "Missing Link Charm Collection"
				) {
					missingLinkArr.push(charm);
				} else if (
					collection.collectionName == "Small Arms Charm Collection"
				) {
					smallArmsArr.push(charm);
				} else if (
					collection.collectionName == "Dr Boom Charm Collection"
				) {
					drBoomArr.push(charm);
				} else if (
					collection.collectionName ==
					"Missing Link Community Charm Collection"
				) {
					missingLinkCommunityArr.push(charm);
				}
			}

			return {
				missingLinkArr,
				smallArmsArr,
				drBoomArr,
				missingLinkCommunityArr,
				collectionArr,
			};
		} catch (err) {
			console.error(err);
			return null;
		}
	};
