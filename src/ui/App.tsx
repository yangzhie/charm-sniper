import Collection from "./collections/Collection";
import Notification from "./notifications/Notification";

function App() {
	return (
		<>
			<div className="h-screen box-border overflow-hidden">
				<div className="border-white border-b-1 p-1">
					Charm Sniper v1.0.0
				</div>

				<div className="flex h-full">
					<div className="w-2/3 text-center">
						<Collection />
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
