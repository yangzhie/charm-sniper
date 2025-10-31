// @ts-nocheck
import { useState, useEffect } from "react";
import { eventBus } from "../utils/eventBus";
import { checkFilter } from "../utils/checkFilter";

function Notifications() {
	const [charm, setCharm] = useState<any>(null);
	const [charmData, setCharmData] = useState<any>([]);
	const [error, setError] = useState<"success" | "fail">("fail");

	const [symbolOne, setSymbolOne] = useState("");
	const [numberOne, setNumberOne] = useState("");
	const [symbolTwo, setSymbolTwo] = useState("");
	const [numberTwo, setNumberTwo] = useState("");

	// Recieve charm and polling data from Charm component
	useEffect(() => {
		eventBus.on("new-charm-added", setCharm);
		eventBus.on("new-charm-data", setCharmData);

		eventBus.on("symbol-one", setSymbolOne);
		eventBus.on("number-one", setNumberOne);
		eventBus.on("symbol-two", setSymbolTwo);
		eventBus.on("number-two", setNumberTwo);

		// Listen for polling errors
		const handleError = (pollError) => {
			if (pollError) {
				// Set error to fail immediately
				setError("fail");

				// Keep red dot for 15 seconds, then reset to success if no new error occurs
				window.errorTimeout = setTimeout(() => {
					setError("success");
				}, 15000);
			} else {
				// Set to success if no current timeout is active
				if (!window.errorTimeout) setError("success");
			}
		};
		window.api.onError(handleError);

		return () => {
			eventBus.off("new-charm-added", setCharm);
			eventBus.off("new-charm-data", setCharmData);
			eventBus.off("symbol-one", setSymbolOne);
			eventBus.off("number-one", setNumberOne);
			eventBus.off("symbol-two", setSymbolTwo);
			eventBus.off("number-two", setNumberTwo);
			window.api.removeAllListeners("error");
		};
	}, []);

	// Recieve indexes of patterns
	const highlightIndexArray = checkFilter(
		charmData,
		symbolOne,
		numberOne,
		symbolTwo,
		numberTwo
	);

	if (!charm) return <div>No charm</div>;
	return (
		<>
			<div className="h-full w-full">
				<div className="flex flex-col justify-center items-center">
					<div className="text-2xl text-center p-2">
						Notifications
					</div>

					<div className="flex items-center gap-2">
						<div
							className={`border-10 rounded-xl ${
								error === "fail"
									? "text-red-500"
									: "text-green-500"
							}`}
						></div>
					</div>
				</div>

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
									<td
										key={idx}
										className={`text-center ${
											highlightIndexArray.includes(
												idx + 1
											)
												? "text-red-500"
												: ""
										}`}
									>
										{idx + 1}
									</td>

									<td className="text-center">
										{data["charmPattern"]}
									</td>
									<td className="text-center">
										{data["price"]
											? `$${data["price"]}`
											: "Sold!"}
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
