import styles from './part.module.css';

export const Part = ({delTask, error, inTask, outTask, reTurn, setError, setInTask, updTask, url }) => {
	let i = url.params.ti;
	let a = outTask.filter((it) => it.id === Number(i));
	return a.length ? (
		<>
			<div to={`/task/${a[0].id}`} className={styles.tasks}>
				<button onClick={reTurn} className={styles.pButton}>
					Назад
				</button>
				<button
					disabled={!inTask || error}
					onClick={(e) => updTask(e, a[0].id)}
					className={styles.uButton}
				>
					Изменить
				</button>
				<button onClick={(e) => delTask(e, a[0].id)} className={styles.del}>
					Удалить
				</button>
			</div>
			<li onClick={(e) => setInTask(e.target.innerText)} className={styles.uncheck}>
				{a[0].task}
			</li>
		</>
	) : (
		setError('')
	);
};
