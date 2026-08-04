/**
 * ContactOS — CRM Google Sheet via Apps Script Web App.
 *
 * Setup (una tantum, 2 minuti):
 * 1. Crea un nuovo Google Sheet, chiamalo "ContactOS CRM".
 * 2. Crea due tab: "CONTATTI" (con header sotto) e "LOG" (con header sotto).
 *    CONTATTI header riga 1: Timestamp | Nome | Email | Telefono | Messaggio | Fonte | Canale | Stato
 *    LOG header riga 1:      Timestamp | Evento | Dettaglio
 * 3. Estensioni -> Apps Script. Cancella il contenuto di default, incolla questo file.
 * 4. Deploy -> Nuova implementazione -> Tipo: App web.
 *    Esegui come: Me. Chi ha accesso: Chiunque.
 * 5. Copia l'URL Web App generato (finisce con /exec).
 * 6. Su Vercel: Project Settings -> Environment Variables -> aggiungi
 *    GOOGLE_SHEETS_WEBHOOK_URL = <quell'URL> (su Production), poi redeploy.
 *
 * Il backend Next.js (lib/sheets.ts) manda già un JSON in questo formato:
 * { email, nome, telefono, messaggio, canale, fonte, stato }
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('CONTATTI');

    sheet.appendRow([
      new Date(),
      data.nome || '',
      data.email || '',
      data.telefono || '',
      data.messaggio || '',
      data.fonte || '',
      data.canale || 'sito',
      data.stato || 'nuovo',
    ]);

    logEvent_('nuovo_lead', data.email || '(email mancante)');

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    logEvent_('errore', String(err));
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function logEvent_(evento, dettaglio) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var log = ss.getSheetByName('LOG');
  if (log) log.appendRow([new Date(), evento, dettaglio]);
}
