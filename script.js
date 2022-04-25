class App{

    constructor(){
        this.notesContentElement = document.createElement("div");
        this.table = document.createElement("table");
        this.tableHead = document.createElement("thead");
        this.tableHead.innerHTML = `<th>Note Title</th>
                                    <th>Note Content</th>
                                    <th>Settings</th>`

        this.tableBody = document.createElement("tbody");

        this.table.appendChild(this.tableHead);

        this.table.appendChild(this.tableBody);

        this.notesContentElement.appendChild(this.table);

        document.body.appendChild(this.notesContentElement);

        this.loadNotes();




    }
    
    /**
     * 
     * @param {string} form_name : the name of the form
     * @param {string} formId : the id of the form
     */
    createEntryForm(form_name, formId){
        this.formId = formId;
        this.form_name = form_name;

        const formDivElement = document.createElement("div");

        formDivElement.innerHTML = `
            <h4>${this.form_name}</h4>
            <form id='${this.formId}' method='POST'>
                                <div>
                                    <label>Note Title</label><br>
                                    <input type='text' name='title'>
                                </div>
                                    <br>
                                <div>
                                <label>Note Content</label><br>
                                    <textarea name='content'></textarea>
                                </div>

                                <div>
                                    <button type='submit'>Create Note</button>                                
                                </div>
                            </form>`

            document.body.appendChild(formDivElement);


    }

    async createNote(title, content){

        const new_note = {
            note_title: title,
            note_content: content,
            id: 'note_' + new Date().getTime()
        }

       let storedNotes = localStorage.getItem("notes");

       if(storedNotes != null){
           storedNotes = JSON.parse(storedNotes);
       }else{
           storedNotes = [];
       }

        storedNotes.push(new_note)

        localStorage.setItem("notes", JSON.stringify(storedNotes));

        return {
            message: "Note created successfully",
            data: new_note,
            code: "success"
        }

        
    }

   

    loadNotes(){
    
       let notes = localStorage.getItem("notes");
    
        if(notes != null){
            notes = JSON.parse(notes);

            if(notes.length > 0){

                this.tableBody.innerHTML = " ";
                for(let i = 0; i < notes.length; i++){

                    this.tableBody.innerHTML += `<tr>
                                <td>${notes[i].note_title}</td>
                                <td>${notes[i].note_content}</td>
                                <td><button onclick="app.deleteNote('${notes[i].id}')">Delete Note</button></td>
                            </tr>`

                }



            }else{
                //table = "No content at the moment"
            }



        }else{
            //No notes at the moment
            //table = "No content at the moment"

        }

        //this.notesContentElement.innerHTML = table;

       

    }

    deleteNote(note_id){

        console.log('Delete this note')


    }



 
}


const app = new App;

app.createEntryForm('Create Note Form', 'create-note-form-id');

if(typeof app.formId != "undefined" || app.formId != null){

    document.querySelector(`#${app.formId}`).addEventListener("submit", async function(e){
        e.preventDefault();

        note_title = this.title.value.trim();
        note_content = this.content.value.trim();

        feedback = await app.createNote(note_title, note_content)

        app.loadNotes();

    })

}








