import { useNavigate, useLocation } from "react-router-dom";

function Charm() {
	const navigate = useNavigate();
	const { state } = useLocation();

	console.log(state);
	return (
		<>
			<div className="flex justify-start">
				<button
					className="p-2 cursor-pointer"
					onClick={() => navigate(-1)}
				>
					Back
				</button>
			</div>

			<div className="flex flex-col justify-center items-center">
				<div className="flex w-full h-screen">
					<div className="w-1/2 flex flex-col justify-start">
						<div>
							<img src={state["image"]} alt="" />
							<div className="text-2xl">{state["name"]}</div>
						</div>

						<div className="flex flex-col mt-10 h-50">
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
