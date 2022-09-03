import Head from "next/head";
import Plausible from "plausible-tracker";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const plausible = Plausible({
      domain: "ohlasy.info",
    });
    plausible.trackPageview({ url: "https://ohlasy.info/volby/" });
  }, []);
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>Komunální a senátní volby 2022</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>
      {children}
    </div>
  );
};
