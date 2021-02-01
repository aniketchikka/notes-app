const chalk=require("chalk");
const { title } = require("process");
const yargs=require("yargs");

const notes=require('./notes');


//yargs command for adding a note
yargs.command({
    command:'add',
    describe:'add a note',
    showInHelp:true,
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'note body',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.add(argv.title,argv.body);
   }
})

//yargs command for removing a note
yargs.command({
    command:'remove',
    describe:'remove a note',
    showInHelp:true,
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        
        notes.remove(argv.title);
    }
})

//yargs command for listing all notes
yargs.command({
    command:"list",
    describe:"listing all notes",
    showInHelp:true,
    handler(){
        notes.list();
    }
})

//yargs command for reading a note
yargs.command({
    command:"read",
    describe:"reading a note",
    showInHelp:true,
    builder:{
        title:{
            describe:"note title",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.read(argv.title);
    }
})
yargs.parse();
