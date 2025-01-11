import styles from './field.module.css';
import { Change } from '../../../components';

export const Field = ({ error, inTask, outTask, setClear, setError, setInTask }) => {
	const inputChange = ({ target }) => Change({ target }, outTask, setError, setInTask);
	return (
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
	);
};
