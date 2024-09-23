const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  let userForm = document.getElementById("registrationForm");
  
  const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
      entries = JSON.parse(entries);
    } else {
      entries = [];
    }
    return entries;
  };
  
  let userEntries = retrieveEntries();
  
  const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map(entry => {
      const age = calculateAge(entry.dob);
      const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
      const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
      const ageCell = `<td class='border px-4 py-2'>${age}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions ? "Yes" : "No"}</td>`;
      const row = `<tr>${nameCell} ${emailCell} ${dobCell} ${ageCell} ${acceptTermsCell}</tr>`;
      return row;
    }).join("\n");
  
    const table = `
      <table class="table-auto w-full mt-5">
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">DOB</th>
          <th class="px-4 py-2">Age</th>
          <th class="px-4 py-2">Accepted Terms?</th>
        </tr>
        ${tableEntries}
      </table>`;
  
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
  };
  
  const showError = (message) => {
    let errorDiv = document.getElementById("error-message");
    errorDiv.innerHTML = message;
    errorDiv.style.display = "block";
  };
  
  const saveUserForm = (event) => {
    event.preventDefault();  
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;
    

    let errorDiv = document.getElementById("error-message");
    errorDiv.innerHTML = "";
    errorDiv.style.display = "none";
    
    let isValid = true;
    

    if (!name) {
      document.querySelector('label[for="name"]').style.color = "red";
      isValid = false;
    } else {
      document.querySelector('label[for="name"]').style.color = "black";
    }
    
    if (!email) {
      document.querySelector('label[for="email"]').style.color = "red";
      isValid = false;
    } else {
      document.querySelector('label[for="email"]').style.color = "black";
    }
  
    if (!password) {
      document.querySelector('label[for="password"]').style.color = "red";
      isValid = false;
    } else {
      document.querySelector('label[for="password"]').style.color = "black";
    }
  
    if (!dob) {
      document.querySelector('label[for="dob"]').style.color = "red";
      isValid = false;
    } else {
      document.querySelector('label[for="dob"]').style.color = "black";
    }
  
   
    if (!isValid) {
      showError("Please fill out all required fields.");
      return;
    }
  
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
      showError("You must be between 18 and 55 years old to register.");
      return;
    }
  
    const entry = {
      name,
      email,
      password,  
      dob,
      acceptedTermsAndConditions
    };
  
    userEntries.push(entry);  
    localStorage.setItem("user-entries", JSON.stringify(userEntries));  
    displayEntries();  
  };
  

  userForm.addEventListener("submit", saveUserForm);
  
  displayEntries();
  