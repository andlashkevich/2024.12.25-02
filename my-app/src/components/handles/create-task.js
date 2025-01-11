export	const Create = (inTask, setClear) => {
		fetch('http://localhost:3003/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ task: inTask }),
		}).finally(() => setClear());
	};
