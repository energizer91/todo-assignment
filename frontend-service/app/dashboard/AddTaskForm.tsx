import { addTask } from '@/app/actions/addTask';
import * as React from 'react';

export async function AddTaskForm() {
  return (
    <form action={addTask}>
      <label>
        title
        <input type="text" name="title" />
      </label>
      <label>
        description
        <textarea name="description" />
      </label>
      <button type="submit">add</button>
    </form>
  )
}