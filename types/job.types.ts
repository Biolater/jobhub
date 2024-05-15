type Nullable<T> = T | null;

export type JobTypes = {
    company: string,
    createdAt: string,
    date: string,
    description: string,
    id: string,
    joburl: string,
    notes?: Nullable<string>,
    title: string,
    updatedAt: string,
    user: () => void,
    userId?: Nullable<string>,
}