import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GymLeader } from '../models/gym-leader.model';

@Injectable({
  providedIn: 'root'
})
export class GymLeaderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/leaders';

  readonly leaders = signal<GymLeader[]>([]);

  readonly kantoCount = computed(() => 
    this.leaders().filter(l => l.region === 'Kanto').length
  );
  
  readonly johtoCount = computed(() => 
    this.leaders().filter(l => l.region === 'Johto').length
  );
  
  readonly hoennCount = computed(() => 
    this.leaders().filter(l => l.region === 'Hoenn').length
  );

  fetchLeaders(): void {
    this.http.get<GymLeader[]>(this.apiUrl).subscribe({
      next: (data) => this.leaders.set(data),
      error: (err: any) => console.error('Error fetching leaders:', err)
    });
  }

  getLeader(id: string): Observable<GymLeader> {
    return this.http.get<GymLeader>(`${this.apiUrl}/${id}`);
  }

  addLeader(leader: GymLeader): Observable<GymLeader> {
    return this.http.post<GymLeader>(this.apiUrl, leader).pipe(
      tap((newLeader) => {
        this.leaders.update(current => [newLeader, ...current]);
      })
    );
  }

      updateLeader(id: string, leader: GymLeader): Observable<GymLeader> {
    return this.http.put<GymLeader>(`${this.apiUrl}/${id}`, leader).pipe(
      tap((updated) => {
        this.leaders.update(current => 
          current.map(l => l._id === id ? updated : l)
        );
      })
    );
  }

  deleteLeader(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.leaders.update(current => current.filter(l => l._id !== id));
      })
    );
  }
}