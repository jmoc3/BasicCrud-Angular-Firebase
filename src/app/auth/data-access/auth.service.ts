import { inject, Injectable } from '@angular/core'
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '@angular/fire/auth'

export interface User {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth)

  async signUp(user: User) {
    return await createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    )
  }

  async signIn(user: User) {
    return await signInWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    )
  }
}
