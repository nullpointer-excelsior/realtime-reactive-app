import { Subject } from "rxjs";

export abstract class SubjectBase<T> {

    private readonly subject: Subject<T> = new Subject()

    emit(value: T) {
        this.subject.next(value)
    }

    onEmited() {
        return this.subject.asObservable()
    }

}