import { useEffect, useState } from "react";

function Collection() {
	// Charms and collection states
	const [missingLink, setMissingLink] = useState([]);
	const [smallArms, setSmallArms] = useState([]);
	const [drBoom, setDrBoom] = useState([]);
	const [missingLinkCommunity, setMissingLinkCommunity] = useState([]);
	const [fullCollection, setFullCollection] = useState([]);

	return (
		<>
			<div>
				<p className="text-[50px] mt-15">Collections</p>
				<div className="flex flex-wrap justify-center h-full mt-10">
					{fullCollection.map((collection, idx) => {
						return (
							<div
								key={idx}
								className="flex flex-col items-center justify-center px-10 m-0"
							>
								<div className="w-50 text-2xl">
									{collection["name"]}
								</div>
								<div className="flex justify-center">
									<img
										src={collection["image"]}
										alt={`${collection["name"]} Image`}
										width={175}
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default Collection;
