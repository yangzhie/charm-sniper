// @ts-nocheck
export const checkFilter = (charmArr, filters) => {
	const highlightIndexes = new Set();

	charmArr.forEach((charm, i) => {
		const pattern = Number(charm["charmPattern"]);

		for (const f of filters) {
			const pass1 =
				(f.symbolOne === ">" && pattern > f.numberOne) ||
				(f.symbolOne === "<" && pattern < f.numberOne) ||
				(f.symbolOne === "=" && pattern === Number(f.numberOne));

			let pass2 = true;

			if (f.symbolTwo && f.numberTwo) {
				pass2 =
					(f.symbolTwo === ">" && pattern > f.numberTwo) ||
					(f.symbolTwo === "<" && pattern < f.numberTwo) ||
					(f.symbolTwo === "=" && pattern === Number(f.numberTwo));
			}

			// If matches ANY filter
			if (pass1 && pass2) {
				highlightIndexes.add(i + 1);

				window.api.notify(`Pattern: ${pattern}`, `Index: ${i + 1}`);
			}
		}
	});

	return Array.from(highlightIndexes);
};
