/**
 * controllers: {
 *  onNoteSelect, 
 *  onNoteDelete, 
 *  onNoteUpdate, 
 *  onAddNote
 * }
 */

export default class NotesView{

    constructor(root,  controllers){
        this.root = root;
        for(const prop in controllers){
            this[prop] = controllers[prop];
        }
        this.root.innerHTML = `
            <div class = "notes__sidebar">
                <button class = "notes__add" type = "button">Add Note</button>
                <div class = "notes__list"></div>
            </div>
            <div class = "notes__preview">
                <input class = "notes__title" type = "text" placeholder = "Enter a title...">
                <textarea class = "notes__body" placeholder = "Enter note's body here..."></textarea>
            </div>
        `;

        const addNoteBtn = this.root.querySelector('.notes__add');
        const newNoteTitle = this.root.querySelector('.notes__title');
        const newNoteBody = this.root.querySelector('.notes__body');

        addNoteBtn.addEventListener('click', () => { this.onAddNote(); });

        const inputUpdateController = () => {
            const [updatedTitle, updatedBody] = [newNoteTitle.value.trim(), newNoteBody.value.trim()];
            if(updatedBody || updatedTitle)
                this.onNoteUpdate(updatedTitle, updatedBody);
        }

        newNoteTitle.addEventListener('blur', inputUpdateController);
        newNoteBody.addEventListener('blur', inputUpdateController);

    };

    #createListItem = (note) =>{

        const {id, title, body, updated} = note;

        const MAX_BODY_LENGTH = 60;

        return `
            <div class = "notes__list-item" data-note-id = "${id}">
                <div class = "notes__small-title">${title}</div>
                <div class = "notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class = "notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    };

    updateNotesList = (notes) => {
        const notesList = this.root.querySelector('.notes__list');
        notesList.innerHTML = "";
        notes.forEach((note) => {
            notesList.innerHTML += this.#createListItem(note);
        });

        notesList.querySelectorAll('.notes__list-item').forEach((note) => {
            note.addEventListener('click', () => { this.onNoteSelect(note.dataset.noteId); });
            note.addEventListener('dblclick', () => { 
                const deleteConfirmation = confirm('Do you want to delete this note ?');
                if(deleteConfirmation)
                    this.onNoteDelete(note.dataset.noteId);
            });
        });

    };

    updateActiveNote = (note) => {
        this.root.querySelector('.notes__title').value = note.title;
        this.root.querySelector('.notes__body').value = note.body;

        const notes = this.root.querySelectorAll('.notes__list-item');
        notes.forEach(item => {
            if(item.dataset.noteId != note.id)
                item.classList.remove('notes__list-item--selected');
            else
                item.classList.add('notes__list-item--selected');
        });
        return note.id;
    }

};
