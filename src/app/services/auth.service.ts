import { Injectable, computed, inject, signal } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

/**
 * Gestiona la sesión de administrador de la aplicación.
 * Solo existe un usuario (el administrador): cualquier sesión activa implica permisos de escritura.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _supabase = inject(SupabaseService).client;

  private readonly _session = signal<Session | null>(null);
  private readonly _initialized = signal(false);

  /** Se resuelve en cuanto se ha comprobado si había una sesión guardada (localStorage). */
  readonly ready: Promise<void>;

  readonly initialized = this._initialized.asReadonly();
  readonly isAdmin = computed(() => this._session() !== null);

  constructor() {
    this.ready = this._init();
  }

  private async _init(): Promise<void> {
    const { data } = await this._supabase.auth.getSession();
    this._session.set(data.session);
    this._initialized.set(true);

    this._supabase.auth.onAuthStateChange((_event, session) => {
      this._session.set(session);
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    const { error } = await this._supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    await this._supabase.auth.signOut();
  }
}
