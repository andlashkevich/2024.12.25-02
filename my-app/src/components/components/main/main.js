import styles from './main.module.css';
import { Create, Find, Sort } from '../../../components';
import { Link } from 'react-router-dom';

export const Main = ({
	error,
	inTask,
	ol,
	outTask,
	setClear,
	setError,
	setOutTask,
	sz,
}) => {
	const sortTask = () => Sort(outTask, setOutTask);
	const findTask = () => Find(inTask, outTask, setError, setOutTask);
	const createTask = () => Create(inTask, setClear);
	return (
		<>
			<div className={styles.buttons}>
				<button
					disabled={!inTask || error}
					className={styles.сButton}
					onClick={createTask}
				>
					Добавить
				</button>
				<button disabled={!outTask} onClick={sortTask} className={styles.sButton}>
					Упорядочить
				</button>
				<button disabled={!inTask} onClick={findTask} className={styles.fButton}>
					Найти
				</button>
			</div>
			<ol className={styles.ol} ref={ol}>
				{outTask.map(({ task, id }) => {
					return (
						<Link to={`/task/${id}`} className={styles.tasks} key={id}>
							<li className={styles.uncheck}>
								{task.length > sz ? `${task.slice(0, sz)}...` : task}
							</li>
						</Link>
					);
				})}
			</ol>
		</>
	);
};
