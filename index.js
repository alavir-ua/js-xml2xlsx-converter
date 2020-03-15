const cheerio = require('cheerio')
const fs = require('fs')
const chalk = require('chalk')
const xml = require('./exports/xml.js');

//экспорт функции записи результатов в файл
const writeToFile = require('./exports/functions')

//запуст счетчика времени
let start = process.hrtime();

//путь записи результатов в файл (json, xlsx, csv)
let result_path = './result_data/result.xlsx'
//массив рузультатов
let results = []

//счетчик блоков
let block_counter = 0

const $ = cheerio.load(xml, {xmlMode: true});

// получение блока записи предприятия
const all_block = $('SUBJECT');

all_block.each(function () {
  let block_params = {};

  block_params['НАЗВА'] = $(this).find('SHORT_NAME').text();
  block_params['СТАН'] = $(this).find('STAN').text();
  block_params['ВИД ДІЯЛЬНОСТІ'] = $(this).find('ACTIVITY_KIND').first().find('NAME').text();
  block_params['АДРЕСА'] = $(this).find('ADDRESS').text();
  block_params['ЗАСНОВНИК'] = $(this).find('FOUNDER').text();
  block_params['КОНТАКТИ'] = $(this).find('CONTACTS').text();
  results.push(block_params);
  block_counter++
  console.log(block_counter + chalk.blue(' block was added successfully.'))
})
console.log(results);


//действия после завершения обработки блоков
writeToFile(results, result_path);

//задерживаем проверку записи файла на 5 сек
function alert() {
  if (fs.statSync(result_path).size !== 0) {
    console.log('')
    console.log(chalk.green('Data was added to file successfully, added  ') + results.length + chalk.green('  items'))
    console.log('')
    //остановка счетчика времени и вывод
    let end = (process.hrtime(start)[0] / 60).toFixed([1])
    console.log(chalk.green('Execution time: ') + end + chalk.green(' min'))
  } else {
    console.log(chalk.red('Error writing data to file!'))
  }
}

setTimeout(alert, 5000);



