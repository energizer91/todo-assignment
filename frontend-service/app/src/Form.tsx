'use client';
import * as React from 'react';
import NextForm from 'next/form';

interface FormProps {
  action: (formData: FormData) => Promise<void>;
  children?: React.ReactNode;
}

export const Form = ({ action, children }: FormProps) => {
  const [error, setError] = React.useState<string | null>(null);
  const handleAction = async (data: FormData) => {
    setError(null);
    try {
      await action(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <NextForm action={handleAction}>
      {children}
      {error && <div style={{color: 'red'}}>{error}</div>}
    </NextForm>
  );
};