
/* Example of object creation and insertion on the element
var para = document.createElement("P");               // Create a <p> element
para.innerText = "This is a paragraph";               // Insert text
document.body.appendChild(para);                      // Append <p> to <body>

    <div class="item">
        <div class="item_firstrow">
            <button class="item_firstrow_button"><i class="fas fa-pen"></i></button>
            <button class="item_firstrow_button"><i class="fas fa-trash"></i></button>
        </div>
    
        <h2>Bhaskara</h2>
        <p>
            \[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]
        </p>
    </div>
*/
let cards = document.getElementsByClassName("item");
let titles = document.getElementsByClassName("item_title");
let description = document.getElementsByClassName("item_description");

let tip = document.getElementById("tip");

function AddItems() {
    // Creating Elements

    let item = document.createElement("div"); // create "card"
    item.className = "item"; // set card class to "item"

    item.id = cards.length;

    let firstRow = document.createElement("div"); // create "card first row"
    firstRow.className = "item_firstrow"; // set card first row class to "item_firstrow"

    let editbutton = document.createElement("button"); // create "edit button"
    let editicon = document.createElement("i");  // create icon "for edit button"
    editbutton.className = "item_firstrow_button"; // set edit button class to "item_firstrow_button"
    editicon.className = "fas fa-pen"; // set edit icon to "fas fa-pen"

    let trashbutton = document.createElement("button"); // create "trash button"
    let trashicon = document.createElement("i");  // create icon for "trash icon"
    trashbutton.className = "item_firstrow_button"; // set trash button class to "item_firstrow_button"
    trashicon.className = "fas fa-trash"; // set trash icon to "fas fa-trash"

    editbutton.onclick = () => Edit(item.id);
    trashbutton.onclick = () => RemoveItems(item.id);

    let h2 = document.createElement("h2");
    h2.id = "h2"+item.id;
    h2.className = "item_title";
    h2.innerHTML = "Edit this title!";

    let p = document.createElement("p");
    p.id = "p"+item.id;
    p.className = "item_description";
    p.innerHTML = "Edit this description!";

    // Putting Elements inside card

    editbutton.appendChild(editicon); // Icon inside button
    trashbutton.appendChild(trashicon);

    firstRow.appendChild(editbutton); // Button inside firstrow
    firstRow.appendChild(trashbutton);

    item.appendChild(firstRow); //Elements inside item
    item.appendChild(h2);
    item.appendChild(p);

    let grid = document.getElementById("grid"); // Adding item to container
    grid.appendChild(item);

    tip.style.opacity = 0;
}

function RemoveItems(id){
    let grid = document.getElementById("grid");
    let item = document.getElementById(id);

    grid.removeChild(item);

    //Reorganizing div id's
    for (let i  = id; i < cards.length; i++) {
        let newid = i;
        cards[i].id = ChangeLastChar(cards[i].id, newid);
        titles[i].id = ChangeLastChar(titles[i].id, newid);
        description[i].id = ChangeLastChar(description[i].id, newid);
    }

    if (cards.length === 0) {
        tip.style.opacity = 0.2;
    }    
}

function Edit(id) {
   try {
    let item = document.getElementById(id);

    let h2 = document.getElementById("h2"+id);
    let p = document.getElementById("p"+id);

    let h2Data = h2.innerHTML;
    let pData = p.innerHTML;

    item.removeChild(h2); //Deleting this elements to toggle for input
    item.removeChild(p);

    let h2Input = document.createElement("input");
    h2Input.id = "h2Input";
    h2Input.value = h2Data;
    let pInput = document.createElement("input");
    pInput.id = "pInput";
    pInput.value = pData;

    item.appendChild(h2Input); //Adding new inputs
    item.appendChild(pInput);

    let saveButton = document.createElement("button");
    item.appendChild(saveButton);
    saveButton.id = "saveButton";
    saveButton.className = "item_saveButton";
    saveButton.innerHTML = "Save Changes";
    saveButton.onclick = () => SaveChanges(item.id);
   } catch (error) {
       
   }
}

function SaveChanges(id) {
    let item = document.getElementById(id);

    let h2Input = document.getElementById("h2Input");
    let h2Data = h2Input.value;

    let pInput = document.getElementById("pInput");
    let pData = pInput.value;

    let saveButton = document.getElementById("saveButton");
    
    item.removeChild(h2Input);
    item.removeChild(pInput);
    item.removeChild(saveButton);

    let h2 = document.createElement("h2");
    h2.id = "h2"+id;
    h2.className = "item_title";
    h2.innerHTML = h2Data;
    let p = document.createElement("p");
    p.id = "p"+id;
    p.className = "item_description";
    p.innerHTML = pData;

    item.appendChild(h2);
    item.appendChild(p);

}

function ChangeLastChar(string, newchar) {
    let st = string.slice(0, -1);
    return st + newchar;
}

