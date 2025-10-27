// @ts-ignore
function Collection({
	// @ts-ignore
	missingLinkCollection,
	// @ts-ignore
	smallArmsCollection,
	// @ts-ignore
	missingLinkCommunityCollection,
	// @ts-ignore
	drBoomCollection,
}) {
	const collectionArr = [
		missingLinkCollection,
		smallArmsCollection,
		missingLinkCommunityCollection,
		drBoomCollection,
	];

	return (
		<>
			<div>
				<p className="text-[50px] mt-15">Collections</p>
				<div className="flex flex-wrap justify-center h-full mt-10">
					{
						// @ts-ignore
						collectionArr.map((collection, idx) => {
							return (
								<div
									key={idx}
									className="flex flex-col items-center justify-center px-10 m-0"
								>
									<div className="w-50 text-2xl">
										{collection["collectionName"]}
									</div>

									<div className="flex justify-center">
										<img
											src={collection["collectionImage"]}
											alt={`${collection["collectionName"]} Image`}
											width={175}
										/>
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		</>
	);
}

export default Collection;
