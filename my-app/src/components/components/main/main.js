import styles from './main.module.css';

export const Main = ({
	createTask,
	error,
	findTask,
	inTask,
	Link,
	ol,
	outTask,
	sortTask,
	sz,
}) => (
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
