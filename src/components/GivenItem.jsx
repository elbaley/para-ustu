import React from 'react';

const GivenItem = ({ note, amount, setGivenList }) => {
	const handleGivenAmountChange = (e) => {
		const givenBanknote = e.target.name;
		const operation = e.target.className;
		if (operation === 'increase-given') {
			setGivenList((oldGivenList) => {
				let newGivenList = { ...oldGivenList };
				newGivenList[givenBanknote]++;
				return newGivenList;
			});
		} else {
			setGivenList((oldGivenList) => {
				let newGivenList = { ...oldGivenList };
				newGivenList[givenBanknote]--;
				return newGivenList;
			});
		}
	};
	return (
		<div className="item ">
			<label htmlFor="d"> {note} ₺</label>
			<div className="input-container">
				<button
					name={note}
					className="increase-given"
					onClick={handleGivenAmountChange}
				>
					+
				</button>
				<input type="text" value={amount} />
				<button
					name={note}
					className="decrease-given"
					onClick={handleGivenAmountChange}
				>
					-
				</button>
			</div>
		</div>
	);
};

export default GivenItem;
