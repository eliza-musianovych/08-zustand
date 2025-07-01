import css from './SideBarNotes.module.css'
import Link from 'next/link'
import { Tag } from '@/types/note'

const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']

const SideBarNotes = () => {
    return (
          <ul className={css.menuList}>
            <li className={css.menuItem}>
            <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
            </Link>
        </li>
      {tags.map((tag) => (<li className={css.menuItem} key={tag}>
        <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
          {tag}
        </Link>
      </li>
    ))}
    </ul>
    )
};

export default SideBarNotes