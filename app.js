document.querySelector(".form-signin").addEventListener("submit", saveInfo);

function saveInfo(e) {
  const socialMedia = document.querySelector("#inputSocial").value;
  const email = document.querySelector("#inputEmail").value;
  const password = document.querySelector("#inputPassword").value;

  if (!socialMedia && !email && !password) {
    alert("Please fill the form correctly");
    return false;
  }

  const info = {
    socialMedia: socialMedia,
    email: email,
    password: password
  };

  if (localStorage.getItem("infos") === null) {
    let infos = [];
    infos.push(info);
    localStorage.setItem("infos", JSON.stringify(infos));
  } else {
    let infos = JSON.parse(localStorage.getItem("infos"));
    infos.push(info);
    localStorage.setItem("infos", JSON.stringify(infos));
  }

  e.preventDefault();

  fetchInfos();
}

function deleteInfos(socialMedia) {
  let infos = JSON.parse(localStorage.getItem("infos"));

  for (let i = 0; i < infos.length; i++) {
    if (infos[i].socialMedia === socialMedia) {
      infos.splice(i, 1);
    }
  }

  localStorage.setItem("infos", JSON.stringify(infos));

  fetchInfos();
}

function fetchInfos() {
  let infos = JSON.parse(localStorage.getItem("infos"));
  let infosResults = document.querySelector("#infosResults");

  infosResults.innerHTML = "";
  for (let i = 0; i < infos.length; i++) {
    let socialMedia = infos[i].socialMedia;
    let email = infos[i].email;
    let password = infos[i].password;

    infosResults.innerHTML += `<div class='mt-3 w-95 my-3 m-auto p-3'>
                                <h4 class='bg-primary jumbotron p-4 text-white'>${socialMedia}
                                <a class="btn btn-warning mx-3 my-3 text-dark">${email}</a>
                                <a class="btn btn-warning mx-3 my-3 text-dark">${password}</a>
                                <a onclick="deleteInfos('${socialMedia}')" class='btn btn-sm btn-danger m-2'>Delete</a>
                                </h4>
                               </div>`;
  }
}
