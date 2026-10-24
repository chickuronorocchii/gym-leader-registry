import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The Gym Leader or page you are looking for does not exist in this region.</p>
      <a routerLink="/home" class="btn-home">Return to Home</a>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      padding: 5rem 1rem;
    }
    h1 {
      font-size: 6rem;
      color: #e94560;
      margin: 0;
    }
    h2 {
      font-size: 2rem;
      color: #1e293b;
      margin: 0.5rem 0 1rem 0;
    }
    p {
      color: #64748b;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }
    .btn-home {
      background: #e94560;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.2s;
    }
    .btn-home:hover {
      background: #d83a54;
    }
  `]
})
export class NotFound {}