import { notFound, redirect } from 'next/navigation';
import { Task } from '@/app/types';
import { cookies } from 'next/headers';
import { AddTaskForm } from '@/app/dashboard/AddTaskForm';
import { TaskItem } from '@/app/dashboard/TaskItem';
import { Page } from '@/app/ui/Page';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.SITE_URL}/api/tasks`, {
    headers: {
      Cookie: cookieStore.toString()
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      redirect('/login');
    }

    notFound();
  }

  const items = await response.json() as Task[];

  return (
    <Page>
      <h1>List of tasks</h1>
      <AddTaskForm />
      <ul>
        {items.map((item) => (
          <TaskItem key={item._id} task={item} />
        ))}
      </ul>
    </Page>
  );
}