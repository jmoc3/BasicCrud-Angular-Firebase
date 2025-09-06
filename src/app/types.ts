import { FormControl } from '@angular/forms'

interface FormSignUpType {
  email: FormControl<string | null>
  password: FormControl<string | null>
}

export type { FormSignUpType }
