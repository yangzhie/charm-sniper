// @ts-nocheck
import { useLocation } from "react-router-dom";
import { eventBus } from "../utils/eventBus";
import BackBtn from "../utils/BackBtn";

function Charm() {
	const { state } = useLocation();

	// Function to give data of current charm
	const addCharm = () => {
		// Give charm into to notification center
		eventBus.emit("new-charm-added", state);

		// Give charm name to main process
		window.api.listenCharmName(state["name"]);
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
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
								<div>Tag 1</div>
							</div>
						</div>

						<div className="mt-5">
							<form action="">
								<input type="text" placeholder="Add Filter" />
								<button>OK</button>
							</form>
						</div>
					</div>

					<div className="w-1/2">
						<div className="mt-3 text-xl">Filters Set</div>
						<div className="mt-4 h-150 overflow-scroll overflow-x-hidden">
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
							<div className="flex justify-center gap-4">
								<div>Delete</div>
								<div>Color</div>
								<div>Filter 1</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Charm;
