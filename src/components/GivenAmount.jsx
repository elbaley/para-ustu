import React, { useState } from 'react';
import GivenItem from './GivenItem';
const GivenAmount = () => {
	const [givenList, setGivenList] = useState({
		200: 1,
		100: 1,
		50: 2,
		20: 1,
		10: 1,
		5: 2,
		1: 5,
	});

	const banknoteList = [1, 5, 10, 20, 50, 100, 200];
	return (
		<>
			<div className="given-container">
				<div className="item given-header">
					<h3>Banknot</h3>
					<h3>Adet</h3>
				</div>
				<hr />
				{banknoteList.map((banknote, index) => {
					return (
						<GivenItem
							note={banknote}
							amount={givenList[banknote]}
							key={index}
							setGivenList={setGivenList}
						/>
					);
				})}
			</div>
		</>
	);
};

export default GivenAmount;
