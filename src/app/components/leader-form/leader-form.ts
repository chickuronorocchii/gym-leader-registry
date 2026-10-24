import { Component, inject, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader.service';

@Component({
  selector: 'app-leader-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-container">
      <div class="form-card">
        <h2>{{ isEditMode ? 'Edit Gym Leader' : 'Register a Gym Leader' }}</h2>
        <p class="form-subtitle">Fill in the official league credentials below.</p>

        <form [formGroup]="leaderForm" (ngSubmit)="onSubmit()">
          
          <div class="form-group">
            <label>Leader Name *</label>
            <input type="text" formControlName="name" placeholder="e.g. Brock" />
            @if (leaderForm.get('name')?.touched && leaderForm.get('name')?.invalid) {
              <small class="error-msg">Name is required (at least 2 characters).</small>
            }
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Region *</label>
              <select formControlName="region">
                <option value="" disabled>Select Region</option>
                <option value="Kanto">Kanto</option>
                <option value="Johto">Johto</option>
                <option value="Hoenn">Hoenn</option>
              </select>
              @if (leaderForm.get('region')?.touched && leaderForm.get('region')?.invalid) {
                <small class="error-msg">Region is required.</small>
              }
            </div>

            <div class="form-group">
              <label>Town *</label>
              <input type="text" formControlName="town" placeholder="e.g. Pewter City" />
              @if (leaderForm.get('town')?.touched && leaderForm.get('town')?.invalid) {
                <small class="error-msg">Town is required.</small>
              }
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Badge Name *</label>
              <input type="text" formControlName="badge" placeholder="e.g. Boulder Badge" />
              @if (leaderForm.get('badge')?.touched && leaderForm.get('badge')?.invalid) {
                <small class="error-msg">Badge name is required.</small>
              }
            </div>

            <div class="form-group">
              <label>Pokémon Specialty Type *</label>
              <input type="text" formControlName="specialty" placeholder="e.g. Rock" />
              @if (leaderForm.get('specialty')?.touched && leaderForm.get('specialty')?.invalid) {
                <small class="error-msg">Specialty type is required.</small>
              }
            </div>
          </div>

          <div class="form-group">
            <label>Ace Level (1 to 100) *</label>
            <input type="number" formControlName="aceLevel" min="1" max="100" placeholder="14" />
            @if (leaderForm.get('aceLevel')?.touched && leaderForm.get('aceLevel')?.invalid) {
              <small class="error-msg">Ace level must be a whole number between 1 and 100.</small>
            }
          </div>

          <div class="form-group">
            <label>Motto (Optional, max 150 chars)</label>
            <textarea formControlName="motto" rows="3" placeholder="My rock-hard willpower..."></textarea>
            @if (leaderForm.get('motto')?.touched && leaderForm.get('motto')?.invalid) {
              <small class="error-msg">Motto cannot exceed 150 characters.</small>
            }
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" (click)="onCancel()">Cancel</button>
            <button type="submit" class="btn-submit" [disabled]="leaderForm.invalid">
              {{ isEditMode ? 'Save Changes' : 'Add Leader' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      display: flex;
      justify-content: center;
      padding: 1rem 0;
    }
    .form-card {
      background: white;
      width: 100%;
      max-width: 650px;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    h2 {
      margin: 0 0 0.25rem 0;
      color: #1e293b;
    }
    .form-subtitle {
      color: #64748b;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    label {
      font-weight: 600;
      color: #334155;
      font-size: 0.9rem;
      margin-bottom: 0.4rem;
    }
    input, select, textarea {
      padding: 0.75rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 1rem;
      color: #1e293b;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #e94560;
      box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.15);
    }
    .error-msg {
      color: #ef4444;
      font-size: 0.8rem;
      margin-top: 0.3rem;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #f1f5f9;
    }
    .btn-cancel, .btn-submit {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .btn-cancel {
      background: #f1f5f9;
      color: #475569;
    }
    .btn-cancel:hover {
      background: #e2e8f0;
    }
    .btn-submit {
      background: #e94560;
      color: white;
      transition: background 0.2s;
    }
    .btn-submit:hover:not(:disabled) {
      background: #d83a54;
    }
    .btn-submit:disabled {
      background: #cbd5e1;
      cursor: not-allowed;
    }
  `]
})
export class LeaderForm implements OnInit {
  private fb = inject(FormBuilder);
  private gymService = inject(GymLeaderService);
  private router = inject(Router);

  readonly id = input<string>();
  isEditMode = false;

  readonly leaderForm: FormGroup = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    region: ['', [Validators.required]],
    town: ['', [Validators.required]],
    badge: ['', [Validators.required]],
    specialty: ['', [Validators.required]],
    aceLevel: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    motto: ['', [Validators.maxLength(150)]]
  });

  ngOnInit(): void {
    const leaderId = this.id();
    if (leaderId) {
      this.isEditMode = true;
      this.gymService.getLeader(leaderId).subscribe({
        next: (leader) => {
          this.leaderForm.patchValue(leader);
        },
        error: (err: any) => console.error('Error loading leader for edit:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.leaderForm.invalid) return;

    const formValue = this.leaderForm.getRawValue();
    const leaderId = this.id();

    if (this.isEditMode && leaderId) {
      this.gymService.updateLeader(leaderId, formValue).subscribe({
        next: () => {
          this.leaderForm.reset();
          this.router.navigate(['/leaders']);
        },
        error: (err: any) => console.error('Error updating leader:', err)
      });
    } else {
      this.gymService.addLeader(formValue).subscribe({
        next: () => {
          this.leaderForm.reset();
          this.router.navigate(['/leaders']);
        },
        error: (err: any) => console.error('Error adding leader:', err)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/leaders']);
  }
}