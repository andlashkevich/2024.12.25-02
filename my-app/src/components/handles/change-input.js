export 	const Change = ({ target }, outTask, setError, setInTask) => {
	let error = null;
	setInTask(target.value);
	if (outTask.find((it) => it.task.toLowerCase() === target.value.toLowerCase()))
		error = 'Такая задача уже существует';
	if (target.value.length > 500) error = 'Слишком длинная задача';
	setError(error);
};
