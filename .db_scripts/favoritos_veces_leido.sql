alter table public.books
  add column if not exists favorite boolean not null default false;
alter table public.books
  add column if not exists times_read integer not null default 0 check (times_read >= 0);

alter table public.manga_volumes
  add column if not exists favorite boolean not null default false;
alter table public.manga_volumes
  add column if not exists times_read integer not null default 0 check (times_read >= 0);

alter table public.fanfics
  add column if not exists favorite boolean not null default false;
alter table public.fanfics
  add column if not exists times_read integer not null default 0 check (times_read >= 0);

-- OPCIONAL: contar como "1 vez leído" lo que ya está finalizado.
update public.books         set times_read = 1 where reading_status = 'finished' and times_read = 0;
update public.manga_volumes set times_read = 1 where reading_status = 'finished' and times_read = 0;
update public.fanfics       set times_read = 1 where reading_status = 'finished' and times_read = 0;
