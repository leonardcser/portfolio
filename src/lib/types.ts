export interface TOCSubItem {
  id: string;
  label: string;
}

export interface TOCItem {
  id: string;
  label: string;
  subsections?: TOCSubItem[];
}
