import Charm from "./charms/Charm";
import Charms from "./charms/Charms";
import Collection from "./collections/Collection";
import Notification from "./notifications/Notification";

function App() {
	const sendMessage = () => {
		// @ts-ignore
		// Use preload script to send data to main process
		window.api.sendMsg("Hi");
		console.log("Button clicked, sending message");
	};

	return (
		<>
			<div className="h-screen box-border overflow-hidden">
				<div className="border-white border-b-1 p-1">
					Charm Sniper v1.0.0
				</div>

				<button onClick={sendMessage} className="cursor-pointer">
					Hey
				</button>

				<div className="flex h-full">
					<div className="w-2/3 text-center">
						<Charm />
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
