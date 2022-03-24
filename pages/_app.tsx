import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AppProps } from 'next/app';

import '../styles/globals.css';

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag('config', 'G-REQ86BEYNT', {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default CustomApp;
