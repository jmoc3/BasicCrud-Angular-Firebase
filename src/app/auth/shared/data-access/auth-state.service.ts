import { inject, Injectable } from '@angular/core';
import { Auth, authState, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private _auth = inject(Auth);

  get authState$(): Observable<User | null> {
    return authState(this._auth);
  }

  get currentUser() {
    return this._auth.currentUser;
  }

  async logOut() {
    await signOut(this._auth);
  }
}
