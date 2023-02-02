#!/usr/bin/node

const command = process.argv[2]
const fs = require('fs');
const fileName = './pets.json';
const file = require(fileName); //returns JSON pets array 
const obj = {}
// console.log(command)

if(command.toLowerCase() === 'create') {
    if (process.argv.length === 6) {
        obj.age = parseInt(process.argv[3])
        obj.kind = process.argv[4]
        obj.name = process.argv[5]
    
        file.push(obj)
    
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) {
                console.log(err)
            }

            console.log(obj)
          });
    }
    else {
        console.log('Usage: node pets.js create AGE KIND NAME')
    }
} else if (command.toLowerCase() === 'read') {
    if (process.argv[3]) {
        if (process.argv[3] >= 0 && process.argv[3] < file.length) {
            console.log(file[process.argv[3]])
        } else {
            console.log("Usage: node pets.js read INDEX")
        }
    } else {
        console.log(file)
    }
} else if(command.toLowerCase() === 'update') {
    // process.argv [node, pets.js, create, index, age, kind, name] => length: 7
    if (process.argv.length === 7){
        obj.age = parseInt(process.argv[4])
        obj.kind = process.argv[5]
        obj.name = process.argv[6]
        
        file[process.argv[3]] = obj

        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) {
                console.log(err)
            }

            console.log(obj)
        })
    } else {
        console.log('Usage: node pets.js update INDEX AGE KIND NAME')
    }
} else if (command.toLowerCase() === 'destroy'){
    if (process.argv.length === 4){
        //	arr.splice(index,numberOfEleToRemove)
        file.splice([process.argv[3]], 1)

        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) {
                console.log(err)
            }

            console.log(file)
        })
    } else {
        console.log('Usage: node pets.js destroy INDEX')
    }
} else {
    console.log('Usage: node pets.js [create | read | update | destroy]')
}