import { Database } from 'bun:sqlite';
import {db} from '../src/database/client';

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

const executor = process.argv.at(0);

// Filename
const filename = process.argv.slice(
    executor?.toLowerCase().includes('bun') ? 2 : 1,
).at(0);
if (!filename) {
    throw new Error('Missing db filename');  
}

const year = process.argv.slice(executor?.toLowerCase().includes('bun') ? 2 : 1).at(1);

if (!year || Number.isNaN(year)) {
    throw new Error('Missing year');
}

const rowYears = await db.selectFrom('snbt_year').select(['year', 'dumped_at'])
    .where('year', '=', Number.parseInt(year, 10)).execute();

const currentDate = new Date();

for (const rowYear of rowYears) {
    const rowDate = new Date(rowYear.dumped_at);

    if (rowDate.getDate() === currentDate.getDate() && rowDate.getMonth() === currentDate.getMonth()) {
        throw new Error('This dump is already exist on db');
    }
}

// SQLite
const fileSQL = new Database(filename, {
    readonly: true,
    create: false,
});

await db.transaction().execute(async trx => {
    const result = await trx.insertInto('snbt_year').values({
        year: Number.parseInt(year, 10),
    }).executeTakeFirst();

    const queryIter = fileSQL.query('SELECT * from snbt_dump').iterate();
    for (const row of queryIter) {
        const rowCast = row as Row;

        console.log('Inserting', rowCast.name);

        await trx.insertInto('snbt_data').values({
            is_scholarship: rowCast.bidik_misi === 1,
            name: rowCast.name,
            date_of_birth: rowCast.date_of_birth,
            snbt_year: Number.parseInt(year, 10),
            snbt_year_ref: result.insertId,
            utbk_number: rowCast.utbk_no,
            accepted: rowCast.passed === 1,
            university_code: rowCast.ptn_code === 'None' ? null : Number.parseInt(rowCast.ptn_code, 10),
            university_name: rowCast.ptn,
            study_code: rowCast.prodi_code === 'None' ? null : Number.parseInt(rowCast.prodi_code),
            study_name: rowCast.prodi,
            university_url: rowCast.next_url,
        }).execute();
    }
});