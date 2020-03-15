# Example script for converting an xml file to xlsl.

Node.js script using the "cheerio" library to get structured data from an xml file.


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
What things you need to install the software.

- Git.
- NPM.

## Install
Clone the git repository on your computer
```
$ git clone https://github.com/alavir-ua/js-xml2xlsx-converter.git
```
You can also download the entire repository as a zip file and unpack in on your computer if you do not have git

After cloning the application, you need to install it's dependencies.
```
$ npm install
```
Create the "result_data" directory in the root of your project.

You can change your xml in the file "export / xml .js", you must also rewrite the index.js file in accordance with the tags of your file.

## Run the application
```
$ node index
```
You will receive the resulting xlsx file in the "resalt_data" folder.
