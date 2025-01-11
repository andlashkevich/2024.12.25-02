import {useEffect} from 'react'

export const GetTsk = (inTask, navigate, refresh, setOutTask, url) => {
	useEffect(() => {
		fetch('http://localhost:3003/tasks')
			.then((rsp) => rsp.json())
			.then((dt) => {
				setOutTask(dt);
				if (
					url &&
					dt.filter((it) => it.id === Number(url.params.ti)).length === 0
				)
					navigate('/404', { replace: true });
			});
	}, [inTask, refresh, navigate, url, setOutTask]);
};
