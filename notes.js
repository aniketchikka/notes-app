const chalk=require('chalk');
const { timeLog } = require('console');
const fs=require('fs');
const { title } = require('process');

//function for adding a note
const add=(title,body)=>{

    const notes=loadNotes();

    const duplicateNote=notes.find(note=>note.title===title);

    if(!duplicateNote){
        //es6 shorthand property 
        notes.push({
            title,
            body
        })
        console.log(chalk.green.inverse('Note Added!'));
        saveNotes(notes);
    }
    else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

//function for removing a note
const remove=(title)=>{

    const notes=loadNotes();

    const newNotes=notes.filter(note=>note.title!==title)

    if(newNotes.length<notes.length){
        console.log(chalk.green.inverse('Note removed'));
        saveNotes(newNotes);
    }
    else{
        console.log(chalk.red.inverse('No note found!'));
    }
}

//function for listing all notes
const list=()=>{
    console.log(chalk.inverse('Your Notes!!!!'));
    const notes=loadNotes();
    notes.forEach(note => console.log(chalk.greenBright(note.title)));
}

//function for reading a note
const read=(title)=>{
    
    const notes=loadNotes();
    const note=notes.find(e=>e.title===title)

    if(note)
    {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse('No note found!'))
    }
}

//utility funtions

const loadNotes=()=>{

    //return a array from json file 
    //if file is note created already, return [] empty array in catch block

    try{
        const jsonData=fs.readFileSync('notes.json','utf-8');
        const dataArray=JSON.parse(jsonData);
        return dataArray
    }
    catch(e){
        return [];
    }
}

//write notes array in json file
//use stringify before writing
const saveNotes=(notes)=>{
    //stringy the the object array
    const jsonData=JSON.stringify(notes);
    fs.writeFileSync('notes.json',jsonData);

}

module.exports={
    add:add,
    remove:remove,
    list:list,
    read:read
}