import {
	Routes,
	Route,
	useParams,
	useMatch,
	Link,
	useNavigate,
	Navigate,
} from 'react-router-dom';
import styles from './task.module.css';
import { useEffect, useState, useRef } from 'react';

const NotFnd = () => (
	<div className={styles.notFnd}>Такой страницы не существует! Ошибка 404.</div>
);

const Main = (iT, er, cT, oT, sT, fT, o, size) => {
	return (
		<>
			<div className={styles.buttons}>
				<button disabled={!iT || er} className={styles.сButton} onClick={cT}>
					Добавить
				</button>
				<button disabled={!oT} onClick={sT} className={styles.sButton}>
					Упорядочить
				</button>
				<button disabled={!iT} onClick={fT} className={styles.fButton}>
					Найти
				</button>
			</div>
			<ol className={styles.ol} ref={o}>
				{oT.map(({ task, id }) => {
					return (
						<Link to={`/task/${id}`} className={styles.tasks} key={id}>
							<li className={styles.uncheck}>
								{task.length > size ? `${task.slice(0, size)}...` : task}
							</li>
						</Link>
					);
				})}
			</ol>
		</>
	);
};

const Part = (oT, rT, iT, uT, er, dT, sIT, sE) => {
	const prm = useParams();
	let a = oT.filter((it) => it.id === Number(prm.id));
	return a.length ? (
		<>
			<div to={`/task/${a[0].id}`} className={styles.tasks}>
				<button onClick={rT} className={styles.pButton}>
					Назад
				</button>
				<button
					disabled={!iT || er}
					onClick={(e) => uT(e, a[0].id)}
					className={styles.uButton}
				>
					Изменить
				</button>
				<button onClick={(e) => dT(e, a[0].id)} className={styles.del}>
					Удалить
				</button>
			</div>
			<li onClick={(e) => sIT(e.target.innerText)} className={styles.uncheck}>
				{a[0].task}
			</li>
		</>
	) : (
		sE('')
	);
};

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
	const url = useMatch('/task/:ti');

	useEffect(() => {
		const resz = () => setSz(ol.current?.clientWidth / 17 - 3);
		resz();
		window.addEventListener('resize', resz);
		return () => window.removeEventListener('resize', resz);
	}, [outTask]);

	useEffect(() => {
		fetch('http://localhost:3003/tasks')
			.then((rsp) => rsp.json())
			.then((dt) => {
				setOutTask(dt);
				if (
					url &&
					dt.filter((it) => it.id === Number(url.params.ti)).length === 0
				)
					navigate('/404', { replace: true });
			});
	}, [inTask, refresh, navigate, url]);

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
		let a = outTask.filter((it) =>
			it.task.toLowerCase().includes(inTask.toLocaleLowerCase()),
		);
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
	};

	const reTurn = () => {
		navigate(-1);
		setClear();
	};

	// useEffect(() => {
	// 	if (error === '') navigate('/404', { replace: true });
	// }, [navigate, error]);

	const Ma = () => Main(inTask, error, createTask, outTask, sortTask, findTask, ol, sz);

	const Pa = () =>
		Part(outTask, reTurn, inTask, updTask, error, delTask, setInTask, setError);

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
				<Route path="/task/:id" element={<Pa />} />
				<Route path="/" element={<Ma />} />
				<Route path="/404" element={<NotFnd />} />
				<Route path="*" element={<Navigate to="/404" replace={true} />} />
			</Routes>
		</div>
	);
}

export default App;
