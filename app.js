var selectedRow = null;

// show alert 

function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert ${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector("main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Field 

function clearField() {
    document.querySelector("#name").value="";
    document.querySelector("#email").value="";
    document.querySelector("#PhoneNumber").value="";
}

// Add Data 

document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values 
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phoneNumber = document.querySelector("#PhoneNumber").value;

    // Validate
    if(name == "" || email == "" || phoneNumber == "") {
        showAlert("Please fill in all field", "danger");
    }
    else {
        if(selectedRow == null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${name}</td>
                <td>${email}</td>
                <td>${phoneNumber}</td>  
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "Success");
        }
        else {
            selectedRow.children[0].textContent = name;
            selectedRow.children[1].textContent = email;
            selectedRow.children[2].textContent = phoneNumber;
            selectedRow = null;
            showAlert("Student Information Edited", "Info");
        }

        clearField();
    }
});

// Edit Data 
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#name").value = selectedRow.children[0].textContent;
        document.querySelector("#email").value = selectedRow.children[1].textContent;
        document.querySelector("#phoneNumber").value = selectedRow.children[2].textContent;
    }
})


// Delete Data

document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");    
    }
});