import { Routes, Route, Link, useNavigate, Navigate, useMatch } from 'react-router-dom';
import styles from './task.module.css';
import { useState, useRef } from 'react';
import { Clear, Cut, Field, Head, Main, NotFnd, Part } from './components';
import { Change, Create, Delete, Find, GetTsk, ReTurn, Sort, Update } from './components';

export function App() {
	const [inTask, setInTask] = useState('');
	const [outTask, setOutTask] = useState([]);
	const [error, setError] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [sz, setSz] = useState(0);
	const navigate = useNavigate();

	const ol = useRef(null);
	const url = useMatch('/task/:ti');

	Cut(ol, outTask, setSz);
	GetTsk(inTask, navigate, refresh, setOutTask, url);

	const setClear = () => Clear(refresh, setError, setInTask, setRefresh);
	const inputChange = ({ target }) => Change({ target }, outTask, setError, setInTask);
	const createTask = () => Create(inTask, setClear);
	const sortTask = () => Sort(outTask, setOutTask);
	const findTask = () => Find(inTask, outTask, setError, setOutTask);
	const updTask = (e, i) => Update(e, i, inTask, setClear);
	const delTask = (e, i) => Delete(e, i, navigate);
	const reTurn = () => ReTurn(navigate, setClear);

	return (
		<div className={styles.wrap}>
			<Head />
			<Field
				error={error}
				inputChange={inputChange}
				inTask={inTask}
				setClear={setClear}
			/>
			<Routes>
				<Route
					path="/task/:ti"
					element={
						<Part
							delTask={delTask}
							error={error}
							inTask={inTask}
							outTask={outTask}
							reTurn={reTurn}
							setError={setError}
							setInTask={setInTask}
							updTask={updTask}
							url={url}
						/>
					}
				/>
				<Route
					path="/"
					element={
						<Main
							createTask={createTask}
							error={error}
							findTask={findTask}
							inTask={inTask}
							Link={Link}
							ol={ol}
							outTask={outTask}
							sortTask={sortTask}
							sz={sz}
						/>
					}
				/>
				<Route path="*" element={<Navigate to="/404" replace={true} />} />
				<Route path="/404" element={<NotFnd />} />
			</Routes>
		</div>
	);
}

export default App;
