const fs = require('fs');
const crypto = require('crypto');
const otherFile = require('./dummy');
const start = Date.now();
const OS = require('os')
crypto.pbkdf2("password", 'salt', 100000, 1024, 'sha512', ()=>{
    console.log(Date.now()-start, "password")
})
crypto.pbkdf2("password", 'salt', 100000, 1024, 'sha512', ()=>{
    console.log(Date.now()-start, "password")
})
crypto.pbkdf2("password", 'salt', 100000, 1024, 'sha512', ()=>{
    console.log(Date.now()-start, "password")
})
crypto.pbkdf2("password", 'salt', 100000, 1024, 'sha512', ()=>{
    console.log(Date.now()-start, "password")
})

fs.readFile('dummy.txt', 'utf-8', (err, data)=>{
    console.log(data)
    console.log('==================')
    setTimeout(()=>{
        console.log(`print timer 2`)
    },0)
     setTimeout(()=>{
        console.log(`print timer 3`)
    },3000)
    setImmediate(()=>{
        console.log(`print SetImmediate 2`)
    })
})
console.log('Top level code 1')