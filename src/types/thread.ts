export enum Visibility {
  PUBLIC = "public",
  PRIVATE = "private",
  FOLLOWERS_ONLY = "followers_only",
}

// types/thread.ts
export type MediaEntity = {
  id: number;
  url: string;
  type: string;
  fileName: string;
};

export type UserResponseDto = {
  id: number;
  username: string;
  displayId: string;
};

export type ThreadResponseDto = {
  id: number;
  content: string;
  visibility: Visibility;
  media: MediaEntity[];
  user?: UserResponseDto;
  createdAt: string;
  updatedAt?: string;
};
