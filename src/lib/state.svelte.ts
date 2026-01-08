export const headerState = $state({
  isCollapsed: false,
});

export type MediaPreviewType = 'image' | 'video';

export interface MediaPreviewState {
  isOpen: boolean;
  type: MediaPreviewType | null;
  src: string | null;
  description: string | null;
  figureNumber: number | null;
}

export const mediaPreviewState: MediaPreviewState = $state({
  isOpen: false,
  type: null,
  src: null,
  description: null,
  figureNumber: null,
});

export function openMediaPreview(
  type: MediaPreviewType,
  src: string,
  description: string,
  figureNumber: number
) {
  mediaPreviewState.isOpen = true;
  mediaPreviewState.type = type;
  mediaPreviewState.src = src;
  mediaPreviewState.description = description;
  mediaPreviewState.figureNumber = figureNumber;
}

export function closeMediaPreview() {
  mediaPreviewState.isOpen = false;
  mediaPreviewState.type = null;
  mediaPreviewState.src = null;
  mediaPreviewState.description = null;
  mediaPreviewState.figureNumber = null;
}
