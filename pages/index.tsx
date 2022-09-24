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
      <Results />
      <VideoSection {...props} />
      <MayorDebate />
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
        Všechno, co potřebujete vědět,{" "}
        <span className="line-through">než půjdete</span> i když už jste byli
        volit
      </p>
    </div>
  </header>
);

//
// Results
//

const Results = () => (
  <div className="bg-white px-5 py-12 border-b border-lightGray">
    <Content>
      <h2 className="font-bold text-3xl pb-6">
        Jak to dopadlo? Boskovice si zvolily Změnu. A Naše Boskovice
      </h2>
      <MunicipalityResults />
      <SenateResults />
    </Content>
  </div>
);

const MunicipalityResults = () => (
  <section className="max-w-6xl m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
    <div className="text-lg col-span-1 md:col-span-2 lg:col-span-1 lg:pr-4">
      <p className="italic mb-3">
        Volby v Boskovicích skončily velmi těsným výsledkem. Vyhrálo je nakonec
        nové uskupení Změna22, které vede architektka Jana Syrovátková. Jen
        velmi těsně je následují Naše Boskovice vedené Lukášem Holíkem. Propadla
        koalice SPOLU, která aktuálně Boskovicím vládla a byla favoritem voleb.
        Udrželi se sociální demokraté a mírně oslabili Piráti. Mandát nakonec
        získala i SPD a Trikolora.
      </p>

      <p>
        Rozdíl mezi oběma uskupeními na prvních dvou příčkách činí něco přes osm
        set hlasů, což představuje asi 30 lidí. V komunálních volbách má každý
        volič v Boskovicích 27 hlasů. Změna22 i Naše Boskovice získaly po sedmi
        mandátech, šest mandátů má koalice SPOLU, čtyři obhájili sociální
        demokraté, dva mandáty mají Piráti a jeden má nakonec i uskupení SPD a
        Trikolora, které sice nedosáhlo na 5 procent hlasů, ale vzhledem ke
        sníženému počtu kandidátů se mu snížilo podle zákona i povinné kvórum.
        Voliči odmítli v novém zastupitelstvu účast komunistů, STANu, Boskováků
        a Cesty K-lidem.
      </p>
    </div>
    <div className="p-5 bg-[#eee]">
      <iframe
        title="Celkové výsledky voleb"
        aria-label="TBD"
        src="https://datawrapper.dwcdn.net/u4hJ6/1/"
        scrolling="no"
        width="100%"
        height="400"
      ></iframe>
    </div>
    <div className="p-5 bg-[#eee]">
      <iframe
        title="Získané mandáty"
        aria-label="TBD"
        src="https://datawrapper.dwcdn.net/edUX2/2/"
        scrolling="no"
        width="100%"
        height="500"
      ></iframe>
    </div>
  </section>
);

const SenateResults = () => (
  <section className="max-w-6xl m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="text-lg lg:pr-4">
      <p>
        Druhé kolo <b>senátních voleb</b> bude na Blanensku nakonec nejlépe
        odpovídat tomu, že se do nich promítá především celostátní politika.
        Postupuje tedy Jaromíra Vítková z nejsilnějšího vládního uskupení SPOLU
        a Antonín Žirovnický z nejsilnějšího opozičního subjektu ANO 2011. Druhé
        kolo voleb proběhne v pátek 30. září a v sobotu 1. října. Jaromíra
        Vítková získala v prvním kole cca 30 procent hlasů, Antonín Žirovnický
        18 procent. Sčítání hlasů neprobíhalo nijak dramaticky, oba postupující
        vedli prakticky od sečtení prvních okrsků.
      </p>
    </div>
    <div className="p-5 bg-[#eee] lg:col-span-2">
      <iframe
        title="Celkové výsledky voleb"
        aria-label="TBD"
        src="https://datawrapper.dwcdn.net/74oyd/2/"
        scrolling="no"
        width="100%"
        height="300"
      ></iframe>
    </div>
  </section>
);

//
// Videos
//

const VideoSection = ({ videos }: PageProps) => (
  <div className="bg-white px-5 py-12 border-b border-lightGray">
    <Content>
      <h2 className="font-bold text-3xl pb-6">Rozhovory s komunálními lídry</h2>
      <Grid>
        {videos.map((video) => (
          <Video {...video} key={video.id} />
        ))}
        <PodcastBox />
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

const PodcastBox = () => (
  <div className="bg-[#eee] -mx-5 md:m-0">
    <div className="aspect-video overflow-hidden bg-[#3B4351]">
      <img
        src="https://i.ohlasy.info/i/waibo6c.png"
        className="h-full m-auto"
        alt="Ohlasy Podcast"
      />
    </div>
    <div className="px-5 pb-10">
      <h3 className="text-2xl font-bold py-4 pt-5">Raději posloucháte?</h3>
      <p className="text-lg">
        Všechny volební rozhovory i debaty si můžete poslechnout v našem
        podcastu na všech běžných platformách, například{" "}
        <a href="https://open.spotify.com/show/5WSL7RX8M7vaL7HQ1uUj10">
          Spotify
        </a>
        ,{" "}
        <a href="https://podcasts.apple.com/cz/podcast/ohlasy-podcast/id1480020344">
          Apple Podcasts
        </a>{" "}
        nebo{" "}
        <a href="https://podcasts.google.com/feed/aHR0cHM6Ly9vaGxhc3kuaW5mby9wb2RjYXN0LnhtbA">
          Google Podcasts
        </a>
        .
      </p>
    </div>
  </div>
);

//
// Mayor Debate
//

const MayorDebate = () => (
  <div className="bg-white px-5 py-12">
    <Content>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <h2 className="font-bold text-3xl pb-6">
            Debata s kandidáty na starost(k)u
          </h2>
          <p className="text-lg">
            K debatě před komunálními volbami Ohlasy pozvaly pět lídrů, kteří se
            deklarují jako kandidáti na starost(k)u Boskovic. Diskutovali
            Michaela Žejšková (SPOLU), Petr Malach (ČSSD), Lukáš Holík (Naše
            Boskovice), Radek Šamšula (Piráti) a Jana Syrovátková (Změna22).
            Hlavním tématem debaty bylo samotné fungování boskovické komunální
            politiky a politiky vůbec. Jak ji vnímají hlavní političtí hráči z
            nastupující generace? (Omlouváme se za horší kvalitu zvuku v první
            části záznamu.)
          </p>
        </div>
        <div className="col-span-2">
          <LiteYouTubeEmbed
            id="KwIXt-nOF6w"
            title="Ohlasy naživo: Kandidáti na starost(k)u"
            poster="hqdefault"
            noCookie={true}
          />
        </div>
      </div>
    </Content>
  </div>
);

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
            Tento web pro vás připravili Tomáš Trumpeš (obsah, moderování),
            Tomáš Znamenáček (technika, střih, programování), Oto Matal
            (technika), Magdalena Zindulková (technika, střih), Marek Osouch
            (korektury) a Robin Janásek (to lepší z designu tohoto webu). Výrobu
            rozhovorů s lídry stran finančně podpořila firma{" "}
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
