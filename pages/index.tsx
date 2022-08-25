import { getPlaylistItems, YTPlaylistItem } from "lib/youtube";
import { GetStaticProps, NextPage } from "next";

export type PageProps = {
  videos: YTPlaylistItem[];
};

const Page: NextPage<PageProps> = ({ videos }) => {
  return (
    <div>
      <h1>Volební videa</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>{video.snippet.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { YOUTUBE_API_KEY = "" } = process.env;
  const playlistId = "PLPvYKKWRSI7nAl7usr46TbUZ1_3lNyxnI";
  const videos = await getPlaylistItems(YOUTUBE_API_KEY, playlistId);
  return {
    props: { videos },
  };
};

export default Page;
