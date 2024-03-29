// Your  API key
//sk_06f137a75a6dd7b0fb29127428349e7f
//sk_73654efaa8d73d3573d0a16fa288e84f
//sk_f81f71a9bb48250864182e187fa726bc
//sk_541498fe3fa237a56b82979abbc4af80
const API_Token = "sk_fe19462934b785a41c85101033039ad3";


function getEmployees() {
  // The domain of the company you want to search for
  const companyDomain = document.getElementById("company-domain").value;

  // The Clearbit API endpoint for company information
  const endpoint = `https://prospector.clearbit.com/v1/people/search?domain=${companyDomain}`;

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set up the request headers
  xhr.open("GET", endpoint);
  xhr.setRequestHeader("Authorization", `Bearer ${API_Token}`);

  // Define what to do when the response is received
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Extract the employees array from the response data
      const employees = JSON.parse(xhr.responseText).results;
      console.log(`Employees of ${companyDomain}:`);
      console.log(employees);
      let output = "";
      employees.forEach((employee) => {
        output += `<div class="grid grid-cols-3 gap-4 border mb-4 rounded-lg">
                    <p class="font-bold text-lg">${employee.name.fullName}</p>
                    <p class="text-gray-600">${employee.role}</p>
                    <p class="mt-2">${employee.email}</p>
                   </div>`;
      });
      document.getElementById("result").innerHTML = output;

      // Enable the copy button
      document.getElementById("copy-button").disabled = false;
    } else {
      console.error(`Error: ${xhr.statusText}`);
    }
  };

  // Define what to do on error
  xhr.onerror = () => {
    console.error("Request failed.");
  };

  // Send the request
  xhr.send();
}

function copyEmails() {
  // Get all email elements
  const emailElements = document.querySelectorAll("#result p:last-child");

  // Create an array of email addresses
  const emails = [];
  emailElements.forEach((element) => {
    emails.push(element.textContent);
  });

  // Create a temporary input element to copy the emails to the clipboard
  const tempInput = document.createElement("input");
  tempInput.value = emails.join(", ");
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  // Show a success message
  const successMessage = document.getElementById("success-message");
  successMessage.classList.remove("hidden");
  setTimeout(() => {
    successMessage.classList.add("hidden");
  }, 3000);
}

// Add event listeners to the buttons
document.getElementById("search-button").addEventListener("click", getEmployees);
document.getElementById("copy-button").addEventListener("click", copyEmails);
