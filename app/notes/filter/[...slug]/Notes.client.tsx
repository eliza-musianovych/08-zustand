'use client';

import css from './App.module.css'
import NoteList from '@/components/NoteList/NoteList'
import Modal from '@/components/Modal/Modal'
import Pagination from '@/components/Pagination/Pagination'
import SearchBox from '@/components/SearchBox/SearchBox'
import type { Note, Tag } from '@/types/note';
import { useState } from 'react'
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteForm from '@/components/NoteForm/NoteForm';

interface NoteData {
  notes: Note[],
  totalPages: number,
}

type NotesClientProps = {
  initialQuery: string;
  initialPage: number;
  initialTag?: Tag;
  initialNotes: NoteData
};

export default function NotesClient({ 
  initialQuery,
  initialPage,
  initialTag,
  initialNotes }: NotesClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [isCreateNote, setIsCreateNote] = useState<boolean>(false);

  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setPage(1);
    };
    
    const [debouncedQuery] = useDebounce(query, 300);

     const {data, isSuccess} = useQuery({
    queryKey: ['notes', debouncedQuery, page, initialTag],
    queryFn: () => fetchNotes(debouncedQuery, page, initialTag),
    placeholderData: keepPreviousData,
    initialData: initialNotes,
  });

  const handleClick = () => setIsCreateNote(true);
  const handleClose = () => setIsCreateNote(false)

    return (
        <div className={css.app}>
	      <header className={css.toolbar}>
          <SearchBox query={query} updateQuery={updateQuery}/>
          {data?.totalPages && 
          data.totalPages > 1 && 
          <Pagination 
          page={page} 
          totalPages={data?.totalPages}
          onPageChange={setPage}
          />}
          <button onClick={handleClick} className={css.button}>Create note +</button>
        </header>
        {isSuccess && 
        data.notes.length > 0 && 
        <NoteList notes={data.notes} />}
        {isCreateNote && (
        <Modal onClose={handleClose}>
          <NoteForm onClose={handleClose}/>
        </Modal>
        )}
    </div>
    )
}