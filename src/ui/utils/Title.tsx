// @ts-ignore
function Title({ title, toggleFloat }) {
	const handleCSFloat = () => {
		// @ts-ignore
		toggleFloat((prev) => !prev);
	};
	return (
		<>
			<div className="flex justify-between border-white border-b-1 p-1">
				<div>Charm Sniper v1.0.0</div>

				<button className="cursor-pointer" onClick={handleCSFloat}>
					{title}
				</button>
			</div>
		</>
	);
}

export default Title;
