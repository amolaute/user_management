//variables used
var itemsPerPage = null;
let currentPage = 1;
var pageData;
const tableBody = document.querySelector("#dataTable tbody");
var deleteIndex = null;
var filteredArr;
var admin = [{
  firstname: "Admin",
  middlename: "Admin",
  lastname: "Admin",
  email: "admin@gmail.com",
  contactType: "work",
  gender: "male",
  contact: "9999999999",
  permanentAddress: "Admin Home",
  currentAddress: "Admin Home",
  dob: "21-07-1999"
}];

//get data from localstorage
function getStoredData() {
  return JSON.parse(localStorage.getItem("persons")) || admin;
}
//store data on localstorage
function storeData(data) {
  localStorage.setItem("persons", JSON.stringify(data));
}

function getPerPageItem() {
  let num = document.getElementById("perPageItem").value;
  itemsPerPage = parseInt(num);
  displayDataInTable();
}

function displayDataInTable(page = 1) {
  let arrPerson;
  if (document.getElementById("search").value) {
    // console.log("filtered conditions");
    arrPerson = filteredArr;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, arrPerson.length);
    pageData = arrPerson.slice(startIndex, endIndex);
  } else {
    arrPerson = getStoredData();
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, arrPerson.length);
    pageData = arrPerson.slice(startIndex, endIndex);
  }

  tableBody.innerHTML = "";
  pageData.forEach((item, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent =
      item.firstname + " " + item.middlename + " " + item.lastname;
    row.appendChild(nameCell);

    const genderCell = document.createElement("td");
    genderCell.textContent = item.gender;
    row.appendChild(genderCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = item.email;
    row.appendChild(emailCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = item.contact;
    row.appendChild(phoneCell);

    const actionsCell = document.createElement("td");
    actionsCell.setAttribute("class", "m-1");
    actionsCell.className = "d-flex flex-wrap flex-md-nowrap";

    // Edit Button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.setAttribute("data-toggle", "modal");
    editButton.setAttribute("data-target", "#editModal");
    editButton.className = "btn btn-primary btn-sm m-1 w-100 text-white";
    editButton.style.backgroundColor = "#0099ff"; // Light Blue
    editButton.style.borderColor = "#0099ff";
    editButton.onclick = () => editItem(index);
    actionsCell.appendChild(editButton);

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("data-toggle", "modal");
    deleteButton.setAttribute("data-target", "#deleteModal");
    deleteButton.className = "btn btn-danger btn-sm m-1 w-100 text-white";
    deleteButton.style.backgroundColor = "#dc3545"; // Red
    deleteButton.style.borderColor = "#dc3545";
    deleteButton.onclick = () => deleteItem(index);
    actionsCell.appendChild(deleteButton);

    // View Button
    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.setAttribute("data-toggle", "modal");
    viewButton.setAttribute("data-target", "#viewModal");
    viewButton.className = "btn btn-info btn-sm m-1 w-100 text-white";
    viewButton.style.backgroundColor = "#00bcd4"; // Teal
    viewButton.style.borderColor = "#00bcd4";
    viewButton.onclick = () => viewItem(index);
    actionsCell.appendChild(viewButton);

    row.appendChild(actionsCell);

    // Append the new row to the table body
    tableBody.appendChild(row);
  });
  document.getElementById(
    "page-info"
  ).textContent = `Page ${currentPage} of ${Math.ceil(
    arrPerson.length / itemsPerPage
  )}`;
  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled =
    currentPage === Math.ceil(arrPerson.length / itemsPerPage);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayDataInTable(currentPage);
  }
}

function nextPage() {
  const arrPerson = getStoredData();
  if (currentPage < Math.ceil(arrPerson.length / itemsPerPage)) {
    currentPage++;
    displayDataInTable(currentPage);
  }
}

function getGender() {
  let gender = document.getElementsByName("gender");
  let selectedGender = null;
  for (i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      selectedGender = gender[i].value;
    }
  }
  return selectedGender;
}

function emailUnique() {
  let newMail = document.getElementById("email").value;
  let newcontact = document.getElementById("contact").value;
  const arr = getStoredData();
  const isEmailUnique = arr.every((person) => person.email !== newMail);
  const isContactUnique = arr.every((person) => person.contact !== newcontact);

  if (!isEmailUnique && !isContactUnique) {
    alert("This email is already in use. Please use a different email.");
    alert(
      "This contact number is already in use. Please use a different contact number."
    );
  } else {
  }
}

function addPerson() {
  const newfirstname = document.getElementById("firstname").value.trim();
  const newmiddlename = document.getElementById("middlename").value.trim();
  const newlastname = document.getElementById("lastname").value.trim();
  const newemail = document.getElementById("email").value.trim();
  const newcontactType = document.getElementById("contact-type").value.trim();
  const newgender = getGender();
  const newcontact = document.getElementById("contact").value.trim();
  const newp_add = document.getElementById("p_add").value.trim();
  const newc_add = document.getElementById("c_add").value.trim();
  const newdob = document.getElementById("dob").value.trim();

  if (
    newfirstname &&
    newmiddlename &&
    newlastname &&
    newemail &&
    newcontact &&
    newp_add &&
    newc_add &&
    newcontactType &&
    newdob
  ) {
    let submit = document.getElementById("form_submit");
    submit.setAttribute("data-dismiss", "modal");

    const new_person = {
      firstname: newfirstname,
      middlename: newmiddlename,
      lastname: newlastname,
      email: newemail,
      contactType: newcontactType,
      gender: newgender,
      contact: newcontact,
      permanentAddress: newp_add,
      currentAddress: newc_add,
      dob: newdob,
    };
    alert("Form Save Successfully");

    const arrPerson = getStoredData();
    arrPerson.unshift(new_person);
    storeData(arrPerson);

    document.getElementById("firstname").value = "";
    document.getElementById("middlename").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact-type").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("p_add").value = "";
    document.getElementById("c_add").value = "";
    document.getElementById("dob").value = "";

    displayDataInTable(currentPage);
  } else {
    alert("All fields are mandentory. Please fill all fields");
  }
}

function deleteItem(index) {
  let arrPerson;
  if (document.getElementById("search").value) {
    arrPerson = filteredArr;
  } else {
    arrPerson = getStoredData();
  }
  deleteIndex = (currentPage - 1) * itemsPerPage + index;
  document.getElementById(
    "delStatement"
  ).innerHTML = `Are you Sure You Want To Delete ?<h5>${
    arrPerson[deleteIndex].firstname +
    " " +
    arrPerson[deleteIndex].middlename +
    " " +
    arrPerson[deleteIndex].lastname +
    " "
  }</h5>`;
}

function confirmDel() {
  const arrPerson = getStoredData();
  if (document.getElementById("search").value) {
    let contToDel = filteredArr[deleteIndex].contact;
    arrPerson.forEach((e1, index) => {
      if (e1.contact == contToDel) {
        arrPerson.splice(index, 1);
        storeData(arrPerson);
      }
    });
    displayDataInTable(currentPage);
  } else {
    arrPerson.splice(deleteIndex, 1);
    storeData(arrPerson);
    displayDataInTable(currentPage);
  }
  alert("Data Deleted Successfully");
}

function setGender(item) {
  let gender = document.getElementsByName("e_gender");

  for (i = 0; i < gender.length; i++) {
    // console.log(item.gender);
    // console.log(gender[i].value);
    if (gender[i].value == item.gender) {
      gender[i].setAttribute("checked", "");
    }
  }
}

function editItem(index) {
  currentIndex = (currentPage - 1) * itemsPerPage + index;
  let item = getStoredData()[currentIndex];
  setGender(item);
  document.getElementById("e_firstname").value = item.firstname;
  document.getElementById("e_middlename").value = item.middlename;
  document.getElementById("e_lastname").value = item.lastname;
  document.getElementById("e_email").value = item.email;
  document.getElementById("e_contact-type").value = item.contactType;
  // document.querySelector(`input[name ="e_gender"][value = "${item.gender}"]`).checked = true;
  document.getElementById("e_contact").value = item.contact;
  document.getElementById("e_p_add").value = item.permanentAddress;
  document.getElementById("e_c_add").value = item.currentAddress;
  document.getElementById("e_dob").value = item.dob;

  if (item.permanentAddress == item.currentAddress) {
    document.getElementById("e_c-add-Check").setAttribute("checked", "");
    document.getElementById("e_c_add").setAttribute("disabled", "");
  }
}

function saveChanges() {
  let updatedPerson = {
    firstname: document.getElementById("e_firstname").value.trim(),
    middlename: document.getElementById("e_middlename").value.trim(),
    lastname: document.getElementById("e_lastname").value.trim(),
    email: document.getElementById("e_email").value.trim(),
    contactType: document.getElementById("e_contact-type").value.trim(),
    gender: document.querySelector('input[name="e_gender"]:checked').value,
    contact: document.getElementById("e_contact").value.trim(),
    permanentAddress: document.getElementById("e_p_add").value.trim(),
    currentAddress: document.getElementById("e_c_add").value.trim(),
    dob: document.getElementById("e_dob").value.trim(),
  };
  const arrPerson = getStoredData();
  arrPerson[currentIndex] = updatedPerson;
  storeData(arrPerson);
  displayDataInTable(currentPage);
  let btnSub = document.getElementById("sub");
  btnSub.setAttribute("data-dismiss", "modal");

  alert("Form Save Successfully");
}

function e_sameAdd() {
  if (document.getElementById("e_c-add-Check").checked) {
    //edit form
    let e_add = document.getElementById("e_c_add");
    e_add.value = document.getElementById("e_p_add").value;
    e_add.setAttribute("disabled", "");
  } else {
    let e_cadd = document.getElementById("e_c_add");
    e_cadd.value = "";
    e_cadd.removeAttribute("disabled", "");
  }
}

function sameAdd() {
  if (document.getElementById("c-add-Check").checked) {
    let add = document.getElementById("c_add");
    add.value = document.getElementById("p_add").value;
    add.setAttribute("disabled", "");
  } else {
    let cadd = document.getElementById("c_add");
    cadd.value = "";
    cadd.removeAttribute("disabled", "");
  }
}

function filterItem(value) {
  const arrPerson = getStoredData();
  filteredArr = arrPerson.filter(
    (e1) =>
      e1.firstname.toLowerCase().includes(value.toLowerCase()) ||
      e1.middlename.toLowerCase().includes(value.toLowerCase()) ||
      e1.lastname.toLowerCase().includes(value.toLowerCase()) ||
      e1.contact.toLowerCase().includes(value.toLowerCase()) ||
      e1.gender.toLowerCase().includes(value.toLowerCase()) ||
      e1.email.toLowerCase().includes(value.toLowerCase())
  );
  //   console.log(filteredArr);
  //   displayFilteredData(filteredArr);
  displayDataInTable();
}

function viewItem(index) {
  let arrPerson;
  if (document.getElementById("search").value) {
    arrPerson = filteredArr;
  } else {
    arrPerson = getStoredData();
  }
  let currentIndex = (currentPage - 1) * itemsPerPage + index;
  item = arrPerson[currentIndex];
  document.getElementById("v_fullname").innerHTML =
    "-  " + item.firstname + " " + item.middlename + " " + item.lastname;
  document.getElementById("v_email").innerHTML = "-  " + item.email;
  document.getElementById("v_contact-type").innerHTML =
    "-  " + item.contactType;
  document.getElementById("v_contact").innerHTML = "-  " + item.contact;
  document.getElementById("v_gender").innerHTML = "-  " + item.gender;
  document.getElementById("v_c_add").innerHTML = "-  " + item.currentAddress;
  document.getElementById("v_p_add").innerHTML = "-  " + item.permanentAddress;
  document.getElementById("v_dob").innerHTML = "- " + item.dob;
}

// methods called on page load
getPerPageItem();
displayDataInTable();
