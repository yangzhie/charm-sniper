// Global types
type PageCount = 1 | 10;
type Limit = 10 | 20 | 30;
type Sort = "lowest_price" | "highest_price" | "most_recent";
type RERE = "buy_now" | "auction";

type ListingArray = ListingArrayItem[];

type ListingArrayItem = {
	price: number;
	inspectLink: string;
	charmPattern?: number;
};

type SteamResponse = {
	success: boolean;
	listinginfo: ListingInfo;
};

type Asset = {
	id: string;
	market_actions: MarketAction[];
};

type MarketAction = {
	link: string;
};

type ListingInfoItem = {
	listingid: string;
	converted_price: number;
	asset: Asset;
};

type ListingInfo = {
	[key: string]: ListingInfoItem;
};

type CSFloatObj = {
	itemID: string;
	timeMessage: string;
	price: number;
	charmIndex: number;
	charmPattern: number;
	icon: string;
	name: string;
	inspectLink: string;
};

type CSFloatItemObject = {
	iteminfo: {
		keychains: CSFloatItemValues[];
	};
};

type CSFloatItemValues = {
	pattern: number;
};

type CSFloatData = {
	data: CSFloatDataItem[];
};

type CSFloatDataItem = {
	id: string;
	created_at: string;
	price: number;
	item: CSFloatItemInfo;
};

type CSFloatItemInfo = {
	keychain_index: number;
	keychain_pattern: number;
	icon_url: string;
	market_hash_name: string;
	inspect_link: string;
};
