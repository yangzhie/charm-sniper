// @ts-nocheck
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { eventBus } from "../utils/eventBus";
import BackBtn from "../utils/BackBtn";

function Charm() {
	const { state } = useLocation();
	const [userInputFilter, setUserInputFilter] = useState("");
	const [filterList, setFilterList] = useState([]);

	// Poll charm data
	const addCharm = async () => {
		console.log("Starting charm polling for:", state.name);

		// Send charm name to notification center
		eventBus.emit("new-charm-added", state);

		// Start polling (fire and forget)
		window.api.startCharmPolling(state["name"]);

		// Listen for updates
		const handleUpdate = (data) => {
			eventBus.emit("new-charm-data", data);
		};
		window.api.onCharmDataUpdate(handleUpdate);
	};

	// Place user-input filter into filter list
	const handleSubmit = (e) => {
		e.preventDefault();

		// Ignore empty strings
		if (userInputFilter.trim() === "") return;

		const newFilter = {
			id: Date.now(),
			value: userInputFilter,
		};

		// Push input into filter list
		setFilterList((prev) => [...prev, newFilter]);

		// Reset user input
		setUserInputFilter("");
	};

	// Delete filter from filter list
	const deleteFilter = (filterToDelete) => {
		setFilterList((prev) => prev.filter((f) => f.id !== filterToDelete.id));
	};
	return (
		<>
			<BackBtn />

			<div className="flex flex-col justify-center items-center">
				<div className="flex w-full h-screen">
					<div className="w-1/2 flex flex-col justify-start">
						<div>
							<img src={state["image"]} alt={state["name"]} />
							<div className="text-2xl">{state["name"]}</div>
							<button
								className="mt-2 cursor-pointer"
								onClick={addCharm}
							>
								Add Charm
							</button>
						</div>

						<div className="flex flex-col mt-6 h-50">
							<div>Preset Filter Tags</div>
							<div className="flex flex-wrap gap-4 justify-center overflow-scroll overflow-x-hidden">
								<div>Tags</div>
							</div>
						</div>
					</div>

					<div className="w-1/2">
						<div className="mt-2">
							<form onSubmit={handleSubmit}>
								<input
									type="text"
									placeholder="Add Filter"
									value={userInputFilter}
									onChange={(e) =>
										setUserInputFilter(e.target.value)
									}
								/>
								<button>OK</button>
							</form>
						</div>

						<div className="mt-10 text-xl">Set Filters</div>
						<div className="mt-4 h-150 overflow-scroll overflow-x-hidden">
							{filterList.map((filter) => {
								return (
									<div
										className="flex justify-center gap-4"
										key={filter.id}
									>
										<button
											className="cursor-pointer"
											onClick={() => deleteFilter(filter)}
										>
											x
										</button>
										<div>Color</div>
										<div>{filter.value}</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Charm;
