import { ParsedUrlQuery } from 'querystring';

import { ChevronLeftIcon } from '@heroicons/react/solid';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import Page from '../../components/Page';
import { IVideo } from '../../interfaces';
import { getVideoBySlug } from '../../lib/api';
import { extractYoutubeID } from '../../utils/youtube';

type Props = {
  video: IVideo;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function VideoPage({ video }: Props) {
  const router = useRouter();
  return (
    <Page title="Naflibox" description="Karena Pendidikan dimulai dari Rumah">
      <div className="relative h-full w-full bg-gray-50 min-h-screen mx-auto py-16">
        <div className="fixed top-0 flex flex-col px-8 py-4 bg-[#EDB64A] w-full z-20">
          <div className="flex flex-row items-center gap-x-4 ">
            <div
              className={`p-1 h-10 w-10 rounded-lg`}
              style={{ backgroundColor: video?.category.color }}
            >
              {video?.category.image.url && <img alt="" src={video?.category.image.url} />}
            </div>
            <div className="flex flex-col flex-1 text-white">
              <p className="text-md">
                Aktivitas <strong>{video?.category.name}</strong>
              </p>
              <p className="text-xs">
                {video?.minAge}-{video?.maxAge} Tahun
              </p>
            </div>
          </div>
          <p className="text-white font-semibold mt-4">{video?.title}</p>
        </div>
        <div className="mt-16 max-w-lg mx-auto grid gap-8 md:max-w-screen-md lg:max-w-screen-xl">
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${extractYoutubeID(video?.youtubeUrl)}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          />
        </div>

        <div className="flex flex-col justify-center bg-[#FAE8B3] mt-8 mx-4 pb-24 pt-2 px-2 rounded-xl">
          <div className="bg-white w-full p-4 rounded-xl">
            <p className="font-bold text-lg">Tujuan Aktivitas</p>
            <h2 className="mt-1">{video?.objective}</h2>
          </div>
          {video?.items?.length > 0 && (
            <div className="mt-4 px-4">
              <h2 className="font-medium">Bahan yang perlu bunda persiapkan</h2>
              <ul className="mt-2">
                {video?.items.map((item) => (
                  <li key={item}>
                    <div className="flex flex-row py-1 items-center">
                      <div className="h-4 w-4 mr-2 rounded-md bg-white"></div>
                      <p>{item}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 w-full bg-[#31BFC8] rounded-t-xl">
          <button className="p-4 text-white" onClick={() => router.back()}>
            <ChevronLeftIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    </Page>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const { slug } = context.params!;

  let video: IVideo;
  try {
    video = await getVideoBySlug(slug as string);
    if (video) {
      return { props: { video }, revalidate: 60 };
    } else return { notFound: true };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};
