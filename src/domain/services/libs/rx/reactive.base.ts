import { EMPTY, mergeMap, Observable, of } from "rxjs"

export abstract class ReactiveBase {

    protected findSingle<T>(fn: () => T): Observable<T> {
        const value = fn()
        if (value) {
            return of(value)
        }
        return EMPTY
    }

    protected findMultiple<T>(fn: () => T[]): Observable<T> {
        const value = fn()
        if (value && value.length > 0) {
            return of(value).pipe(
                mergeMap(arr => arr)
            )
        }
        return EMPTY
    }

}