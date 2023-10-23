// Variables
let users; // List of Users | Array
let user; // Logged in user | JSON Object

// Initialize all variables and elements
initialization();

function initialization() {
  users = [];
  user = {};

  // Bindings
  $(`#btnMCreate`).click(function () {
    registerUser();
  });

  $(`#btnFNext`).click(function () {
    CheckUsername($(`#txtFUsername`).val());
  });

  $(`#btnFUpdate`).click(function () {
    UpdatePassword($(`#btnNew`).val(), $(`#btnConfNew`).val());
  });

  $(`#btnLogin`).click(function () {
    login($(`#txtUsername`).val(), $(`#txtPassword`).val());
  });
}

//sign in
function login(username = "", password = "") {
  if (!username && !password) return;

  let indexOfUser = users.findIndex((userToFind) => {
    return (
      userToFind.username == username &&
      userToFind.password == password &&
      !userToFind.isDeleted
    );
  });

  if (indexOfUser == -1) return alert("User not found.");
  else {
    user = users[indexOfUser];
    showUsers(indexOfUser);
    $("#txtUsername").prop("readonly", true);
    $(`#txtPassword`).prop("readonly", true);
    $(`#btnLogin`).prop("class", "d-none");
    $(`#btnLogout`).prop("class", "col-3 btn btn-outline-danger");
  }

  $(`#txtUsername`).val("");
  $(`#txtPassword`).val("");
}

$(`#btnLogout`).click(function () {
  logOut();
});

//logout
function logOut() {
  user = {};
  $(`#btnLogout`).prop("class", "d-none");
  $(`#btnLogin`).prop("class", "col-3 btn btn-outline-primary");

  $(`#txtUsername`).val("");
  $(`#txtPassword`).val("");
  $("#txtUsername").prop("readonly", false);
  $(`#txtPassword`).prop("readonly", false);
  showUsers();
}

//create user
function registerUser() {
  // CREATE
  // Get values of modal
  if ($(`#txtMEmail`).val() == "") alert(`Email Address is required.`);
  else if ($(`#txtMPassword`).val() == "") alert(`Password is required.`);
  else if (
    $(`#txtMConfirmPassword`).val() == "" ||
    $(`#txtMPassword`).val() !== $(`#txtMConfirmPassword`).val()
  )
    alert(`Password does not match.`);
  else if ($(`#txtMAddress`).val() == "") alert(`Address is required.`);
  else {
    // No Error
    users.push({
      id: users.length,
      username: $(`#txtMEmail`).val(),
      password: $(`#txtMPassword`).val(),
      address: $(`#txtMAddress`).val(),
      birthdate: $(`#txtMBirthdate`).val(),
      gender: $(`input[name='rbMGender']:checked`).val(),
      isDeleted: false
    });

    $(`#txtMEmail`).val("");
    $(`#txtMPassword`).val("");
    $(`#txtMConfirmPassword`).val("");
    $(`#txtMAddress`).val("");
    $(`#txtMBirthdate`).val("");
    $(`#txtMYearLevel`).val("");
    console.log(`The size of the users array is ${users.length}`, users);
    alert("User has been successfully created."); // Alert message
    $(`#btnMClose`).click(); //for closing modal
  }
}

function CheckUsername(username = "") {
  if (!username) return;

  let indexOfUser = users.findIndex((userToFind) => {
    return userToFind.username == username && !userToFind.isDeleted;
  });

  if (indexOfUser == -1) return alert("User not found.");
  else {
    user = users[indexOfUser];
    $("#forgotModal0").modal("hide");
    $("#forgotModal1").modal("show");
  }

  $(`#btnFUpdate`).off();
  $(`#btnFUpdate`).click(() => {
    if ($(`#btnConfNew`).val() == "")
      return alert(`Please enter your new password.`);
    else if ($(`#btnConfNew`).val() == "")
      return alert(`Re-enter your new password to confirm.`);
    else if (
      $(`#btnConfNew`).val() == "" ||
      $(`#btnNew`).val() !== $(`#btnConfNew`).val()
    )
      return alert(`Password does not match.`);

    let updateduserpass = users[indexOfUser];
    updateduserpass.password = $(`#btnNew`).val();
    updateUserPassword(updateduserpass);
    console.log("Update has been clicked.");
    $("#forgotModal1").modal("hide");
  });

  $(`#txtFUsername`).val("");
  $(`#btnNew`).val("");
  $(`#btnConfNew`).val("");
}

function updateUserPassword() {
  alert(`Password has been successfully updated.`);
  $(`#btnVClose`).click();
}
