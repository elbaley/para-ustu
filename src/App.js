import './App.css';
import { useState, useEffect } from 'react';

// COMPONENTS
import Banknot from './components/Banknot';
import GivenAmount from './components/GivenAmount';
function App() {
	const [toplam, setToplam] = useState(0);
	const [verilen, setVerilen] = useState(0);
	const [kasaToplam, setKasaToplam] = useState(0);
	const [kasa, setKasa] = useState({
		200: 0,
		100: 0,
		50: 0,
		20: 0,
		10: 0,
		5: 0,
		1: 0,
	});
	const [scrolled, setScrolled] = useState(false);
	const handleScroll = () => {
		const offset = window.scrollY;
		if (offset > 50) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
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

	return (
		<div className="App">
			<nav className={scrolled ? 'navbar scrolled' : ''}>
				<h2>
					Kasa Durumu : <span>{kasaToplam}₺</span>{' '}
				</h2>
			</nav>
			<main>
				<div className="balance">
					<Banknot kasa={kasa} note={1} setKasa={setKasa} />
					<Banknot kasa={kasa} note={5} setKasa={setKasa} />
					<Banknot kasa={kasa} note={10} setKasa={setKasa} />
					<Banknot kasa={kasa} note={20} setKasa={setKasa} />
					<Banknot kasa={kasa} note={50} setKasa={setKasa} />
					<Banknot kasa={kasa} note={100} setKasa={setKasa} />
					<Banknot kasa={kasa} note={200} setKasa={setKasa} />
				</div>
				<GivenAmount
					verilecekParaUstu={verilecekParaUstu}
					kasa={kasa}
					setKasa={setKasa}
					toplam={toplam}
					setToplam={setToplam}
					verilen={verilen}
					setVerilen={setVerilen}
				/>
			</main>
		</div>
	);
}

export default App;
