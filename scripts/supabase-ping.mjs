#!/usr/bin/env node
/**
 * scripts/supabase-ping.mjs
 *
 * Los proyectos gratuitos de Supabase se pausan tras ~1 semana sin
 * actividad. Este script hace una consulta mínima (HEAD/GET con limit=1)
 * contra la API REST del proyecto para mantenerlo activo.
 *
 * Uso:
 *   node scripts/supabase-ping.mjs
 *
 * Variables de entorno opcionales (si no se definen, se usan los valores
 * por defecto del proyecto Imladris):
 *   SUPABASE_URL
 *   SUPABASE_KEY
 */

const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://dhbcklnbmiqympwbuohv.supabase.co';
const SUPABASE_KEY =
  process.env.SUPABASE_KEY ?? 'sb_publishable_hVjyuY6JfLDPIAnAZiY2Gw_mz1siLZq';

async function ping() {
  const url = `${SUPABASE_URL}/rest/v1/authors?select=id&limit=1`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Ping a Supabase falló: ${response.status} ${response.statusText} ${body}`);
  }

  console.log(`[${new Date().toISOString()}] Ping a Supabase OK (status ${response.status}).`);
}

ping().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
