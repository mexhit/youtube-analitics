import _ from "lodash";
import { Channels } from "@/app/dashboard/constants";
import mockData from "@/app/dashboard/data.json";
import fs from "fs";
import Link from "next/link";
import { PlayCircleFilled } from "@ant-design/icons";
import Main from "@/app/dashboard/main";
import VideoCard from "@/app/dashboard/VideoCard";
import { google } from "googleapis";
const path = "./data-1.json";

import { getYoutubeApiKey } from "@/config/youtube";

const youtube = google.youtube({
  version: "v3",
  auth: getYoutubeApiKey(),
});


const DataPage = async ({
  searchParams,
}: {
  searchParams: {
    channel: string;
    live: string;
  };
}) => {
  const isLive = Boolean(searchParams.live === "true");
  const mock = !isLive;
  const pages = 4;
  const maxResults = 50;
  const selectedChannel = _.chain(Channels)
    .values()
    .find({ id: searchParams.channel })
    .value();

  const channel = selectedChannel || Channels.BigBrother;

  const channelId = channel.id;

  let dataArray = [];

  if (mock) {
    dataArray = mockData;
  } else {
    const channelVideos: any = await getVideosFromPlaylist(channelId, pages);

    const itemsMap = channelVideos.reduce((acc: any, curr: any) => {
      const id = curr.snippet.resourceId.videoId;

      if (id) {
        acc[id] = curr;
      }

      return acc;
    }, {});

    const videoIds = channelVideos
      .map((item: any) => item.snippet.resourceId.videoId)
      .filter(Boolean);

    const statsArray: any = await getVideosById(videoIds);

    const statsMap = statsArray.reduce((acc: any, curr: any) => {
      const id = curr.id;

      if (id) {
        acc[id] = curr;
      }

      return acc;
    }, {} as any);

    const data = _.merge(itemsMap, statsMap);

    dataArray = _.values(data);
    await writeFile(dataArray);
  }

  const graphData = dataArray.map((data, index) => {
    const name = _.get(data, "snippet.title", "");
    const views = _.get(data, "statistics.viewCount", 0);
    const comments = _.get(data, "statistics.commentCount", 0);
    return {
      name: index + 1,
      views: Number(views),
      comments: Number(comments),
      title: name,
      url: `https://www.youtube.com/watch?v=${data.id}`,
    };
  });

  const totalViews = dataArray.reduce((acc, data) => {
    const views = _.get(data, "statistics.viewCount", 0);

    return acc + Number(views);
  }, 0);

  async function getChanelRecentUpload(channelId: string) {
    const params = {
      part: ["contentDetails"],
      id: channelId,
    };

    const channel: any = await youtube.channels.list(params);

    return _.get(
      channel,
      "data.items.0.contentDetails.relatedPlaylists.uploads"
    );
  }

  async function getVideosFromPlaylist(channelId: string, pages: number) {
    let nextPage = "";
    const list = [];

    try {
      const playlistId: any = await getChanelRecentUpload(channelId);

      for (let i = 0; i < pages; i++) {
        const params = {
          part: ["snippet"],
          playlistId: playlistId,
          maxResults: maxResults,
          order: ["date"],
          pageToken: nextPage,
        };

        const res: any = await youtube.playlistItems.list(params);

        nextPage = _.get(res, "data.nextPageToken", "");

        const items = res.data.items;

        list.push(...items);
      }

      return list;
    } catch (e) {
      console.log(e);
      return list;
    }
  }

  async function getVideosFromChannel(channelId: any, pages: number) {
    let nextPage = "";
    const list = [];

    try {
      for (let i = 0; i < pages; i++) {
        const params = {
          part: ["snippet"],
          channelId: channelId,
          maxResults: maxResults,
          order: ["date"],
          pageToken: nextPage,
        };

        const res: any = await youtube.search.list(params);

        nextPage = _.get(res, "data.nextPageToken", "");

        const items = res.data.items;

        list.push(...items);
      }

      return list;
    } catch (e) {
      console.log(e);
      return list;
    }
  }

  async function getVideosById(ids: Array<string>) {
    const list = [];
    const videoParams = {
      part: ["statistics"],
    };

    try {
      const idChunk = _.chunk(ids, pages);

      for (const idFromChunk of idChunk) {
        const res: any = await youtube.videos.list({
          ...videoParams,
          id: idFromChunk,
        });
        const items = res.data.items;

        list.push(...items);
      }

      return list;
      //const stats = await youtube.videos.list({ ...videoParams, id: ids });
    } catch (e) {
      console.log(e);

      return list;
    }
  }

  function formatNumber(number: number) {
    return Number(number).toLocaleString();
  }

  function writeFile(jsonData: any) {
    return new Promise((resolve, reject) => {
      return fs.writeFile(path, JSON.stringify(jsonData), (err) => {
        if (err) {
          reject(err);
        }

        resolve(path);
      });
    });
  }

  return (
    <div>
      <div className="text-4xl mb-5 flex">
        Dashboard Page ({channel.name})
        {!mock ? (
          <Link
            href={{
              query: { ...searchParams, live: false },
            }}
          >
            <PlayCircleFilled
              className="ml-3"
              style={{ fontSize: "40px", color: "red" }}
            />
          </Link>
        ) : (
          <Link
            href={{
              query: { ...searchParams, live: true },
            }}
          >
            <PlayCircleFilled
              className="ml-3"
              style={{ fontSize: "40px", color: "white" }}
            />
          </Link>
        )}
        <div className="ml-auto">Views {formatNumber(totalViews)}</div>
      </div>
      <Main tesData={graphData.reverse()} />
      <div className="flex w-full flex-wrap">
        {dataArray.map((item) => {
          const id = item.id || item?.snippet?.resourceId?.videoId;
          const key = `${item.channelId || id}-${item?.snippet?.title}`;
          return (
            <VideoCard
              key={key}
              id={id}
              title={item?.snippet?.title}
              thumbnailUrl={item?.snippet?.thumbnails?.high?.url}
              viewCount={item?.statistics?.viewCount}
            />
          );
        })}
      </div>
    </div>
  );
};

export { DataPage };
