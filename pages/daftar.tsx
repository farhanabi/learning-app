import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Page from '../components/Page';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { registerUser } from '../lib/api';
import NafliboxLogo from '../public/images/naflibox-logo.png';

export default function Daftar() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [tncChecked, setTncChecked] = useState(false);

  const [token, setToken] = useLocalStorage('registrationKey', '');

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nama
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
                    placeholder="Nama saya..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Alamat email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
                    placeholder="naflibox@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
                    placeholder="*****"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
                    name="password-verification"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
                    placeholder="*****"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-x-2 items-center justify-center px-1">
                <input
                  id="terms-condition"
                  name="terms-condition"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-200 accent-yellow-300 text-yellow-300 focus:ring-yellow-200 border-gray-300 rounded"
                  checked={tncChecked}
                  onChange={(e) => setTncChecked(e.target.checked)}
                />
                <label
                  htmlFor="terms-condition"
                  className="block w-max text-xs font-light text-gray-900"
                >
                  Saya menyetujui akan menerima informasi dan acara terkini naflibox melalui email.
                </label>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-max flex justify-center py-2 px-8 border border-transparent rounded-lg shadow-lg text-xl font-medium text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-300"
                  disabled={!tncChecked || !name || !email || passwordConfirmation !== password}
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
