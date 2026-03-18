export interface TOCSubItem {
  id: string;
  label: string;
}

export interface TOCItem {
  id: string;
  label: string;
  subsections?: TOCSubItem[];
}

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
}
