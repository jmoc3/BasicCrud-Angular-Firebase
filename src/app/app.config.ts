import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'

import { routes } from './app.routes'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'crud-8bd66',
        appId: '1:336218171181:web:c8769f06030accf3cfd5a4',
        storageBucket: 'crud-8bd66.firebasestorage.app',
        apiKey: 'AIzaSyBjr4qrwTxUvn-SMNoIdqRPQ1y_VMH0w00',
        authDomain: 'crud-8bd66.firebaseapp.com',
        messagingSenderId: '336218171181'
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
}
