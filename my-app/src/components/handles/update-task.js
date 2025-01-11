export const Update = (e, i, inTask, setClear) => {
	fetch(`http://localhost:3003/tasks/${i}`, {
		method: 'PUT',
		body: JSON.stringify({ task: inTask }),
		headers: {
			'content-Type': 'application/json; charset=utf-8',
		},
	}).finally(() => setClear());
};
