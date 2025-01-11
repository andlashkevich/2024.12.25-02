import { useEffect } from 'react';

export const Cut = (ol, outTask, setSz) => {
	useEffect(() => {
		const resz = () => setSz(ol.current?.clientWidth / 17 - 3);
		resz();
		window.addEventListener('resize', resz);
		return () => window.removeEventListener('resize', resz);
	}, [ol, outTask, setSz]);
};
