import { useState } from 'react'
import './App.css'

interface Props {
  task: string;
  isCompleted: boolean;
}

function App() {
  const [list, setList] = useState<Props[]>([])
  const [inputTask, setInputTask] = useState('')

  const handleClick = () => {
    let task = inputTask.trim();
    if (task.length === 0) return;

    if (list.find(x => x.task === task)) return;
    
    setList([...list, { isCompleted: false, task }]);
    setInputTask('');
  };

    const handleToggle = (taskName: string) => {
    const updatedList = list.map(item =>
      item.task === taskName
        ? { ...item, isCompleted: !item.isCompleted }
        : item
    );
    setList(updatedList);
  };

  const onRemoveTask = (taskName: string) => {
    const updatedList = list.filter(item => item.task !== taskName);
    setList(updatedList);
  };

  return (
    <>
    <div>
      <h1>Mi lista de tareas</h1>
      <div>
        <input
         placeholder='Escribe una tarea'
          type='text'
          value={inputTask}
          onChange={(event) => setInputTask(event.target.value)}
           />
        <button
        className="add-btn"
        onClick={handleClick}>Agregar</button>
      </div>
      <div>
      <h1>Lista de tareas</h1>
      {
        list.length == 0 ? <p>No hay tareas agregadas.</p> :
        list.map((task) => (
            <div className="task-item" key={task.task}>
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggle(task.task)}
                />
                <span className={task.isCompleted ? 'completed' : ''}>
                  {task.task} - {task.isCompleted ? 'Completada' : 'Pendiente'}
                </span>
              </div>
              <button
              className="delete-btn"
              onClick={() => onRemoveTask(task.task)}
              >Eliminar</button>
            </div>
        ))
      }
      </div>
    </div>
    </>
  )
}

export default App
