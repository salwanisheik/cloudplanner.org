/**
 * Airtable fetch utility — cloudplanner.org
 *
 * This module fetches records from Airtable at BUILD TIME.
 * The data is baked into static HTML — no API calls in the browser.
 *
 * Usage:
 *   import { fetchRecords } from '@/lib/airtable';
 *   const guides = await fetchRecords('AIRTABLE_BASE_GUIDES', 'Guides');
 */

const AIRTABLE_API_KEY = import.meta.env.AIRTABLE_API_KEY;

if (!AIRTABLE_API_KEY) {
  throw new Error(
    'Missing AIRTABLE_API_KEY. Copy .env.example to .env and add your key.'
  );
}

/** Generic Airtable record shape */
export interface AirtableRecord<T extends Record<string, unknown>> {
  id: string;
  fields: T;
  createdTime: string;
}

/** Fetch ALL records from a table (handles Airtable pagination automatically) */
export async function fetchRecords<T extends Record<string, unknown>>(
  /** The env var name holding the base ID, e.g. 'AIRTABLE_BASE_GUIDES' */
  baseEnvKey: string,
  /** The table name inside that base, e.g. 'Guides' */
  tableName: string,
  /** Optional filter formula, e.g. "{Status}='Published'" */
  filterFormula?: string
): Promise<AirtableRecord<T>[]> {
  const baseId = import.meta.env[baseEnvKey];

  if (!baseId) {
    throw new Error(
      `Missing env var ${baseEnvKey}. Add it to .env (see .env.example).`
    );
  }

  const records: AirtableRecord<T>[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({ pageSize: '100' });
    if (filterFormula) params.set('filterByFormula', filterFormula);
    if (offset) params.set('offset', offset);

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?${params}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    if (!res.ok) {
      throw new Error(
        `Airtable API error ${res.status} for table "${tableName}" in base "${baseEnvKey}": ${await res.text()}`
      );
    }

    const data = await res.json() as { records: AirtableRecord<T>[]; offset?: string };
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records;
}

/** Fetch a single record by its Airtable record ID */
export async function fetchRecord<T extends Record<string, unknown>>(
  baseEnvKey: string,
  tableName: string,
  recordId: string
): Promise<AirtableRecord<T>> {
  const baseId = import.meta.env[baseEnvKey];

  if (!baseId) {
    throw new Error(`Missing env var ${baseEnvKey}.`);
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}/${recordId}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  });

  if (!res.ok) {
    throw new Error(`Airtable API error ${res.status}: ${await res.text()}`);
  }

  return res.json() as Promise<AirtableRecord<T>>;
}
