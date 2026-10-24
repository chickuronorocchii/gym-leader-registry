import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LeaderList } from './components/leader-list/leader-list';
import { LeaderForm } from './components/leader-form/leader-form';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Home | Gym Leader Registry' },
  { path: 'leaders', component: LeaderList, title: 'Gym Leaders | Registry' },
  { path: 'leaders/new', component: LeaderForm, title: 'Add Gym Leader | Registry' },
  { path: 'leaders/:id/edit', component: LeaderForm, title: 'Edit Gym Leader | Registry' },
  { path: '**', component: NotFound, title: 'Page Not Found | Registry' }
];