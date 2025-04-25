const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Directory containing Excel files
const directory = "/home/vnr/Downloads/combine/";
const outputFile = path.join(directory, "combined_output.xlsx");

// Read all .xlsx files in the directory
const files = fs.readdirSync(directory).filter(file =>
  file.endsWith(".xlsx") && file !== "combined_output.xlsx"
);

let allData = [];

files.forEach(file => {
  const filePath = path.join(directory, file);
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Read first sheet
  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Add filename to each row (optional)
  const enrichedData = sheetData.map(row => ({
    ...row,
    SourceFile: file
  }));

  allData = allData.concat(enrichedData);
});

// Convert combined data to worksheet
const newWorkbook = xlsx.utils.book_new();
const newWorksheet = xlsx.utils.json_to_sheet(allData);
xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "Combined");

// Write to a new file
xlsx.writeFile(newWorkbook, outputFile);

console.log(`✅ Combined file created at: ${outputFile}`);

