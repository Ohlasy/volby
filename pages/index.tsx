/* eslint-disable @next/next/no-img-element */
import { shuffleInPlace } from "lib/utils";
import { GetStaticProps, NextPage } from "next";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { Layout } from "lib/Layout";
import { Article, getAllArticles } from "lib/article";
import { PropsWithChildren } from "react";
import Script from "next/script";
import {
  getPlaylistItems,
  getVideoPermalink,
  YTPlaylistItem,
} from "lib/youtube";

export type PageProps = {
  videos: YTPlaylistItem[];
  articles: Article[];
};

const Page: NextPage<PageProps> = (props) => {
  return (
    <Layout>
      <Header />
      <VideoSection {...props} />
      <SenateSection />
      <ArticleSection {...props} />
      <FundraisingSecion />
      <Footer />
    </Layout>
  );
};

const Header = () => (
  <header className="bg-peach p-4 pb-0">
    <div className="max-w-6xl m-auto md:bg-[url(/erb.png)] bg-no-repeat bg-contain bg-right-bottom pt-6 pb-12">
      <img src="/heading.svg" alt="Ohlasy volby 22" />
      <h1 className="text-4xl leading-[2.8rem] font-bold my-5">
        Komunální a senátní volby <br className="hidden md:block" />
        v Boskovicích
      </h1>
      <p className="text-xl">
        Všechno, co potřebujete vědět, než půjdete volit
      </p>
    </div>
  </header>
);

//
// Videos
//

const VideoSection = ({ videos }: PageProps) => (
  <div className="bg-white px-5 py-12">
    <Content>
      <h2 className="font-bold text-3xl pb-6">Rozhovory s komunálními lídry</h2>
      <Grid>
        {videos.map((video) => (
          <Video {...video} key={video.id} />
        ))}
      </Grid>
    </Content>
  </div>
);

const Video = (video: YTPlaylistItem) => {
  const permalink = getVideoPermalink(video);
  const shortlink = permalink.replace("https://", "");
  return (
    <div className="pb-6 last:pb-0 mb-3 last:mb-0 border-b border-lightGray border-dotted md:border-none last:border-none">
      <div className="-mx-5 md:m-0">
        <LiteYouTubeEmbed
          id={video.snippet.resourceId.videoId}
          title={video.snippet.title}
          poster="hqdefault"
          noCookie={true}
        />
      </div>
      <h3 className="text-2xl font-bold py-4 pt-5">{video.snippet.title}</h3>
      <p className="text-lg leading-relaxed">{video.snippet.description}</p>
      <p className="text-lg mt-4">
        <a href={permalink} target="_blank" rel="noreferrer">
          {shortlink}
        </a>
      </p>
    </div>
  );
};

//
// Senate Elections
//

const SenateSection = () => (
  <>
    <SenateDebate />
    <SenateCalculator />
  </>
);

const SenateDebate = () => (
  <div className=" bg-peach px-5 border-b border-1 border-white">
    <div className="max-w-6xl m-auto py-12">
      <h2 className="font-bold text-3xl pb-6">Senátní volby</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:pr-4 text-lg">
          <p className="mb-5">
            Současně s komunálními volbami se v našem obvodu letos konají i
            senátní volby.
          </p>
          <p className="mb-5">
            Za obvod Blansko kandidují Jiří Rokos (SPD), Martin Sklář
            (Soukromníci), Drago Sukalovský (STAN), Filip Vítek (Piráti),
            Jaromíra Vítková (KDU + ODS + TOP 09, stávající senátorka), Zdeněk
            Wetter (ČSSD) a Antonín Žirovnický (ANO).
          </p>
          <p>
            Draga Sukalovského, Filipa Vítka, Jaromíru Vítkovou, Zdeňka Wettera
            a Antonína Žirovnického jsme pozvali na živou senátorskou debatu,
            jejíž zvukový záznam si zde můžete poslechnout. (Drago Sukalovský
            nakonec bohužel ze zdravotních důvodů nedorazil.)
          </p>
        </div>
        <div className="col-span-2">
          <iframe
            src="https://open.spotify.com/embed/episode/1s3TboJAo2buIoENhmf2vp"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
);

const SenateCalculator = () => (
  <div className=" bg-peach px-5">
    <div className="max-w-6xl m-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:pr-4 text-lg">
          <h2 className="font-bold text-3xl pb-6">Senátní kalkulačka</h2>
          <p className="mb-5">
            Všichni senátorští kandidáti odpověděli na otázky{" "}
            <a href="https://www.volebnikalkulacka.cz">Volební kalkulačky</a>,
            takže si zde můžete snadno vyzkoušet, se kterým se nejvíce shodnete.
            (Volební kalkulačku pro vás připravilo sdružení{" "}
            <a href="https://kohovolit.eu">KohoVolit.eu</a> s pomocí{" "}
            <a href="https://cesko.digital">Česko.Digital</a>.)
          </p>
          <p>
            Více se o kandidátech můžete dočíst v našich dvou textech: na konci
            května jsme představili pětici{" "}
            <a href="https://ohlasy.info/clanky/2022/06/senatori.html">
              Vítková, Sukalovský, Vítek, Wetter a Rokos
            </a>
            ; v srpnu pak přibyli{" "}
            <a href="https://ohlasy.info/clanky/2022/08/senatori.html">
              Antonín Žirovnický a Martin Sklář
            </a>
            .
          </p>
        </div>
        <iframe
          src="https://www.volebnikalkulacka.cz/volby/senatni-2022/49-blansko/navod?embed=seznam-zpravy"
          width="100%"
          className="h-[550px] md:col-span-2"
        ></iframe>
      </div>
    </div>
  </div>
);

//
// Articles
//

const ArticleSection = ({ articles }: PageProps) => (
  <div className="bg-white p-5 py-10 border-b border-lightGray">
    <Content>
      <h2 className="font-bold text-3xl pb-6">Přečtěte si víc</h2>
      <Grid>
        {articles.map((article) => (
          <Article {...article} key={article.relativeURL} />
        ))}
      </Grid>
    </Content>
  </div>
);

const Article = (article: Article) => {
  const pubDate = new Date(article.pubDate);
  const url = `https://ohlasy.info${article.relativeURL}`;
  return (
    <div className="text-lg border-b border-lightGray border-dotted pb-4 md:border-none last:border-none">
      <a href={url} className="font-bold leading-relaxed">
        <h3>{article.title}</h3>
      </a>
      <p className="text-gray pt-1 md:hidden">
        <FormattedDate date={pubDate} />
      </p>
      <p className="text-gray pt-1 hidden md:block">
        <span className="italic">
          <FormattedDate date={pubDate} />
        </span>{" "}
        – {article.perex}
      </p>
    </div>
  );
};

//
// Fundraising & Footer
//

const FundraisingSecion = () => (
  <div className="bg-white px-5 py-12">
    <Content>
      <h2 className="font-bold text-3xl pb-6">Líbilo se? Podpořte nás!</h2>
      <Grid>
        <img src="/tym.jpeg" alt="" className="xl:col-span-2" />
        <div data-darujme-widget-token="5cfak3j2zmvvsxns">&nbsp;</div>
        <Script id="darujme">
          {`
          +function(w, d, s, u, a, b) {
            w["DarujmeObject"] = u;
            w[u] = w[u] || function () { (w[u].q = w[u].q || []).push(arguments) };
            a = d.createElement(s); b = d.getElementsByTagName(s)[0];
            a.async = 1; a.src = "https:\/\/www.darujme.cz\/assets\/scripts\/widget.js";
            b.parentNode.insertBefore(a, b);
          }(window, document, "script", "Darujme");
          Darujme(1, "5cfak3j2zmvvsxns", "render", "https:\/\/www.darujme.cz\/widget?token=5cfak3j2zmvvsxns", "100%");
          `}
        </Script>
      </Grid>
    </Content>
  </div>
);

const Footer = () => (
  <footer className="bg-peach min-h-[300px] p-5 py-10 mt-10 text-body">
    <Content>
      <div className="lg:grid grid-cols-4 gap-6 gap-y-4 mt-4">
        <div className="mb-5">
          <img src="/heading.svg" alt="Ohlasy volby 22" />
        </div>
        <ul className="mb-7">
          <li>
            <a href="https://ohlasy.info">www.ohlasy.info</a>
          </li>
          <li className="mb-5">
            <a href="mailto:ohlasy@ohlasy.info">ohlasy@ohlasy.info</a>
          </li>
          <li>
            <a href="http://youtube.com/channel/UCylOefq0Efb-A452MlTuejw">
              YouTube
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/ohlasy">Facebook</a>
          </li>
          <li>
            <a href="https://github.com/Ohlasy/volby">GitHub</a>
          </li>
        </ul>
        <div className="col-span-2 text-gray mb-5">
          <img
            src="/gatema.png"
            alt="Gatema"
            className="w-auto h-[32px] mb-5"
          />
          <p>
            Videorozhovory pro vás připravili Tomáš Trumpeš (obsah, moderování),
            Tomáš Znamenáček (technika, střih, programování), Oto Matal
            (technika), Marek Osouch (korektury) a Robin Janásek (to lepší
            z designu tohoto webu). Výrobu rozhovorů finančně podpořila firma{" "}
            <a href="https://www.gatema.cz">Gatema</a> – děkujeme!
          </p>
        </div>
      </div>
    </Content>
  </footer>
);

//
// Common Components
//

const Grid = ({ children }: PropsWithChildren) => (
  <section className="max-w-6xl m-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {children}
  </section>
);

const Content = ({ children }: PropsWithChildren) => (
  <div className="max-w-6xl m-auto">{children}</div>
);

const FormattedDate = ({ date }: { date: Date }) => {
  const formatter = new Intl.DateTimeFormat("cs", { dateStyle: "long" });
  return <span>{formatter.format(date)}</span>;
};

//
// Data Source
//

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  // Videos
  const { YOUTUBE_API_KEY = "" } = process.env;
  const playlistId = "PLPvYKKWRSI7nAl7usr46TbUZ1_3lNyxnI";
  const videos = await getPlaylistItems(YOUTUBE_API_KEY, playlistId);
  shuffleInPlace(videos);

  // Articles
  const isElectionArticle = (a: Article) =>
    a.tags.some((t) => t === "volby 2022");
  const articles = await getAllArticles().then((list) =>
    list.filter(isElectionArticle)
  );

  console.info(`Loaded ${videos.length} videos, ${articles.length} articles.`);

  return {
    props: { videos, articles },
    revalidate: 300, // update every 5 minutes
  };
};

export default Page;
