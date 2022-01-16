var cardsDB = JSON.parse(localStorage.getItem("cards") || "[]");

function RenderCards() {
    grid.innerHTML = cardsDB.map((card, id)=>`
        <div class="item" id="card_${id}">
            <div class="item_firstrow">
                <button class="item_checkButton" onclick="SaveChanges(${id})"><i class="fas fa-check" ></i></button>
                <button class="item_firstrow_button" onclick="Edit(${id})"><i class="fas fa-pen"></i></button>
                <button class="item_firstrow_button" onclick="RemoveItems(${id})"><i class="fas fa-trash" ></i></button>
            </div>

            <h2 onkeypress="cardsDB[${id}].title = this.innerHTML;">${card.title}</h2>
            <p  onkeypress="cardsDB[${id}].description = this.innerHTML;">${card.description}</p>
        </div>
    `).join('');

    let tip = document.getElementById("tip");
    if ( cardsDB.length > 0) {
        tip.style.opacity = 0;
    } else {
        tip.style.opacity = 0.2;
    }
}

function RemoveItems(id){
    cardsDB.splice(id, 1);
    RenderCards();
    SaveChanges();
}

function AddItem() {
    var card = {title: "Default", description: "Default"};
    cardsDB.push(card);
    RenderCards();
    SaveChanges();
}

function Edit(id) {
   document.querySelector("#card_"+id).classList.toggle("editing");
   let h2 = document.querySelector("#card_"+id+" h2");
   let p = document.querySelector("#card_"+id+" p");
   h2.contentEditable = p.contentEditable = true;
}

function SaveChanges() {
    document.querySelectorAll("*[contentEditable=true]").forEach(e=>e.contentEditable = !(e.contentEditable=="true"));
    document.querySelectorAll(".editing").forEach(e=>e.classList.toggle("editing"));
    localStorage.setItem("cards", JSON.stringify(cardsDB));
}

RenderCards();