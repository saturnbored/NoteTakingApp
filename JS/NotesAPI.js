export default class NotesAPI{

    static getAllNotes(){
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        return notes;
    }

    static saveNote(noteToBeSaved){
        try{

            let notes = this.getAllNotes();
            noteToBeSaved.updated = new Date().toISOString();

            const existing = notes.find(note => noteToBeSaved.id && note.id === noteToBeSaved.id);

            if(noteToBeSaved.id && existing){
                for(const prop in noteToBeSaved){
                    existing[prop] = noteToBeSaved[prop];
                }
            }
            else{
                noteToBeSaved.id = Math.floor(Math.random() * 1000);
                notes.push(noteToBeSaved);
            }
            localStorage.setItem("notesapp-notes", JSON.stringify(notes));
            return noteToBeSaved.id;
        }
        catch(err){
            console.log(err);
            throw new Error('An unexpected error occurred');
        }
    }

    static deleteNote(id){
        try{
            let notes = this.getAllNotes();
            notes.splice(notes.findIndex(item => item.id === id), 1);
            localStorage.setItem("notesapp-notes", JSON.stringify(notes));
        }
        catch(err){
            console.log(err);
            throw new Error('An unexpected error occurred');
        }
    }

};
