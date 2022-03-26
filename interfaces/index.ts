export type ICategory = {
  slug: string;
  name: string;
  image: {
    url: string;
  };
  color: string;
};

export type IVideo = {
  slug: string;
  title: string;
  href: string;
  category: ICategory;
  date: string;
  datetime: string;
  imageUrl: string;
  minAge: number;
  maxAge: number;
  numberOfPlay: number;
  needRegistration: boolean;
  objective: string;
  items: string[];
  youtubeUrl: string;
};
