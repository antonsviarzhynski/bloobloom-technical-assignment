export interface InfinityLoaderEvent {
  complete: () => void;
  error: () => void;
  loaded: () => void;
  reset: () => void;
}
