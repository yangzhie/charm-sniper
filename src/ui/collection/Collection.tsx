import { useEffect, useState } from "react";

function Collection() {
	// Charms and collection states
	const [missingLink, setMissingLink] = useState([]);
	const [smallArms, setSmallArms] = useState([]);
	const [drBoom, setDrBoom] = useState([]);
	const [missingLinkCommunity, setMissingLinkCommunity] = useState([]);
	const [fullCollection, setFullCollection] = useState([]);

	const collectionsAPIURL =
		"https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/keychains.json";

	useEffect(() => {
		// IIFE because it will not be explicitly called anywhere else
		(async () => {
			const res = await fetch(collectionsAPIURL);
			const data = await res.json();

			// Declare arrays
			const missingLinkArr = [];
			const smallArmsArr = [];
			const drBoomArr = [];
			const missingLinkCommunityArr = [];
			// @ts-ignore
			const collectionArr = [];

			// Hard-coded as data contains Highlight charms too
			for (let i = 0; i < 78; i++) {
				// Temporary object to push into main arrays
				const charm = {};
				const collection = {};

				// Extract charm data
				// @ts-ignore
				charm["name"] = data[i]["name"];
				// @ts-ignore
				charm["image"] = data[i]["image"];
				// @ts-ignore
				charm["color"] = data[i]["rarity"]["color"];

				// Extract collection data
				const collectionName = data[i]["collections"][0]["name"];
				const collectionImage = data[i]["collections"][0]["image"];

				// @ts-ignore
				// Check if this collection is already in collectionArr
				const collectionExists = collectionArr.some(
					// @ts-ignore
					(col) => col.name === collectionName
				);

				// Create a new collection object only if it doesn't exist
				if (!collectionExists) {
					// @ts-ignore
					collection["name"] = collectionName;
					// @ts-ignore
					collection["image"] = collectionImage;

					collectionArr.push(collection);
				}

				// Push charm data into main collection array
				// Push collection data into collection array if not in already
				if (collectionName == "Missing Link Charm Collection") {
					missingLinkArr.push(charm);
				} else if (collectionName == "Small Arms Charm Collection") {
					smallArmsArr.push(charm);
				} else if (collectionName == "Dr Boom Charm Collection") {
					drBoomArr.push(charm);
				} else if (
					collectionName == "Missing Link Community Charm Collection"
				) {
					missingLinkCommunityArr.push(charm);
				}
			}

			// @ts-ignore
			setMissingLink(missingLinkArr);
			// @ts-ignore
			setSmallArms(smallArmsArr);
			// @ts-ignore
			setDrBoom(drBoomArr);
			// @ts-ignore
			setMissingLinkCommunity(missingLinkCommunityArr);
			// @ts-ignore
			setFullCollection(collectionArr);
		})();
	}, []);
	return (
		<>
			<div>
				<div>Collection Name</div>
				<div>Image</div>
				<div></div>
			</div>
		</>
	);
}

export default Collection;
