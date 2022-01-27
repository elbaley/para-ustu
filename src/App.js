import './App.css';
import { useState, useEffect } from 'react';

// COMPONENTS
import Banknot from './components/Banknot';
function App() {
	const [toplam, setToplam] = useState(0);
	const [verilen, setVerilen] = useState(0);
	const [kasaToplam, setKasaToplam] = useState(0);
	const [kasa, setKasa] = useState({
		200: 1,
		100: 1,
		50: 2,
		20: 1,
		10: 1,
		5: 2,
		1: 5,
	});
	const [sonuc, setSonuc] = useState('');
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

	const handleCalculation = (e) => {
		e.preventDefault();
		let paraustu = verilecekParaUstu;
		let banknotlar = [200, 100, 50, 20, 10, 5, 1];
		let verilenler = { ...kasa };
		banknotlar.map((banknot) => {
			console.log(`Kasadaki ${banknot}luk miktari: ${kasa[banknot]}`);
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

		console.log('==========');
		console.log(paraustu);
		// if we cant give the remainder tell to the customer
		if (paraustu !== 0) {
			setSonuc(
				'Kusura bakmayın kasada o kadar para yok, bozdurabilir misiniz?'
			);
		} else {
			let newBalance = { ...kasa };
			for (const [key, value] of Object.entries(kasa)) {
				newBalance[key] -= verilenler[key];
			}
			setKasa(verilenler);
			setSonuc(JSON.stringify(newBalance));
		}
	};
	return (
		<div className="App">
			<main>
				<h2>Kasa Durumu</h2>
				<div className="balance">
					<Banknot kasa={kasa} note={1} setKasa={setKasa} />
					<Banknot kasa={kasa} note={5} setKasa={setKasa} />
					<Banknot kasa={kasa} note={10} setKasa={setKasa} />
					<Banknot kasa={kasa} note={20} setKasa={setKasa} />
					<Banknot kasa={kasa} note={50} setKasa={setKasa} />
					<Banknot kasa={kasa} note={100} setKasa={setKasa} />
					<Banknot kasa={kasa} note={200} setKasa={setKasa} />
				</div>
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
				<h1>Sonuç</h1>
				{sonuc}
			</main>
		</div>
	);
}

export default App;
