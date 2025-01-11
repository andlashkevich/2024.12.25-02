import styles from './part.module.css';
import { Delete, ReTurn, Update } from '../../../components';

export const Part = ({
	error,
	inTask,
	navigate,
	outTask,
	setClear,
	setError,
	setInTask,
	url,
}) => {
	const updTask = (e, i) => Update(e, i, inTask, setClear);
	const delTask = (e, i) => Delete(e, i, navigate);
	const reTurn = () => ReTurn(navigate, setClear);
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
