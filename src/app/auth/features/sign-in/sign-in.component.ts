import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { hasEmailError, hasPasswordError, isRequired } from '../validators'
import { toast } from 'ngx-sonner'
import { AuthService, User } from '../../data-access/auth.service'
import { Router, RouterModule } from '@angular/router'
import { FormSignUpType } from '../../../types'
import { FirebaseError } from '@angular/fire/app'

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styles: ``
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder)
  private _authService = inject(AuthService)
  private _router = inject(Router)

  form = this._formBuilder.group<FormSignUpType>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form)
  }

  isEmailRequired() {
    return hasEmailError(this.form)
  }

  isPasswordRequired() {
    return hasPasswordError(this.form)
  }

  async submit() {
    try {
      const res = await this._authService.signIn(this.form.value as User)

      if (res) {
        toast.success('Bienvenido')
        this._router.navigateByUrl('/tasks')
      }
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code == 'auth/invalid-credential'
      )
        toast.error('Credenciales invalidas')
    }
  }
}
