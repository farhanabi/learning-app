import { AppProps } from "next/app";

import "../styles/global-styles.css";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default CustomApp;
