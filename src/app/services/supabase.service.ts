import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

/**
 * Punto de entrada único al cliente de Supabase.
 * Se inyecta en el resto de servicios (AuthorService, BookService, ...)
 * en lugar de crear un cliente nuevo en cada uno.
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient = createClient(environment.supabaseUrl, environment.supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
}
