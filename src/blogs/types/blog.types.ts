export interface CreateBlogs {
  title: string;
  description: string;
  image: string;
}

export interface UpdateBlogs {
  title?: string;
  description?: string;
  image?: string;
}
