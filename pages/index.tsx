import { getPlaylistItems, YTPlaylistItem } from "lib/youtube";
import { GetStaticProps, NextPage } from "next";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export type PageProps = {
  videos: YTPlaylistItem[];
};

const Page: NextPage<PageProps> = ({ videos }) => {
  return (
    <div>
      <section>
        <h1>Volební videa</h1>
      </section>
      <section>
        {videos.map((video) => (
          <Video {...video} />
        ))}
      </section>
    </div>
  );
};

const Video = (video: YTPlaylistItem) => (
  <div style={{ width: "400px" }}>
    <p>{video.snippet.title}</p>
    <LiteYouTubeEmbed
      id={video.snippet.resourceId.videoId}
      title={video.snippet.title}
      poster="hqdefault"
      noCookie={true}
    />
    <p>{video.snippet.description}</p>
  </div>
);

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { YOUTUBE_API_KEY = "" } = process.env;
  const playlistId = "PLPvYKKWRSI7nAl7usr46TbUZ1_3lNyxnI";
  const videos = await getPlaylistItems(YOUTUBE_API_KEY, playlistId);
  return {
    props: { videos },
  };
};

export default Page;
