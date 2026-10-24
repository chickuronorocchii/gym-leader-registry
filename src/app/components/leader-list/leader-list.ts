import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader.service';
import { LeaderCard } from '../leader-card/leader-card';
import { GymLeader } from '../../models/gym-leader.model';

@Component({
  selector: 'app-leader-list',
  standalone: true,
  imports: [LeaderCard],
  template: `
    <div class="leader-list-container">
      <div class="list-header">
        <h2>Registered Gym Leaders</h2>
        <div class="filter-buttons">
          <button 
            [class.active]="selectedRegion() === 'All'" 
            (click)="setRegion('All')">All ({{ gymService.leaders().length }})</button>
          <button 
            [class.active]="selectedRegion() === 'Kanto'" 
            (click)="setRegion('Kanto')">Kanto ({{ gymService.kantoCount() }})</button>
          <button 
            [class.active]="selectedRegion() === 'Johto'" 
            (click)="setRegion('Johto')">Johto ({{ gymService.johtoCount() }})</button>
          <button 
            [class.active]="selectedRegion() === 'Hoenn'" 
            (click)="setRegion('Hoenn')">Hoenn ({{ gymService.hoennCount() }})</button>
        </div>
      </div>

      <div class="cards-grid">
        @for (leader of filteredLeaders(); track leader._id) {
          <app-leader-card 
            [leader]="leader" 
            (edit)="onEditLeader($event)" 
            (remove)="onRemoveLeader(leader)" />
        } @empty {
          <div class="empty-state">
            <p>No Gym Leaders registered yet.</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .leader-list-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    h2 {
      color: #1e293b;
      margin: 0;
    }
    .filter-buttons {
      display: flex;
      gap: 0.5rem;
      background: #f1f5f9;
      padding: 0.35rem;
      border-radius: 8px;
    }
    .filter-buttons button {
      background: transparent;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s;
    }
    .filter-buttons button:hover {
      color: #1e293b;
    }
    .filter-buttons button.active {
      background: white;
      color: #e94560;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem;
      background: #f8fafc;
      border-radius: 12px;
      color: #64748b;
      font-size: 1.1rem;
      border: 2px dashed #cbd5e1;
    }
  `]
})
export class LeaderList implements OnInit {
  readonly gymService = inject(GymLeaderService);
  private router = inject(Router);

  readonly selectedRegion = signal<string>('All');

  readonly filteredLeaders = computed(() => {
    const region = this.selectedRegion();
    const all = this.gymService.leaders();
    if (region === 'All') return all;
    return all.filter(l => l.region === region);
  });

  ngOnInit(): void {
    this.gymService.fetchLeaders();
  }

  setRegion(region: string): void {
    this.selectedRegion.set(region);
  }

  onEditLeader(id: string): void {
    this.router.navigate(['/leaders', id, 'edit']);
  }

  onRemoveLeader(leader: GymLeader): void {
    if (confirm(`Remove ${leader.name} from the registry?`)) {
      if (leader._id) {
        this.gymService.deleteLeader(leader._id).subscribe({
          next: () => {},
          error: (err: any) => console.error('Error deleting leader:', err)
        });
      }
    }
  }
}