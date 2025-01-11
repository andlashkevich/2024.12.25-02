export const Delete = (e, i, navigate) => {
	fetch(`http://localhost:3003/tasks/${i}`, {
		method: 'DELETE',
	});
	navigate('/');
};
