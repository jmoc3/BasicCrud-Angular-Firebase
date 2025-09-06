import { Component, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { AuthStateService } from '../../auth/shared/data-access/auth-state.service'

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-layout',
  template: `
    <header class="py-6 px-16 flex justify-between items-center">
      <span
        routerLink="/"
        class="text-xs w-[10rem] text-center bg-amber-50 px-4 py-2 shadow-[inset_10px_6px_12px_rgba(0,0,0,0.2),_inset_-6px_-6px_12px_rgba(255,255,255,0.7)] rounded text-[#282828] cursor-pointer"
        >Fire tasker</span
      >
      <button
        (click)="logOut()"
        class="px-4 py-2 bg-amber-200 rounded text-amber-800 shadow text-xs cursor-pointer"
      >
        Cerrar sesion
      </button>
    </header>
    <router-outlet />
  `
})
export default class LayoutComponent {
  private _authState = inject(AuthStateService)
  private _route = inject(Router)

  async logOut() {
    await this._authState.logOut()
    this._route.navigateByUrl('/auth/sign-in')
  }
}
