import axios from 'axios';

export interface BookInfo {
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  pageCount: number;
  categories: string[];
  publishedDate: string;
  source: 'google' | 'openlibrary';
}

async function searchGoogleBooks(query: string): Promise<BookInfo | null> {
  try {
    const { data } = await axios.get<{ items?: { id: string; volumeInfo: { title: string; authors?: string[]; imageLinks?: { thumbnail?: string }; description?: string; pageCount?: number; categories?: string[]; publishedDate?: string } }[] }>(
      'https://www.googleapis.com/books/v1/volumes',
      { params: { q: query, maxResults: 3 } }
    );
    if (!data.items?.length) return null;
    const v = data.items[0].volumeInfo;
    return {
      title: v.title,
      author: v.authors?.[0] || '',
      coverUrl: v.imageLinks?.thumbnail?.replace('http:', 'https:').replace('&edge=curl', '') || '',
      description: v.description || '',
      pageCount: v.pageCount || 0,
      categories: v.categories || [],
      publishedDate: v.publishedDate || '',
      source: 'google',
    };
  } catch {
    return null;
  }
}

interface OpenLibraryDoc {
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  isbn?: string[];
}

async function searchOpenLibrary(query: string): Promise<BookInfo | null> {
  try {
    const { data } = await axios.get<{ docs?: OpenLibraryDoc[] }>(
      'https://openlibrary.org/search.json',
      { params: { q: query, limit: 5 } }
    );
    if (!data.docs?.length) return null;
    const doc = data.docs[0];
    const coverUrl = doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
      : (doc.isbn?.[0] ? `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-L.jpg` : '');
    return {
      title: doc.title,
      author: doc.author_name?.[0] || '',
      coverUrl,
      description: '',
      pageCount: 0,
      categories: [],
      publishedDate: String(doc.first_publish_year || ''),
      source: 'openlibrary',
    };
  } catch {
    return null;
  }
}

const SEARCH_QUERIES = [
  'The Reason for God Timothy Keller',
  'A Fé na era do ceticismo Timothy Keller',
  'Timothy Keller The Reason for God',
  'O Custo do Discipulado Jonas Madureira',
  'Jonas Madureira discipulado',
];

const KNOWN_COVERS: Record<string, string> = {
  'The Reason for God': 'https://covers.openlibrary.org/b/id/6959410-L.jpg',
  'A Fé na era do ceticismo': 'https://covers.openlibrary.org/b/id/6959410-L.jpg',
  'O Custo do Discipulado': 'https://covers.openlibrary.org/b/id/6959410-L.jpg',
};

export async function searchBook(query?: string): Promise<BookInfo | null> {
  const queries = query ? [query, ...SEARCH_QUERIES] : SEARCH_QUERIES;

  for (const q of queries) {
    const result = await searchGoogleBooks(q);
    if (result?.coverUrl) return result;
  }

  for (const q of queries) {
    const result = await searchOpenLibrary(q);
    if (result?.coverUrl) return result;
  }

  for (const [, coverUrl] of Object.entries(KNOWN_COVERS)) {
    if (coverUrl) {
      return {
        title: '',
        author: '',
        coverUrl,
        description: '',
        pageCount: 0,
        categories: [],
        publishedDate: '',
        source: 'openlibrary',
      };
    }
  }

  return null;
}
