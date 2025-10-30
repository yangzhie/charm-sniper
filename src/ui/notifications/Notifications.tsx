// @ts-nocheck
import { useState, useEffect } from "react";
import { eventBus } from "../utils/eventBus";

function Notifications() {
	const [charm, setCharm] = useState<any>(null);
	const [charmData, setCharmData] = useState<any>([]);

	// Recieve charm and polling data from Charm component
	useEffect(() => {
		eventBus.on("new-charm-added", setCharm);
		eventBus.on("new-charm-data", setCharmData);

		return () => {
			eventBus.off("new-charm-added", setCharm);
			eventBus.off("new-charm-data", setCharmData);
		};
	}, []);

	if (!charm) return <div>No charm</div>;
	return (
		<>
			<div className="h-full w-full">
				<div className="text-2xl text-center p-2">Notifications</div>
				<div className="flex flex-col justify-center items-center">
					<div className="w-40">
						<img src={charm["image"]} alt={charm["name"]} />
					</div>
					<div className="flex text-lg justify-center items-center w-full p-1 mb-2">
						{charm["name"]}
					</div>
				</div>
				<div>
					<table className="w-full h-110 flex-col justify-center items-center">
						<tr className="underline underline-offset-5">
							<th>Index</th>
							<th>Pattern</th>
							<th>Price</th>
						</tr>
						{charmData.map((data, idx) => {
							return (
								<tr key={idx}>
									<td className="text-center">{idx + 1}</td>
									<td className="text-center">
										{data["charmPattern"]}
									</td>
									<td className="text-center">
										${data["price"]}
									</td>
								</tr>
							);
						})}
					</table>
				</div>
			</div>
		</>
	);
}

export default Notifications;
