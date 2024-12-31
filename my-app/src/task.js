import { Routes, Route, Link, useNavigate, Navigate, useMatch } from 'react-router-dom';
import styles from './task.module.css';
import { useEffect, useState, useRef } from 'react';

export function App() {
	const [inTask, setInTask] = useState('');
	const [outTask, setOutTask] = useState([]);
	const [error, setError] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [sz, setSz] = useState(0);
	const navigate = useNavigate();
	const setClear = () => {
		setInTask('');
		setError(null);
		setRefresh(!refresh);
	};
	const ol = useRef(null);

	useEffect(() => {
		const resz = () => setSz(ol.current?.clientWidth / 17 - 3);
		resz();
		window.addEventListener('resize', resz);
		return () => window.removeEventListener('resize', resz);
	}, []);

	useEffect(() => {
		fetch('http://localhost:3003/tasks')
			.then((rsp) => rsp.json())
			.then((dt) => {
				setOutTask(dt);
			});
	}, [inTask, refresh]);

	const inputChange = ({ target }) => {
		let error = null;
		setInTask(target.value);
		if (outTask.find((it) => it.task.toLowerCase() === target.value.toLowerCase()))
			error = 'Такая задача уже существует';
		if (target.value.length > 500) error = 'Слишком длинная задача';
		setError(error);
	};

	const createTask = () => {
		fetch('http://localhost:3003/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify({ task: inTask }),
		}).finally(() => setClear());
	};

	const sortTask = () => {
		setOutTask(
			[...outTask].sort((a, b) =>
				a.task.toLowerCase() > b.task.toLowerCase() ? 1 : -1,
			),
		);
	};

	const findTask = () => {
		setError(' ');
		let a = outTask.filter((it) => it.task.includes(inTask));
		inTask && a.length > 0 ? setOutTask(a) : setError('Поиск не дал результатов');
	};

	const updTask = (e, i) => {
		fetch(`http://localhost:3003/tasks/${i}`, {
			method: 'PUT',
			body: JSON.stringify({ task: inTask }),
			headers: {
				'content-Type': 'application/json; charset=utf-8',
			},
		}).finally(() => setClear());
	};

	const delTask = (e, i) => {
		fetch(`http://localhost:3003/tasks/${i}`, {
			method: 'DELETE',
		});
		navigate('/');
		setClear();
	};

	const reTurn = () => {
		setClear();
		navigate(-1);
	};

	const NotFnd = () => (
		<div className={styles.notFnd}>Такой страницы не существует! Ошибка 404.</div>
	);

	const Main = () => (
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

	const Part = () => {
		const url = useMatch('/task/:ti');
		let a = outTask.filter((it) => it.id === Number(url.params.ti));
		return (
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
				<li
					onClick={(e) => setInTask(e.target.innerText)}
					className={styles.uncheck}
				>
					{a[0].task}
				</li>
			</>
		);
	};

	return (
		<div className={styles.wrap}>
			<h2 className={styles.head}>Задачи на неделю (JSON Server)</h2>
			<div className={styles.field}>
				{error ? <div className={styles.error}>{error}</div> : null}
				<textarea
					name="newTask"
					value={inTask}
					onChange={inputChange}
					className={styles.input}
					placeholder="1.Введите новую задачу или словосочетание для поиска существующей. 2.Для исправления имеющейся задачи нажмите на неё и внесите желаемое изменение в этом поле. 3.Ввод пустого значения или задачи длиной более 500 знаков неприемлем. 4.Если задача уже есть в списке, ввести её еще раз не получится."
					autoFocus={true}
					autoComplete="on"
				></textarea>
				<button onClick={setClear} className={styles.xBut}>
					X
				</button>
			</div>

			<Routes>
				{outTask.map((it) => {
					return (
						<Route path={`/task/${it.id}`} element={<Part />} key={it.id} />
					);
				})}
				<Route path="/task/:ti" element={<Navigate to="/404" replace={true} />} />
				<Route path="/" element={<Main />} />
				<Route path="*" element={<Navigate to="/404" replace={true} />} />
				<Route path="/404" element={<NotFnd />} />
			</Routes>
		</div>
	);
}

export default App;
