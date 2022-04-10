import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

const app = document.getElementById('app');

let notes = NotesAPI.getAllNotes();
let activeNote = null;

const resetPreview = () => {
    const template = {
        title: "",
        body: ""
    };
    view.updateActiveNote(template);
    activeNote = null;
}

const controllers = {
    
    onAddNote(){
        console.log('add note button was clicked.');
        resetPreview();
        fetchNotesAgain();
    },

    onNoteSelect(id){
        activeNote = notes.find((item) => item.id == id);
        view.updateActiveNote(activeNote);
    },

    onNoteDelete(id){
        NotesAPI.deleteNote(id);
        resetPreview();
        fetchNotesAgain();
    },

    onNoteUpdate(newTitle, newBody){
        const newNote = {
            id: (activeNote !== null ? activeNote.id : null),
            title: newTitle,
            body: newBody
        }
        NotesAPI.saveNote(newNote);
        fetchNotesAgain();
        activeNote = notes.find(item => item.id === newNote.id);
        view.updateActiveNote(activeNote);
    }
    
};

const view = new NotesView(app, controllers);

const fetchNotesAgain = () => {
    notes = NotesAPI.getAllNotes();
    view.updateNotesList(notes);
}

view.updateNotesList(notes);
