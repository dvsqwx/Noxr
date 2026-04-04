type Callback<T> = (err: Error | null, result: T) => void
type Predicate<T> = (item: T, callback: Callback<boolean>) => void
type SyncPredicate<T> = (item: T) => boolean
