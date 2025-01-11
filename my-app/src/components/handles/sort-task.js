export const Sort = (outTask, setOutTask) => {
	setOutTask(
		[...outTask].sort((a, b) =>
			a.task.toLowerCase() > b.task.toLowerCase() ? 1 : -1,
		),
	);
};
