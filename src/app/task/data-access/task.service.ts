import { inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore,
  collection,
  query,
  collectionData,
  addDoc,
  getDoc,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthStateService } from '../../auth/shared/data-access/auth-state.service';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
}

export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'tasks';

export class TaskService {
  private _authState = inject(AuthStateService);
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  loading = signal<boolean>(true);

  index = toSignal(
    (
      collectionData(
        query(
          this._collection,
          where('userId', '==', this._authState.currentUser?.uid),
          orderBy('title'),
        ),
        { idField: 'id' },
      ) as Observable<Task[]>
    ).pipe(
      tap(() => {
        this.loading.set(false);
      }),
      catchError((err) => {
        console.error(err);
        this.loading.set(false);
        return throwError(() => err);
      }),
    ),
    { initialValue: [] },
  );

  getDocument(id: string) {
    const docRef = doc(this._collection, id);
    return getDoc(docRef);
  }

  create(task: TaskCreate) {
    return addDoc(this._collection, task);
  }

  update(id: string, task: TaskCreate) {
    const docRef = doc(this._collection, id);
    return updateDoc(docRef, task);
  }

  delete(id: string) {
    const docRef = doc(this._collection, id);
    return deleteDoc(docRef);
  }
}
