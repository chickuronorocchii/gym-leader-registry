import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-hero">
      <div class="hero-content">
        <h1>Pokémon League Gym Leader Registry</h1>
        <p class="hero-subtitle">Official Staff Portal for Kanto, Johto, and Hoenn Regions</p>
        
        <div class="stats-grid">
          <div class="stat-card kanto">
            <h3>Kanto Region</h3>
            <p class="stat-number">{{ gymService.kantoCount() }}</p>
            <span>Registered Leaders</span>
          </div>
          <div class="stat-card johto">
            <h3>Johto Region</h3>
            <p class="stat-number">{{ gymService.johtoCount() }}</p>
            <span>Registered Leaders</span>
          </div>
          <div class="stat-card hoenn">
            <h3>Hoenn Region</h3>
            <p class="stat-number">{{ gymService.hoennCount() }}</p>
            <span>Registered Leaders</span>
          </div>
        </div>

        <div class="hero-actions">
          <a routerLink="/leaders" class="btn-primary">View All Gym Leaders</a>
          <a routerLink="/leaders/new" class="btn-secondary">+ Add New Gym Leader</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-hero {
      text-align: center;
      padding: 3rem 1rem;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #1e293b;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .hero-subtitle {
      color: #64748b;
      font-size: 1.15rem;
      margin-bottom: 2.5rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      border-top: 5px solid #cbd5e1;
    }
    .stat-card.kanto { border-top-color: #ef4444; }
    .stat-card.johto { border-top-color: #3b82f6; }
    .stat-card.hoenn { border-top-color: #10b981; }
    .stat-card h3 {
      margin: 0 0 0.5rem 0;
      color: #334155;
      font-size: 1.1rem;
    }
    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #0f172a;
      margin: 0 0 0.25rem 0;
    }
    .stat-card span {
      color: #64748b;
      font-size: 0.9rem;
    }
    .hero-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: transform 0.2s, background 0.2s;
    }
    .btn-primary {
      background: #e94560;
      color: white;
    }
    .btn-primary:hover {
      background: #d83a54;
      transform: translateY(-2px);
    }
    .btn-secondary {
      background: #ffffff;
      color: #1e293b;
      border: 1px solid #cbd5e1;
    }
    .btn-secondary:hover {
      background: #f1f5f9;
      transform: translateY(-2px);
    }
  `]
})
export class Home implements OnInit {
  readonly gymService = inject(GymLeaderService);

  ngOnInit(): void {
    this.gymService.fetchLeaders();
  }
}