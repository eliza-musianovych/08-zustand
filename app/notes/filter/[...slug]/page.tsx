import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';

type Props = {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }:Props) {
  const { slug } = await params;
  const tag = slug[0] as Tag;
  return {
    title: `${tag} notes`,
    description: slug[0] === 'all' ? "All notes in Note Hub" : `All notes with tag ${tag}`,
    openGraf: {
      title: `${tag} notes`,
      description: slug[0] === 'all' ? "All notes in Note Hub" : `All notes with tag ${tag}`,
      url: slug[0] === 'all' ? `https://08-zustand-eypfyygwr-yelyzaveta-musianovychs-projects.vercel.app/notes/filter/all`: `https://08-zustand-eypfyygwr-yelyzaveta-musianovychs-projects.vercel.app/notes/filter/${tag}`,
      images: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    }
  }
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