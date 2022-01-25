import './App.css';
import { useState, useEffect } from 'react';
function App() {
	const [toplam, setToplam] = useState(0);
	const [verilen, setVerilen] = useState(0);
	const [kasaToplam, setKasaToplam] = useState(0);
	const [kasa, setKasa] = useState({
		200: 2,
		100: 1,
		50: 2,
		20: 3,
		10: 2,
		5: 3,
		1: 24,
	});

	const verilecekParaUstu = verilen - toplam;
	useEffect(() => {
		const calculateTotalBalance = (obj) => {
			let total = 0;
			for (const [key, value] of Object.entries(obj)) {
				let currentValue = key * value;
				total += currentValue;
			}
			setKasaToplam(total);
		};
		calculateTotalBalance(kasa);
	}, [kasa]);
	const handleBalanceChange = (e) => {
		const value = e.target.value;
		const bancnote = e.target.name;

		setKasa((oldKasa) => {
			let newKasa = { ...oldKasa };
			newKasa[Number(bancnote)] = Number(value);

			return newKasa;
		});
	};

	const handleCalculation = (e) => {
		e.preventDefault();
		let paraustu = verilecekParaUstu;
		let banknotlar = [200, 100, 50, 20, 10, 5, 1];
		let verilenler = { ...kasa };
		banknotlar.map((banknot) => {
			console.log(`Kasadaki ${banknot}luk miktari: ${kasa[banknot]}`);
			// console.log('Kasadaki bu banknot miktari: ' + kasa[banknot]);
			if (paraustu >= banknot && verilenler[banknot] !== 0) {
				do {
					console.log(banknot + ' verdim');
					paraustu = paraustu - banknot;
					verilenler[banknot] -= 1;

					console.log(kasa);
					console.log(
						'======= verilenler aşağıda, kasa yukarıda 😀 ======'
					);
					console.log(verilenler);
				} while (paraustu >= banknot && verilenler[banknot] !== 0);
			}
		});
		// if (paraustu >= 200) {
		// 	do {
		// 		console.log('200 verdim');
		// 		paraustu = paraustu - 200;
		// 		verilenler[200] += 1;
		// 		console.log(verilenler);
		// 	} while (paraustu >= 200);
		// }
		// if (paraustu >= 100) {
		// 	console.log('para ustu 100₺ veya üstünde');
		// 	do {
		// 		console.log('100 verdim');
		// 		paraustu = paraustu - 100;
		// 		verilenler[100] += 1;
		// 		console.log(verilenler);
		// 	} while (paraustu >= 100);
		// }
		// if (paraustu >= 50) {
		// 	console.log('para ustu 50₺ veya üstünde');
		// 	do {
		// 		console.log('50 verdim');
		// 		paraustu = paraustu - 50;
		// 		verilenler[50] += 1;
		// 		console.log(verilenler);
		// 	} while (paraustu >= 50);
		// }
		// if (paraustu >= 20) {
		// 	console.log('para ustu 20₺ veya üstünde');
		// 	do {
		// 		console.log('20 verdim');
		// 		paraustu = paraustu - 20;
		// 		verilenler[20] += 1;
		// 		console.log(verilenler);
		// 	} while (paraustu >= 20);
		// }
		// if (paraustu >= 10) {
		// 	console.log('para ustu 10₺ veya üstünde');
		// 	do {
		// 		console.log('10 verdim');
		// 		paraustu = paraustu - 10;
		// 		verilenler[10] += 1;
		// 		console.log(verilenler);
		// 	} while (paraustu >= 10);
		// }
		// if (paraustu >= 5) {
		// 	console.log('para ustu 5₺ veya üstünde');
		// 	do {
		// 		console.log('5 verdim');
		// 		paraustu = paraustu - 5;
		// 		verilenler[5] += 1;
		// 		console.log(verilenler);
		// 	} while (paraustu >= 5);
		// }
		// if (paraustu >= 1) {
		// 	console.log('para ustu 1₺ veya üstünde');
		// 	do {
		// 		console.log('1 verdim');
		// 		paraustu = paraustu - 1;
		// 		verilenler[1] += 1;
		// 		console.log(verilenler);
		// 	} while (paraustu >= 1);
		// }

		console.log('==========');
		console.log(paraustu);
	};
	return (
		<div className="App">
			<main>
				<h2>Kasa Durumu</h2>
				<label htmlFor="1">1️⃣ </label>
				<input
					type="number"
					name="1"
					value={kasa[1]}
					onChange={handleBalanceChange}
				/>
				<label htmlFor="5">5️⃣</label>
				<input
					type="number"
					name="5"
					value={kasa[5]}
					onChange={handleBalanceChange}
				/>
				<label htmlFor="10">🔟</label>
				<input
					type="number"
					name="10"
					value={kasa[10]}
					onChange={handleBalanceChange}
				/>
				<label htmlFor="20">2️⃣0️⃣</label>
				<input
					type="number"
					name="20"
					value={kasa[20]}
					onChange={handleBalanceChange}
				/>
				<label htmlFor="50">5️⃣0️⃣</label>
				<input
					type="number"
					name="50"
					value={kasa[50]}
					onChange={handleBalanceChange}
				/>
				<label htmlFor="100">1️⃣0️⃣0️⃣ </label>
				<input
					type="number"
					name="100"
					value={kasa[100]}
					onChange={handleBalanceChange}
				/>
				<label htmlFor="200">2️⃣0️⃣0️⃣</label>
				<input
					type="number"
					name="200"
					value={kasa[200]}
					onChange={handleBalanceChange}
				/>
				<p>Kasada toplam {kasaToplam}₺ para var! </p>

				<h2>Para Üstü Hesapla</h2>
				<form>
					<label htmlFor="toplam">Toplam:</label>
					<input
						type="number"
						name="toplam"
						value={toplam}
						onChange={(e) => {
							setToplam(e.target.value);
						}}
					/>
					<label htmlFor="verilen">Verilen:</label>
					<input
						type="number"
						name="verilen"
						value={verilen}
						onChange={(e) => {
							setVerilen(e.target.value);
						}}
					/>
					<button onClick={handleCalculation}>Hesapla</button>
				</form>
				<h1>Para üstü</h1>
				<p>{verilecekParaUstu}₺ para üstü verilecek!</p>
			</main>
		</div>
	);
}

export default App;
