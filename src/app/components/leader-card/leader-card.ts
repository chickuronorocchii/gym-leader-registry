import { Component, input, output } from '@angular/core';
import { GymLeader } from '../../models/gym-leader.model';

@Component({
  selector: 'app-leader-card',
  standalone: true,
  imports: [],
  template: `
    <div class="leader-card" [class]="leader().region.toLowerCase()">
      <div class="card-header">
        <div>
          <h3>{{ leader().name }}</h3>
          <span class="region-badge">{{ leader().region }} Region</span>
        </div>
        <div class="ace-badge" title="Ace Level">
          Lv. {{ leader().aceLevel }}
        </div>
      </div>

      <div class="card-body">
        <p><strong>Town:</strong> {{ leader().town }}</p>
        <p><strong>Badge:</strong> 🏅 {{ leader().badge }}</p>
        <p><strong>Specialty:</strong> <span class="type-pill">{{ leader().specialty }}</span></p>
        
        @if (leader().motto) {
          <blockquote class="motto">"{{ leader().motto }}"</blockquote>
        }
      </div>

      <div class="card-footer">
        <button class="btn-edit" (click)="onEdit()">Edit</button>
        <button class="btn-delete" (click)="onRemove()">Remove</button>
      </div>
    </div>
  `,
  styles: [`
    .leader-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-top: 6px solid #cbd5e1;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .leader-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    }
    .leader-card.kanto { border-top-color: #ef4444; }
    .leader-card.johto { border-top-color: #3b82f6; }
    .leader-card.hoenn { border-top-color: #10b981; }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    .card-header h3 {
      margin: 0;
      color: #1e293b;
      font-size: 1.25rem;
    }
    .region-badge {
      font-size: 0.75rem;
      background: #f1f5f9;
      color: #475569;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-weight: 600;
    }
    .ace-badge {
      background: #0f172a;
      color: white;
      font-weight: bold;
      padding: 0.35rem 0.65rem;
      border-radius: 20px;
      font-size: 0.85rem;
    }
    .card-body p {
      margin: 0.4rem 0;
      color: #475569;
      font-size: 0.95rem;
    }
    .type-pill {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 0.1rem 0.5rem;
      border-radius: 4px;
      font-weight: 600;
      color: #1e293b;
    }
    .motto {
      margin: 1rem 0 0 0;
      font-style: italic;
      color: #64748b;
      font-size: 0.9rem;
      background: #f8fafc;
      padding: 0.75rem;
      border-left: 3px solid #cbd5e1;
      border-radius: 0 6px 6px 0;
    }
    .card-footer {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.25rem;
      padding-top: 1rem;
      border-top: 1px solid #f1f5f9;
    }
    .btn-edit, .btn-delete {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-edit {
      background: #f1f5f9;
      color: #334155;
    }
    .btn-edit:hover {
      background: #e2e8f0;
    }
    .btn-delete {
      background: #ffeeef;
      color: #ef4444;
    }
    .btn-delete:hover {
      background: #fde8e8;
    }
  `]
})
export class LeaderCard {
  readonly leader = input.required<GymLeader>();
  readonly edit = output<string>();
  readonly remove = output<string>();

  onEdit(): void {
    if (this.leader()._id) {
      this.edit.emit(this.leader()._id!);
    }
  }

  onRemove(): void {
    if (this.leader()._id) {
      this.remove.emit(this.leader()._id!);
    }
  }
}