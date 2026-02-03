npm create vite@latest memorylane-tunes
npm install -D tailwindcss postcss autoprefixer
npm install tailwindcss @tailwindcss/vite

Google Sheet Extension App Script Logic and post deployment replace with exec url
function doGet(e) {
return ContentService.createTextOutput("OK");
}

function doPost(e) {
const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getActiveSheet();
const data = JSON.parse(e.postData.contents);

sheet.appendRow([
data.language,
data.song,
new Date(),
data.memory
]);

return ContentService.createTextOutput("OK")
.setMimeType(ContentService.MimeType.TEXT);
}
