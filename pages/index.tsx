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
      <BetaBanner />
      <VideoSection {...props} />
      <ArticleSection {...props} />
    </Layout>
  );
};

const BetaBanner = () => (
  <div className="text-center bg-red-500 text-white p-2 w-full">
    Tohle je testovací verze webu, nešířit, prosím.
  </div>
);

const VideoSection = ({ videos }: PageProps) => (
  <div className="bg-slate-100 p-5 pb-20">
    <Grid>
      {videos.map((video) => (
        <Video {...video} key={video.id} />
      ))}
    </Grid>
  </div>
);

const Video = (video: YTPlaylistItem) => {
  const permalink = getVideoPermalink(video);
  const shortlink = permalink.replace("https://", "");
  return (
    <Card key={video.id}>
      <LiteYouTubeEmbed
        id={video.snippet.resourceId.videoId}
        title={video.snippet.title}
        poster="hqdefault"
        noCookie={true}
      />
      <Header>{video.snippet.title}</Header>
      <p className="text-gray-600">{video.snippet.description}</p>
      <p className="text-xs mt-4">
        <a
          style={{ color: "rgb(148, 82, 0)" }}
          href={permalink}
          target="_blank"
          rel="noreferrer"
        >
          {shortlink}
        </a>
      </p>
    </Card>
  );
};

const ArticleSection = ({ articles }: PageProps) => (
  <div className="bg-slate-300 p-5 pb-20 pt-20">
    <Grid>
      {articles.map((article) => (
        <Article {...article} key={article.relativeURL} />
      ))}
    </Grid>
  </div>
);

const Article = (article: Article) => {
  return (
    <Card>
      <div className="aspect-video overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.coverPhoto!} alt="" />
      </div>
      <Header>{article.title}</Header>
      <p className="text-gray-600">{article.perex}</p>
    </Card>
  );
};

//
// Common Components
//

const Header = ({ children }: PropsWithChildren) => (
  <h2 className="text-2xl mt-6 text-gray-800 font-semibold mb-2">{children}</h2>
);

const Card = ({ children }: PropsWithChildren) => (
  <div className="p-6 bg-white rounded-xl drop-shadow">{children}</div>
);

const Grid = ({ children }: PropsWithChildren) => (
  <section className="max-w-7xl m-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
    {children}
  </section>
);

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
