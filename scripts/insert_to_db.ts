import { Database } from 'bun:sqlite';
import { db } from '../src/database/client';

type Row = {
    id: number;
    utbk_no: string;
    name: string;
    date_of_birth: string;
    bidik_misi: number;
    passed: number;
    ptn?: string;
    ptn_code: string;
    prodi?: string;
    prodi_code: string;
    next_url?: string;
}

const executor = process.argv[0];
const args = process.argv.slice(executor?.toLowerCase().includes('bun') ? 2 : 1);
const [filename, year] = args;

if (!filename) throw new Error('Missing db filename');
if (!year || Number.isNaN(Number(year))) throw new Error('Missing or invalid year');

const currentYear = Number.parseInt(year, 10);
const currentDate = new Date();

// Validate year entry
const existingYear = await db.selectFrom('snbt_year')
    .select(['dumped_at'])
    .where('year', '=', currentYear)
    .executeTakeFirst();

if (existingYear) {
    const dumpedDate = new Date(existingYear.dumped_at);
    if (dumpedDate.getDate() === currentDate.getDate() && 
        dumpedDate.getMonth() === currentDate.getMonth()) {
        throw new Error('This dump already exists in the database');
    }
}

// SQLite connection
const fileSQL = new Database(filename, { readonly: true });
const CHUNK_SIZE = 500; // Adjust based on SQLite parameter limits

await db.transaction().execute(async trx => {
    const yearInsert = await trx.insertInto('snbt_year')
        .values({ year: currentYear })
        .executeTakeFirst();

    if (!yearInsert.insertId) {
        throw new Error('Failed to insert SNBT year');
    }

    const allRows = fileSQL.prepare('SELECT * FROM snbt_dump').all() as Row[];
    const inserts = [];
    
    for (const row of allRows) {
        inserts.push({
            is_scholarship: row.bidik_misi === 1,
            name: row.name,
            date_of_birth: row.date_of_birth,
            snbt_year: currentYear,
            snbt_year_ref: Number(yearInsert.insertId),
            utbk_number: row.utbk_no,
            accepted: row.passed === 1,
            university_code: row.ptn_code === 'None' ? null : Number(row.ptn_code),
            university_name: row.ptn,
            study_code: row.prodi_code === 'None' ? null : Number(row.prodi_code),
            study_name: row.prodi,
            university_url: row.next_url,
        });
    }

    // Batch insert in chunks
    for (let i = 0; i < inserts.length; i += CHUNK_SIZE) {
        const chunk = inserts.slice(i, i + CHUNK_SIZE);
        await trx.insertInto('snbt_data')
            .values(chunk)
            .execute();
    }
});

fileSQL.close();