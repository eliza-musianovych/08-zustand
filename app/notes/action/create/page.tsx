import css from './CreateNote.module.css'
import NoteForm from '@/components/NoteForm/NoteForm';
import { tags } from '@/lib/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Create new note | Note Hub",
    description: "Easily create a new note with a title, content, and tag to stay organized.",
    openGraph: {
        title: "Create new note | Note Hub",
        description: "Easily create a new note with a title, content, and tag to stay organized.",
        url: "http://localhost:3000/notes/action/create",
        images: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    }
}

const CreateNote = () => {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm tags={tags}/>
            </div>
        </main>

    )
};

export default CreateNote;