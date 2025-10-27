import { useEffect, useState } from "react";
import Charm from "./charms/Charm";
import Charms from "./charms/Charms";
import Collection from "./collections/Collection";
import Notification from "./notifications/Notification";

function App() {
	const [missingLinkCollection, setMissingLinkCollection] = useState([]);
	const [smallArmsCollection, setSmallArmsCollection] = useState([]);
	const [missingLinkCommunityCollection, setDrBoomCollection] = useState([]);
	const [drBoomCollection, setMissingLinkCommunityCollection] = useState([]);

	const [missingLink, setMissingLink] = useState([]);
	const [smallArms, setSmallArms] = useState([]);
	const [missingLinkCommunity, setMissingLinkCommunity] = useState([]);
	const [drBoom, setDrBoom] = useState([]);

	// Runs only after first render, never again
	useEffect(() => {
		// @ts-ignore
		window.api.getStaticData().then((data) => {
			setMissingLinkCollection(data["collectionArr"][0]);
			setSmallArmsCollection(data["collectionArr"][1]);
			setDrBoomCollection(data["collectionArr"][2]);
			setMissingLinkCommunityCollection(data["collectionArr"][3]);

			setMissingLink(data["missingLinkArr"]);
			setSmallArms(data["smallArmsArr"]);
			setMissingLinkCommunity(data["missingLinkCommunityArr"]);
			setDrBoom(data["drBoomArr"]);
		});
	}, []);
	return (
		<>
			<div className="h-screen box-border overflow-hidden">
				<div className="border-white border-b-1 p-1">
					Charm Sniper v1.0.0
				</div>

				<div className="flex h-full">
					<div className="w-2/3 text-center">
						<Collection
							missingLinkCollection={missingLinkCollection}
							smallArmsCollection={smallArmsCollection}
							missingLinkCommunityCollection={
								missingLinkCommunityCollection
							}
							drBoomCollection={drBoomCollection}
						/>
					</div>

					<div className="w-1/3 border-l-1">
						<Notification />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
