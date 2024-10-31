import { Task } from '@/app/types';
import { deleteTask } from '@/app/actions/deleteTask';

interface TaskProps {
  task: Task;
}
export function TaskItem({task}: TaskProps) {
  const deleteTaskAction = deleteTask.bind(null, task._id);

  return (
    <li>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button onClick={deleteTaskAction}>delete</button>
    </li>
  )
}