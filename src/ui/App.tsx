import { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Charm from "./charms/Charm";
import Charms from "./charms/Charms";
import Collection from "./collections/Collection";
import Notification from "./notifications/Notification";

function App() {
	const [missingLinkCollection, setMissingLinkCollection] = useState([]);
	const [smallArmsCollection, setSmallArmsCollection] = useState([]);
	const [missingLinkCommunityCollection, setDrBoomCollection] = useState([]);
	const [drBoomCollection, setMissingLinkCommunityCollection] = useState([]);

	const [charmsData, setCharmsData] = useState({});

	// Runs only after first render, never again
	useEffect(() => {
		// @ts-ignore
		window.api.getStaticData().then((data) => {
			setMissingLinkCollection(data["collectionArr"][0]);
			setSmallArmsCollection(data["collectionArr"][1]);
			setDrBoomCollection(data["collectionArr"][2]);
			setMissingLinkCommunityCollection(data["collectionArr"][3]);

			setCharmsData({
				missingLink: data["missingLinkArr"],
				smallArms: data["smallArmsArr"],
				missingLinkCommunity: data["missingLinkCommunityArr"],
				drBoom: data["drBoomArr"],
			});
		});
	}, []);

	const collectionArr = [
		missingLinkCollection,
		smallArmsCollection,
		missingLinkCommunityCollection,
		drBoomCollection,
	];
	return (
		<>
			<Router>
				<div className="h-screen box-border overflow-hidden">
					<div className="border-white border-b-1 p-1">
						Charm Sniper v1.0.0
					</div>

					<div className="flex h-full">
						<div className="w-2/3 text-center">
							<Routes>
								{/* Route to set root to collections */}
								<Route
									path="/"
									element={
										<Navigate to="/collections" replace />
									}
								/>

								<Route
									path="/collections"
									element={
										<Collection
											collectionArr={collectionArr}
										/>
									}
								/>

								<Route
									path="/collections/:collectionCharm"
									element={<Charms charmsData={charmsData} />}
								/>

								<Route
									path="/collections/:collectionCharm/:charm"
									element={<Charm />}
								/>
							</Routes>
						</div>

						<div className="w-1/3 border-l-1">
							<Notification />
						</div>
					</div>
				</div>
			</Router>
		</>
	);
}

export default App;
