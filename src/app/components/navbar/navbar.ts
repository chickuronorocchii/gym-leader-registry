import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <span class="pokeball-icon">🔴</span>
        <h2>Pokémon League Registry</h2>
      </div>
      <div class="nav-links">
        <a routerLink="/home" routerLinkActive="active">Home</a>
        <a routerLink="/leaders" routerLinkActive="active">Gym Leaders</a>
        <a routerLink="/leaders/new" routerLinkActive="active" class="btn-add">+ Register Leader</a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1a1a2e;
      color: white;
      padding: 1rem 2rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .nav-brand h2 {
      margin: 0;
      font-size: 1.25rem;
      letter-spacing: 0.5px;
      color: #e94560;
    }
    .pokeball-icon {
      font-size: 1.5rem;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .nav-links a {
      color: #cbd5e1;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover {
      color: #ffffff;
    }
    .nav-links a.active {
      color: #e94560;
      border-bottom: 2px solid #e94560;
      padding-bottom: 2px;
    }
    .btn-add {
      background: #e94560;
      color: white !important;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border-bottom: none !important;
      transition: background 0.2s;
    }
    .btn-add:hover {
      background: #d83a54;
    }
  `]
})
export class Navbar {}