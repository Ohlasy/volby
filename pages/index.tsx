import { shuffleInPlace } from "lib/utils";
import { GetStaticProps, NextPage } from "next";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Layout } from "lib/Layout";
import {
  getPlaylistItems,
  getVideoPermalink,
  YTPlaylistItem,
} from "lib/youtube";

export type PageProps = {
  videos: YTPlaylistItem[];
};

const Page: NextPage<PageProps> = (props) => {
  return (
    <Layout>
      <BetaBanner />
      <VideoSection {...props} />
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
    <section className="max-w-7xl m-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {videos.map((video) => (
        <Video {...video} key={video.id} />
      ))}
    </section>
  </div>
);

const Video = (video: YTPlaylistItem) => {
  const permalink = getVideoPermalink(video);
  const shortlink = permalink.replace("https://", "");
  return (
    <div key={video.id} className="p-6 bg-white rounded-xl">
      <LiteYouTubeEmbed
        id={video.snippet.resourceId.videoId}
        title={video.snippet.title}
        poster="hqdefault"
        noCookie={true}
      />
      <h2 className="text-2xl mt-6 text-gray-800 font-semibold mb-2">
        {video.snippet.title}
      </h2>
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
    </div>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { YOUTUBE_API_KEY = "" } = process.env;
  const playlistId = "PLPvYKKWRSI7nAl7usr46TbUZ1_3lNyxnI";
  const videos = await getPlaylistItems(YOUTUBE_API_KEY, playlistId);
  shuffleInPlace(videos);
  return {
    props: { videos },
    revalidate: 300, // update every 5 minutes
  };
};

export default Page;
