// @ts-nocheck
export const checkFilter = (
	charmArr,
	symbolOne,
	numberOne,
	symbolTwo = null,
	numberTwo = null
) => {
	// Create pattern array
	const patternArr = [];
	charmArr.map((charm) => {
		patternArr.push(charm["charmPattern"]);
	});

	const filteredPatterns = [];

	// TODO: Handle edge case errors (=, > >, < <)
	if (!symbolTwo && !numberTwo) {
		// Filter patterns by symbol and value
		for (let i = 0; i < patternArr.length; i++) {
			if (symbolOne === ">" && patternArr[i] > numberOne) {
				filteredPatterns.push({ index: i + 1, pattern: patternArr[i] });
			} else if (symbolOne === "<" && patternArr[i] < numberOne) {
				filteredPatterns.push({ index: i + 1, pattern: patternArr[i] });
			} else if (symbolOne === "=" && patternArr[i] === numberOne) {
				filteredPatterns.push({ index: i + 1, pattern: patternArr[i] });
			}
		}
	} else {
		for (let i = 0; i < patternArr.length; i++) {
			if (symbolOne === ">" && symbolTwo === "<") {
				if (patternArr[i] > numberOne && patternArr[i] < numberTwo) {
					filteredPatterns.push({
						index: i + 1,
						pattern: patternArr[i],
					});
				}
			}

			if (symbolOne === "<" && symbolTwo === ">") {
				if (patternArr[i] < numberOne && patternArr[i] > numberTwo) {
					filteredPatterns.push({
						index: i + 1,
						pattern: patternArr[i],
					});
				}
			}
		}
	}

	// Obtain and store indexes
	const highlightIndexArray = [];
	for (let i = 0; i < filteredPatterns.length; i++) {
		const highlightIndex = filteredPatterns[i]["index"];
		highlightIndexArray.push(highlightIndex);
	}

	return highlightIndexArray;
};
