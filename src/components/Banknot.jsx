import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// IMAGES of banknotes and the coin
import ikiyuztl from '../assets/images/200tl.jpeg';
import yuztl from '../assets/images/100tl.jpeg';
import ellitl from '../assets/images/50tl.jpeg';
import yirmitl from '../assets/images/20tl.jpeg';
import ontl from '../assets/images/10tl.jpeg';
import bestl from '../assets/images/5tl.jpeg';
import birtl from '../assets/images/1tl.png';
const images = {
	200: ikiyuztl,
	100: yuztl,
	50: ellitl,
	20: yirmitl,
	10: ontl,
	5: bestl,
	1: birtl,
};
function Banknot({ kasa, note, setKasa }) {
	const handleBalanceChange = (e) => {
		const value = e.target.value;
		const bancnote = e.target.name;
		if (value >= 0) {
			setKasa((oldKasa) => {
				let newKasa = { ...oldKasa };
				newKasa[Number(bancnote)] = Number(value);

				return newKasa;
			});
		} else {
			return -1;
		}
	};
	const handleBalanceButton = (e) => {
		const banknote = Number(e.target.name);
		const operation = e.target.className;
		let newKasa = { ...kasa };
		if (operation === 'decrease') {
			if (newKasa[banknote] === 0) {
				return toast.error("Değer 0'dan küçük olamaz!", {
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
			newKasa[banknote]--;
		} else {
			newKasa[banknote]++;
		}
		setKasa(newKasa);
	};
	return (
		<>
			<div className={`tl${note} card`}>
				<img src={images[note]} alt="" />

				<div className="note-info">
					<button
						name={note}
						onClick={handleBalanceButton}
						className="increase"
					>
						+
					</button>
					<input
						type="number"
						min="0"
						step="1"
						name={note}
						value={kasa[note].toString()}
						inputMode="numeric"
						onChange={handleBalanceChange}
					/>
					<button
						name={note}
						onClick={handleBalanceButton}
						className="decrease"
					>
						-
					</button>
				</div>
			</div>
		</>
	);
}

export default Banknot;
