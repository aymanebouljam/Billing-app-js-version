const piècesList = JSON.parse(localStorage.getItem("piècesList"));

//Redirect
const checkData = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    if(!data){
        window.location.href = "formulaire.html";
    }
}

//fetch table
const fetchData = (liste) =>{
    const tbody = document.getElementById("tableBody");
    if(tbody){
         tbody.innerHTML = "";
         if(liste.length > 0){
             liste.forEach(item => {
                 tbody.innerHTML += `
                     <tr>
                         <td>${item.designation}</td>
                         <td>${item.prix_unitaire}</td>
                         <td>
                             <input type="number" id="quantité" value="0" min="0" class="form-control border border-dark w-50 mx-auto">
                         </td>
                         <td><input type="checkbox" class="checkbox form-check-input border border-3 border-dark" id ="checkbox" onclick="handleCheck(this)"></td>
                     </tr>
                 `;
             });
         }
    }
 }
 
 window.onload = () => {
    checkData();
    fetchData(piècesList);
 }
//handle Check

const handleCheck = (btn) => {

    const row = btn.parentElement.parentElement;
    const designation = row.cells[0].innerHTML;
    const prix_unitaire = row.cells[1].innerHTML;
    const quantité = row.cells[2].querySelector('input').value;
    if(quantité == 0){
        window.alert("Veuillez choisir une quantité");
        row.cells[3].querySelector("input").checked = false;
    }else{
        formData.push({
            designation,
            prix_unitaire,
            quantité
        });
    }
};

//handle table

let formData = [];

const handleTable = () => {
    if(data){
        if(formData.length === 0){
            window.alert("Veuillez choisir les pièces nécessaires");
            return;
        }
        localStorage.removeItem("data");
        const newData = {
            ...data,
            pièces : [
                ...formData,
            ]
        }
        localStorage.setItem("data", JSON.stringify(newData));
        window.location.href = "devis.html";
    }
};

// Pagination

$(document).ready(function() {
    $('#piècesTable').DataTable({
        language: {
                "sProcessing": "Traitement en cours...",
                "sSearch": "Rechercher&nbsp;:",
                "sLengthMenu": "Afficher _MENU_ éléments",
                "sInfo": "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
                "sInfoEmpty": "Affichage de l'élément 0 à 0 sur 0 éléments",
                "sInfoFiltered": "(filtré de _MAX_ éléments au total)",
                "sLoadingRecords": "Chargement en cours...",
                "sZeroRecords": "Aucun élément à afficher",
                "sEmptyTable": "Aucune donnée disponible dans le tableau",
                "oPaginate": {
                    "sFirst": "Premier",
                    "sPrevious": "Précédent",
                    "sNext": "Suivant",
                    "sLast": "Dernier"
                    }
        },
        lengthChange: false,
        pageLength: 3,
        initComplete: function() {
            $('#piècesTable').fadeIn(); 
        }
    });
});
