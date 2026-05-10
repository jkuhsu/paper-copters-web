import { google } from 'googleapis';

export interface ClassScore {
  rank: number;
  className: string;
  bagCount: number;
}

export async function getClassRankings(): Promise<ClassScore[]> {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: 'Classes!A:B',
  });

  const rows = response.data.values ?? [];

  // Skip header row if first cell looks like a label (non-numeric second column)
  const dataRows = rows.filter((row) => {
    const count = parseInt(String(row[1] ?? '').replace(/[^0-9]/g, ''), 10);
    return row[0] && !isNaN(count) && count >= 0;
  });

  return dataRows
    .map((row) => ({
      rank: 0,
      className: String(row[0]).trim(),
      bagCount: parseInt(String(row[1]).replace(/[^0-9]/g, ''), 10),
    }))
    .sort((a, b) => b.bagCount - a.bagCount)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}
