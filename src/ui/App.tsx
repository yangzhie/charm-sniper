import Collection from "./collections/Collection";

function App() {
	return (
		<>
			<div className="h-screen box-border overflow-hidden">
				<div>Charm Sniper v1.0.0</div>

				<div className="flex h-full">
					<div className="w-2/3 text-center">
						<Collection />
					</div>

					<div className="w-1/3"></div>
				</div>
			</div>
		</>
	);
}

export default App;
