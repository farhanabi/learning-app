import { ParsedUrlQuery } from 'querystring';

import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Page from '../../../components/Page';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { ICategory, IVideo } from '../../../interfaces';
import { getCategoryBySlug, getVideos } from '../../../lib/api';
import { getYoutubeThumbnail } from '../../../utils/youtube';

type Props = {
  videos: IVideo[];
  category: ICategory;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function CategoryIndex({ videos, category }: Props) {
  const router = useRouter();
  const { query } = router;

  const [token] = useLocalStorage('registrationKey', '');

  return (
    <Page title="Naflibox" description="Karena Pendidikan dimulai dari Rumah">
      <div className="relative h-full w-full bg-gray-50 min-h-screen mx-auto py-16">
        <div className="fixed top-0 flex flex-row items-center gap-x-4 px-8 py-4 bg-[#EDB64A] w-full z-20">
          {category ? (
            <div className={`p-1 h-10 w-10 rounded-lg`} style={{ backgroundColor: category.color }}>
              {category.image && <img src={category.image.url} alt="" />}
            </div>
          ) : (
            <div className="bg-gray-50 h-10 w-10 rounded-lg" />
          )}
          <div className="flex flex-col flex-1 text-white">
            <p className="text-md">
              Aktivitas <strong>{category?.name || query.category}</strong>
            </p>
            <p className="text-xs">{query.age} Tahun</p>
          </div>
        </div>
        {videos?.length > 0 ? (
          <div className="mt-12 px-3 max-w-lg mx-auto grid gap-8 sm:px-0 md:grid-cols-2 md:max-w-screen-md lg:mt-16 lg:grid-cols-3 lg:max-w-screen-xl">
            {videos.map((video) => (
              <div
                key={video.slug}
                className="flex flex-col mx-auto rounded-2xl shadow-lg overflow-hidden"
              >
                {video.needRegistration && !token ? (
                  <div className="group relative flex-shrink-0 bg-gradient-to-r from-yellow-300 to-yellow-50">
                    <img
                      className="h-52 w-full object-cover rounded-t-2xl rounded-b-3xl blur-sm brightness-50 md:group-hover:blur-sm md:group-hover:brightness-50"
                      src={getYoutubeThumbnail(video.youtubeUrl)}
                      alt=""
                    />
                    <Link href="/daftar">
                      <a>
                        <button className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max flex justify-center py-2 px-8 rounded-lg shadow-lg text-xl font-medium text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                          Daftar Gratis
                        </button>
                      </a>
                    </Link>
                  </div>
                ) : (
                  <Link href={`/video/${video.slug}`}>
                    <a className="flex-shrink-0 bg-gradient-to-r from-[#39E9F4] to-[#F3F3F3]">
                      <img
                        className="h-52 w-full object-cover rounded-t-2xl rounded-b-3xl"
                        src={getYoutubeThumbnail(video.youtubeUrl)}
                        alt=""
                      />
                    </a>
                  </Link>
                )}
                <div className="flex-1 flex flex-row justify-between">
                  <div className="flex px-4 py-2 bg-[#39E9F4] rounded-br-2xl items-center justify-end">
                    <span className="text-xl font-semibold">{video.minAge}+</span>thn
                  </div>
                  <div className="flex-1 px-4 py-2 bg-[#F3F3F3]">
                    <h2 className="text-sm text-black font-normal">{video.title}</h2>
                    <div className="flex flex-row gap-x-4 items-center">
                      <p className="text-xs text-gray-400">
                        <Link href={`/kategori/${video.category.slug}`}>
                          <a className="hover:underline">{video.category.name}</a>
                        </Link>{' '}
                        {/* • {video.numberOfPlay}x dimainkan oleh ibu */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full mt-16 p-8">
            <p className="text-center">Aktivitas belum tersedia</p>
          </div>
        )}
        {!token && (
          <div className="flex flex-col justify-center items-center mt-16">
            <h2 className="px-16 text-center text-sm">
              Daftar untuk melihat aktivitas lainnya secara gratis
            </h2>
            <Link href="/daftar">
              <a>
                <button className="w-max flex justify-center mt-4 py-2 px-8 border border-transparent rounded-lg shadow-lg text-xl font-medium text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                  Daftar Gratis
                </button>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Page>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const { category: categoryQuery, age } = context.params!;

  const [minAge, maxAge] = (age as string)?.split('-') || [];

  const where = {
    minAge_lte: maxAge,
    maxAge_gte: minAge,
    category: { slug: categoryQuery },
  };

  try {
    const category = await getCategoryBySlug(categoryQuery as string);
    const videos = await getVideos(where);
    return videos || category
      ? { props: { videos, category }, revalidate: 60 }
      : { notFound: true };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};
