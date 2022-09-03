/* eslint-disable @next/next/no-img-element */
import { shuffleInPlace } from "lib/utils";
import { GetStaticProps, NextPage } from "next";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { Layout } from "lib/Layout";
import { Article, getAllArticles } from "lib/article";
import { PropsWithChildren } from "react";
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
      <BetaBanner />
      <VideoSection {...props} />
      <ArticleSection {...props} />
      <Footer />
    </Layout>
  );
};

const BetaBanner = () => (
  <div className="bg-lightBrown text-white px-4 py-2 lg:text-center">
    <Content>⚠️ Testovací verze webu, nešířit, prosím.</Content>
  </div>
);

const Header = () => (
  <header className="bg-peach p-4 pb-0">
    <div className="max-w-6xl m-auto md:bg-[url(/erb.png)] bg-no-repeat bg-contain bg-right-bottom pt-6 pb-12">
      <img src="/heading.svg" alt="Ohlasy volby 22" />
      <h1 className="text-4xl leading-normal font-bold my-3">
        Komunální a senátní volby <br className="hidden md:block" />
        v Boskovicích
      </h1>
      <p className="text-xl">
        Všechno, co potřebujete vědět, než půjdete volit
      </p>
    </div>
  </header>
);

const VideoSection = ({ videos }: PageProps) => (
  <div className="bg-white p-5 md:border-b border-lightGray md:mb-10">
    <Content>
      <h2 className="font-bold text-3xl py-6">Rozhovory a články</h2>
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
    <div className="pb-6 mb-3 border-b border-lightGray border-dotted md:border-none">
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

const ArticleSection = ({ articles }: PageProps) => (
  <div className="bg-white p-5 pt-1">
    <Content>
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
        <FormattedDate date={pubDate} /> • {article.perex}
      </p>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-peach min-h-[300px] p-5 py-10 mt-10 text-body">
    <Content>
      <div className="lg:grid grid-cols-4 gap-6 gap-y-4 mt-4">
        <div className="mb-5">
          <img src="/heading.svg" alt="Ohlasy volby 22" />
        </div>
        <ul className="mb-7">
          <li>
            <a href="https://ohlasy.info">ohlasy.info</a>
          </li>
          <li>
            <a href="mailto:ohlasy@ohlasy.info">ohlasy@ohlasy.info</a>
          </li>
          <li>
            <a href="http://youtube.com/channel/UCylOefq0Efb-A452MlTuejw">
              YouTube
            </a>
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
            Tomáš Znamenáček (technika, střih, programování) a Oto Matal
            (technika). Výrobu rozhovorů finančně podpořila firma{" "}
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
