export const Clear = (refresh, setError, setInTask, setRefresh) => {
	setInTask('');
	setError(null);
	setRefresh(!refresh);
};
