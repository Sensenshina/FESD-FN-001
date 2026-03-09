import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register';
import { UserListComponent } from './components/user-list/user-list';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'user-list', component: UserListComponent }
];