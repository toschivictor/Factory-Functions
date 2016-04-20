'use strict';

const logGenerator = (config) => {
 	let header    = config.header || [];
 	let directory = config.directory || './';

 	header.push('TIME');
 	header = header.join('\t');
 	header = header + '\r\n';

 	//set file name
 	const createFileName = () => {
 		let today = new Date();
 		let fileName = `logs-${config.logType}-${today.getDate()}-${today.getMonth()}-${today.getFullYear()}.txt`;
 
 		return fileName;
 	};
 
 	return function() {
        let values = Array.prototype.slice.call(arguments);
        values.push((new Date()).toLocaleString());
        values = values.join('\t') + '\r\n';
 
        //verify existent file
		let verifyFile = new Promise((resolve, reject) => {
 			fs.readFile(path.resolve(directory + createFileName()), 'utf8', (err, data) => {
 				if (err) reject(false);
 				else resolve(true);
 			});
 		});

		verifyFile.then((value) => {
 			//true - insert the lines at the same file
 			fs.appendFile(directory + createFileName(), values, 'utf8', (err) => {
 				if (err) throw err;
 			});
		},
		(reason) => {
 			//false - create the header file
 			let lines = header + values;
			fs.appendFile(directory + createFileName(), lines, 'utf8', (err) => {
  				if (err) throw err;
  			});

  		});
  	}
  };
  
const log = logGenerator({
	file: 'log',
 	logType: 'gsheets',
		directory: './',
 		header: ['ID', 'ERROR']
});

setInterval(() => log('foo', 'bar'), 1000); 