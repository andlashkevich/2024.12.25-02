export const Find = (inTask, outTask, setError, setOutTask) => {
	setError(' ');
	let a = outTask.filter((it) =>
		it.task.toLowerCase().includes(inTask.toLowerCase()),
	);
	inTask && a.length > 0 ? setOutTask(a) : setError('Поиск не дал результатов');
};
