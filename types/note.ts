export interface Note {
    id: number;
    title: string;
    content: string;
    tag: string;
    createdAt: string;
    updatedAt: string
};

export type NewNote = {
    title: string;
    content: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
};

export type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';