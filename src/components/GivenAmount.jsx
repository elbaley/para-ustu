import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Item component
import GivenItem from './GivenItem';
const GivenAmount = ({
	verilecekParaUstu,
	kasa,
	setKasa,
	toplam,
	setToplam,
	verilen,
	setVerilen,
}) => {
	const [givenList, setGivenList] = useState({
		200: 0,
		100: 0,
		50: 0,
		20: 0,
		10: 0,
		5: 0,
		1: 0,
	});
	const banknoteList = [1, 5, 10, 20, 50, 100, 200];
	useEffect(() => {
		const calculateGivenMoney = (obj) => {
			let sum = 0;
			for (const [key, value] of Object.entries(obj)) {
				sum += key * value;
			}
			console.log(sum + ' toplam bu kadar para eder');
			setVerilen(sum);
		};
		calculateGivenMoney(givenList);
	}, [givenList, setVerilen]);

	//handlers

	const handleCalculation = (e) => {
		e.preventDefault();
		let paraustu = verilecekParaUstu;
		let banknotlar = [200, 100, 50, 20, 10, 5, 1];
		let newKasa = { ...kasa };
		// if given is 0 or below throw error
		if (verilen <= 0 || toplam <= 0) {
			return toast.error('Lütfen toplam fiyatı ve verileni giriniz!', {
				position: 'top-right',
				autoClose: false,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
		// add the given amount to the newKasa
		for (const [key, value] of Object.entries(givenList)) {
			newKasa[key] += value;
		}
		banknotlar.forEach((banknot) => {
			console.log(`Kasadaki ${banknot}luk miktari: ${kasa[banknot]}`);
			if (paraustu >= banknot && newKasa[banknot] !== 0) {
				do {
					console.log(banknot + ' verdim');
					paraustu = paraustu - banknot;
					newKasa[banknot] -= 1;

					console.log(kasa);
					console.log(
						'======= newKasa aşağıda, kasa yukarıda 😀 ======'
					);
					console.log(newKasa);
				} while (paraustu >= banknot && newKasa[banknot] !== 0);
			}
		});

		console.log('==========');
		console.log(paraustu);
		// if we cant give the remainder tell to the customer
		if (paraustu === 0) {
			let newBalance = { ...kasa };
			for (const [key] of Object.entries(kasa)) {
				newBalance[key] -= newKasa[key];
			}

			setKasa(newKasa);
			//find used bancnotes
			let newBalanceAsArray = Object.entries(newBalance);
			const filteredNewBalance = newBalanceAsArray.filter(
				(item) => item[1] > 0
			);
			// build success string
			let successMessage = 'Toplam ';
			filteredNewBalance.forEach((amount, i) => {
				if (i + 1 === filteredNewBalance.length) {
					successMessage +=
						amount[1] +
						'x' +
						amount[0] +
						'₺ (' +
						verilecekParaUstu +
						'₺)';
				} else {
					successMessage += amount[1] + 'x' + amount[0] + '₺,';
				}
			});
			successMessage += ' para üstü verildi.';
			console.log(successMessage);
			toast.success(successMessage, {
				position: 'top-right',
				autoClose: false,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setToplam(0);
		} else {
			let errorMessage = 'Yeterli bozuk para yok!';
			toast.error(errorMessage, {
				position: 'top-right',
				autoClose: false,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setToplam(0);
		}
	};
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
							key={index}
							setGivenList={setGivenList}
							givenList={givenList}
						/>
					);
				})}
			</div>
			<div className="calculate-container">
				<label htmlFor="toplam">Toplam </label>
				<input
					type="number"
					name="toplam"
					min="0"
					inputMode="numeric"
					value={Number(toplam).toString()}
					onChange={(e) => {
						setToplam(e.target.value);
					}}
				/>
				<label htmlFor="verilen">Verilen:</label>
				<input
					type="number"
					name="verilen"
					readOnly
					disabled
					value={verilen}
				/>
				<button onClick={handleCalculation}>Hesapla</button>
			</div>

			<ToastContainer />
		</>
	);
};

export default GivenAmount;
