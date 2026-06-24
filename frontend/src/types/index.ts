export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  totalReadings: number;
  finishedReadings: number;
  averageRating: number;
}

export interface Reading {
  id: number;
  title: string;
  type: 'BOOK' | 'ARTICLE';
  author?: string;
  coverUrl?: string;
  rating: number;
  review?: string;
  tags?: string;
  status: 'WANT_TO_READ' | 'READING' | 'FINISHED' | 'DNF';
  startedAt?: string;
  finishedAt?: string;
  pageCount?: number;
  currentPage?: number;
  userId: number;
  userName: string;
  commentCount: number;
  likeCount: number;
  likedByMe: boolean;
  createdAt: string;
}

export interface Comment {
  id: number;
  text: string;
  userId: number;
  userName: string;
  userAvatar?: string;
  createdAt: string;
}

export interface Stats {
  totalReadings: number;
  finishedReadings: number;
  readingNow: number;
  wantToRead: number;
  averageRating: number;
  totalComments: number;
  totalLikes: number;
}

export interface Chapter {
  id: number;
  readingId: number;
  title: string;
  content: string;
  chapterOrder: number;
  createdAt: string;
}

export interface ReadingForm {
  title: string;
  type: 'BOOK' | 'ARTICLE';
  author: string;
  coverUrl: string;
  rating: number;
  review: string;
  tags: string;
  status: 'WANT_TO_READ' | 'READING' | 'FINISHED' | 'DNF';
  startedAt: string;
  finishedAt: string;
  pageCount: number | null;
  currentPage: number | null;
}
