import { Routes, Route, useNavigate, Navigate, useMatch } from 'react-router-dom';
import styles from './task.module.css';
import { useState, useRef } from 'react';
import { Clear, CutTsk, Field, GetTsk, Head, Main, NotFnd, Part } from './components';

export function App() {
	const [inTask, setInTask] = useState('');
	const [outTask, setOutTask] = useState([]);
	const [error, setError] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [sz, setSz] = useState(0);
	const navigate = useNavigate();

	const ol = useRef(null);
	const url = useMatch('/task/:ti');

	CutTsk(ol, outTask, setSz);
	GetTsk(inTask, navigate, refresh, setOutTask, url);
	const setClear = () => Clear(refresh, setError, setInTask, setRefresh);

	return (
		<div className={styles.wrap}>
			<Head />
			<Field
				error={error}
				inTask={inTask}
				outTask={outTask}
				setClear={setClear}
				setError={setError}
				setInTask={setInTask}
			/>
			<Routes>
				<Route
					path="/task/:ti"
					element={
						<Part
							error={error}
							inTask={inTask}
							navigate={navigate}
							outTask={outTask}
							setClear={setClear}
							setError={setError}
							setInTask={setInTask}
							url={url}
						/>
					}
				/>
				<Route
					path="/"
					element={
						<Main
							error={error}
							inTask={inTask}
							ol={ol}
							outTask={outTask}
							setClear={setClear}
							setError={setError}
							setOutTask={setOutTask}
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
