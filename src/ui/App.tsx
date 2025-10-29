import { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Title from "./utils/Title";
import Charm from "./charms/Charm";
import Charms from "./charms/Charms";
import Collections from "./collections/Collections";
import Notifications from "./notifications/Notifications";

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
					<Title />

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
										<Collections
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
							<Notifications />
						</div>
					</div>
				</div>
			</Router>
		</>
	);
}

export default App;
