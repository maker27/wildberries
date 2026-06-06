'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';

import { useUserStore } from '@/entities/user';
import { normalizePhone } from '../model/authSchema';

import { CodeStep } from './CodeStep';
import { PhoneStep } from './PhoneStep';

type AuthByPhoneFormProps = {
  redirectTo: string;
};

function AuthRoutes({ redirectTo }: AuthByPhoneFormProps) {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handlePhoneSubmit = (value: string) => {
    setPhone(value);
    navigate('/code');
  };

  const handleCodeSubmit = () => {
    setUser({
      id: crypto.randomUUID(),
      phone: normalizePhone(phone),
      createdAt: new Date().toISOString(),
    });

    router.replace(redirectTo);
  };

  return (
    <Routes>
      <Route element={<PhoneStep defaultValue={phone} onSubmit={handlePhoneSubmit} />} path="/" />
      <Route
        element={<CodeStep onBack={() => navigate('/')} onSubmit={handleCodeSubmit} phone={phone} />}
        path="/code"
      />
    </Routes>
  );
}

export function AuthByPhoneForm({ redirectTo }: AuthByPhoneFormProps) {
  return (
    <MemoryRouter initialEntries={['/']}>
      <AuthRoutes redirectTo={redirectTo} />
    </MemoryRouter>
  );
}
