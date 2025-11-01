// Global types
type PageCount = 1 | 10;
type Limit = 10 | 20 | 30 | 50;
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

type Charms = {
	name: string;
	image: string;
	color: string;
};

type Collections = {
	name: string;
	image: string;
};

type FetchCollectionsResult = {
	missingLinkArr: CharmsArray[];
	smallArmsArr: CharmsArray[];
	drBoomArr: CharmsArray[];
	missingLinkCommunityArr: CharmsArray[];
	collectionArr: CollectionsArray[];
};

type CollectionsFetch = {
	name: string;
	image: string;
	rarity: {
		color: string;
	};
	collections: {
		name: string;
		image: string;
	}[];
};

type CharmsObj = {
	name: string;
	image: string;
	color: string;
};

type CollectionsObj = {
	collectionName: string;
	collectionImage: string;
};
