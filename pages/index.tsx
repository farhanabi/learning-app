import { RadioGroup } from '@headlessui/react';
import { ArrowRightIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Page from '../components/Page';
import { ageSettings } from '../data';
import { getCategories } from '../lib/api';
import NafliboxLogo from '../public/images/naflibox-logo.png';
import classNames from '../utils/classNames';

export default function Index({ categories }: any) {
  const [selectedAge, setSelectedAge] = useState(ageSettings[0]?.slug);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const activeCategory = categories.find((c: { slug: string }) => c.slug === selectedCategory);

  return (
    <Page title="Naflibox" description="Karena Pendidikan dimulai dari Rumah">
      <div className="bg-gray-50 mx-auto max-w-sm h-5/6">
        <div className="p-4 w-40">
          <Image src={NafliboxLogo} />
        </div>
        <div className="max-w-xs mx-auto py-0">
          <h2 className="text-md mb-4 px-4">Bunda ingin bermain aktifitas umur berapa?</h2>
          <RadioGroup value={selectedAge} onChange={setSelectedAge}>
            <RadioGroup.Label className="sr-only">Age Settings</RadioGroup.Label>
            <div className="bg-white rounded-md space-y-2">
              {ageSettings.map((setting) => (
                <RadioGroup.Option
                  key={setting.name}
                  value={setting.slug}
                  className={({ checked }) =>
                    classNames(
                      checked && 'z-10',
                      'flex relative items-center bg-cyan-400 border-cyan-400 border px-4 py-2 cursor-pointer rounded-2xl focus:outline-none'
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <span
                        className={classNames(
                          checked ? 'bg-yellow-400 border-yellow-400' : 'bg-white border-gray-300',
                          active ? 'ring-2 ring-offset-2 ring-yellow-400 border-yellow-400' : '',
                          'h-6 w-6 mt-0.5 cursor-pointer rounded-lg border flex items-center justify-center'
                        )}
                        aria-hidden="true"
                      />
                      <div className="w-full ml-3 flex flex-col text-right">
                        <RadioGroup.Label
                          as="span"
                          className="block text-lg text-stone-600 font-semibold"
                        >
                          {setting.name}
                        </RadioGroup.Label>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <h2 className="text-md my-4 px-4">Bunda ingin mempelajari kategori apa?</h2>
          <RadioGroup value={selectedCategory} onChange={setSelectedCategory}>
            <RadioGroup.Label className="sr-only">Category</RadioGroup.Label>
            <div className="mx-auto p-1 grid grid-cols-3 gap-2 max-h-72 overflow-y-scroll">
              {categories.length > 0 &&
                categories.map((category: any) => (
                  <RadioGroup.Option key={category.slug} value={category.slug}>
                    {({ checked }) => (
                      <>
                        <div
                          className={classNames(
                            checked && category.isAvailable && `ring-4 ring-yellow-400`,
                            `relative w-24 h-24 justify-center border rounded-3xl cursor-pointer sm:flex focus:outline-none`
                          )}
                          style={{
                            backgroundColor: category.isAvailable ? category.color : '#AAAAAA',
                          }}
                          aria-hidden="true"
                        >
                          <div
                            className={classNames(
                              'absolute -left-1 -top-1 w-20 h-20',
                              !category.isAvailable && 'grayscale'
                            )}
                          >
                            <img src={category.image.url} alt={category.name} />
                          </div>
                        </div>
                        <RadioGroup.Label
                          as="p"
                          className="w-full font-medium text-center text-stone-600 text-md"
                        >
                          {category.name}
                        </RadioGroup.Label>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
            </div>
          </RadioGroup>
          <div className="flex flex-row gap-x-2 justify-between mt-4">
            <p className="text-xs font-light">
              {activeCategory?.isAvailable ? activeCategory.description : null}
            </p>
            <Link href={`/kategori/${selectedCategory}/${selectedAge}`}>
              <a>
                <button
                  disabled={!activeCategory?.isAvailable}
                  className="w-max flex gap-x-2 justify-between items-center py-2 px-8 border border-transparent rounded-xl shadow-lg text-xl font-medium text-black bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-300"
                >
                  Pilih ide
                  <ArrowRightIcon className="h-6 w-6" />
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps() {
  const categories = (await getCategories()) || [];
  return {
    props: { categories },
    revalidate: 60,
  };
}
