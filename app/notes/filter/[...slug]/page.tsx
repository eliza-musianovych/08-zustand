import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';

type Props = {
  params: Promise<{ slug: string[] }>;
}

export default async function Notes({ params }: Props) {
  const initialQuery = '';
  const initialPage = 1;
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0] as Tag;
  const notes = await fetchNotes(initialQuery, initialPage, tag);

  return (
      <NotesClient 
      initialQuery={initialQuery}
      initialPage={initialPage}
      initialTag={tag}
      initialNotes={notes} />
  )
}