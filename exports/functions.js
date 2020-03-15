const Path = require('path')
const fs = require('fs')
const Excel = require('exceljs')
const ObjectsToCsv = require('objects-to-csv');

module.exports = function writeToFile(arr, path) {

  let ext = Path.extname(path)
  let keys_array = Object.keys(arr[0])

  function columns(key_arr) {
    let excel_columns = []
    key_arr.forEach(function (element) {
      excel_columns.push({
        header: element[0].toUpperCase() + element.slice(1),
        key: element,
        width: 20
      })
    });
    return excel_columns
  }

  switch (ext) {
    case '.json':
      fs.writeFileSync(path, JSON.stringify(arr, null, 4))
      break;
    case '.xlsx':

      let workbook = new Excel.Workbook();
      let worksheet = workbook.addWorksheet('Sheet 1');

      worksheet.columns = columns(keys_array)

      arr.forEach(function (obj, key) {
        worksheet.addRow(obj)
      })

      workbook.xlsx.writeFile(path)
      break;
    case '.csv':
      const csv = new ObjectsToCsv(arr)
      csv.toDisk(path)
      break;
    default:
      console.log('Incorrect file extension or it is not supported')
  }
}

