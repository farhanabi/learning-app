import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import Page from '../components/Page';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { registerUser } from '../lib/api';
import NafliboxLogo from '../public/images/naflibox-logo.png';
import classNames from '../utils/classNames';

type FormValues = {
  name: string;
  email: string;
  password: string;
  'password-verification': string;
  'terms-condition': boolean;
};

const schema = z
  .object({
    name: z.string().min(1, { message: 'Wajib diisi' }),
    email: z
      .string()
      .min(1, { message: 'Wajib diisi' })
      .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, {
        message: 'Alamat email tidak valid',
      }),
    password: z.string().min(6, { message: 'Wajib diisi minimal 6 karakter' }),
    'password-verification': z.string().min(6, { message: 'Wajib diisi minimal 6 karakter' }),
    'terms-condition': z.boolean(),
  })
  .refine((data) => data.password === data['password-verification'], {
    message: 'Password tidak cocok',
    path: ['password-verification'],
  })
  .refine((data) => data['terms-condition'] === true, {
    message: 'Wajib dicentang',
    path: ['terms-condition'],
  });

export default function Daftar() {
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, email, password } = data;

    try {
      const data = await registerUser({
        username: name,
        email,
        password,
      });

      if (data.jwt) {
        setToken(data.jwt);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (token) router.replace('/');

  return (
    <Page title="Daftar" description="Daftar Naflibox untuk mendapatkan konten lebih banyak!">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="px-10 sm:mx-auto sm:px-10 sm:w-full sm:max-w-md">
          <div className="p-4 w-40">
            <Image src={NafliboxLogo} />
          </div>
          <h2 className="mt-6 text-left text-2xl text-cyan-500">Daftar gratis !</h2>
          <p className="mt-0 text-left text-2xl font-light text-gray-600">
            untuk melihat konten lainnya
          </p>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-10 py-8 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nama
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={classNames(
                      errors.name?.message && 'ring-red-500 border-red-500',
                      'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm'
                    )}
                    placeholder="Nama saya..."
                    {...register('name')}
                  />
                  {errors.name?.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.name?.message}</p>
                  )}
                </div>
              </div>

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

              <div>
                <label
                  htmlFor="password-verification"
                  className="block text-sm font-medium text-gray-700"
                >
                  Verifikasi password
                </label>
                <div className="mt-1">
                  <input
                    id="password-verification"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={classNames(
                      errors['password-verification']?.message && 'ring-red-500 border-red-500',
                      'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm'
                    )}
                    placeholder="******"
                    {...register('password-verification')}
                  />
                  {errors['password-verification']?.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors['password-verification']?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex flex-row gap-x-2 items-center justify-center px-1">
                  <input
                    id="terms-condition"
                    type="checkbox"
                    className={classNames(
                      errors['terms-condition']?.message &&
                        'accent-red-500 text-red-500 focus:ring-red-500',
                      'h-4 w-4 bg-gray-200 accent-yellow-300 text-yellow-300 focus:ring-yellow-200 border-gray-300 rounded'
                    )}
                    {...register('terms-condition')}
                  />
                  <label
                    htmlFor="terms-condition"
                    className="block w-max text-xs font-light text-gray-900"
                  >
                    Saya menyetujui akan menerima informasi dan acara terkini naflibox melalui
                    email.
                  </label>
                </div>
                {errors['terms-condition']?.message && (
                  <p className="mt-2 text-xs text-red-500">{errors['terms-condition']?.message}</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-max flex justify-center py-2 px-8 border border-transparent rounded-lg shadow-lg text-xl font-medium text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-300"
                >
                  Daftar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
}
