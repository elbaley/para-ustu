import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const GivenItem = ({ note, setGivenList, givenList }) => {
	const handleGivenAmountButtonChange = (e) => {
		const inputValue = e.target.value;
		const givenBanknote = e.target.name;
		const operation = e.target.className;

		let newGivenList = { ...givenList };
		if (operation === 'decrease-given') {
			if (givenList[note] === 0) {
				console.log('dont do that');
				return toast.error("Verilen banknot 0'dan düşük olamaz!", {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			newGivenList[note]--;
			setGivenList(newGivenList);
		}
		if (operation === 'increase-given') {
			newGivenList[note]++;
			setGivenList(newGivenList);
		}
		if (operation === 'input-change') {
			if (inputValue >= 0) {
				setGivenList((oldGivenList) => {
					let newGivenList = { ...oldGivenList };
					newGivenList[givenBanknote] = Number(inputValue);
					return newGivenList;
				});
			}
		}
	};
	return (
		<div className="item ">
			<label htmlFor="d"> {note} ₺</label>
			<div className="input-container">
				<button
					name={note}
					className="increase-given"
					onClick={handleGivenAmountButtonChange}
				>
					+
				</button>
				<input
					type="number"
					inputMode="numeric"
					className="input-change"
					name={note}
					onChange={handleGivenAmountButtonChange}
					value={givenList[note].toString()}
				/>
				<button
					name={note}
					className="decrease-given"
					onClick={handleGivenAmountButtonChange}
				>
					-
				</button>
			</div>
		</div>
	);
};

export default GivenItem;
