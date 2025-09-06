import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasEmailError, isRequired } from '../validators';
import { toast } from 'ngx-sonner';
import { AuthService, User } from '../../data-access/auth.service';
import { Router, RouterModule } from '@angular/router';
import type { FormSignUpType } from '../../../types';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<FormSignUpType>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  isEmailRequired() {
    return hasEmailError(this.form);
  }

  async submit() {
    try {
      const res = await this._authService.signUp(this.form.value as User);

      if (res) {
        toast.success('User created succesfully');
        this._router.navigateByUrl('/auth/sign-in');
      }
    } catch (err) {
      toast.error('Error creating user');
      console.log(err);
    }
  }
}
