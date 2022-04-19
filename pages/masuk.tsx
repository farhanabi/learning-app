import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import Page from '../components/Page';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { loginUser } from '../lib/api';
import NafliboxLogo from '../public/images/naflibox-logo.png';
import WhatsAppLogo from '../public/images/whatsapp.png';
import classNames from '../utils/classNames';

type FormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Wajib diisi' })
    .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, {
      message: 'Alamat email tidak valid',
    }),
  password: z.string().min(6, { message: 'Wajib diisi minimal 6 karakter' }),
});

export default function Masuk() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const [token, setToken] = useLocalStorage('registrationKey', '');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(''), 5000);
    }
  }, [errorMessage]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;

    try {
      const login = await loginUser({
        email,
        password,
      });

      if (login.jwt) {
        setToken(login.jwt);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Kombinasi email dan password tidak valid');
    }
  };

  if (token) router.replace('/');

  return (
    <Page title="Login" description="Masuk, dan jadilah bunda terbaik untuknya!">
      <div className="relative min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="px-10 sm:mx-auto sm:px-10 sm:w-full sm:max-w-md">
          <Link href="/">
            <a>
              <div className="w-40">
                <Image src={NafliboxLogo} />
              </div>
            </a>
          </Link>
          <h2 className="mt-6 text-left text-2xl text-cyan-500">Masuk,</h2>
          <p className="mt-0 text-left text-2xl font-light text-gray-600">
            dan jadilah bunda terbaik untuknya!
          </p>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-10 py-8 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Alamat email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={classNames(
                      errors.email?.message && 'ring-red-500 border-red-500',
                      'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm'
                    )}
                    placeholder="naflibox@email.com"
                    {...register('email')}
                  />
                  {errors.email?.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.email?.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={classNames(
                      errors.password?.message && 'ring-red-500 border-red-500',
                      'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm'
                    )}
                    placeholder="******"
                    {...register('password')}
                  />
                  {errors.password?.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.password?.message}</p>
                  )}
                </div>
              </div>
              {errorMessage && <p className="text-center text-xs text-red-500">{errorMessage}</p>}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-max flex justify-center py-2 px-8 border border-transparent rounded-lg shadow-lg text-xl font-medium text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-300"
                >
                  Masuk
                </button>
              </div>
              <div className="flex justify-center text-sm">
                <p>Belum punya akun? </p>
                <Link href="/daftar">
                  <a className="text-blue-800 ml-1 underline">Daftar Disini</a>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="fixed bottom-4 right-4">
          <Link href="https://api.whatsapp.com/send?phone=6282217423034&text=haloo%20Naflibox!">
            <a>
              <Image src={WhatsAppLogo} />
            </a>
          </Link>
        </div>
      </div>
    </Page>
  );
}
