IMask(
  document.getElementById('phoneMask'),
  {
    mask: '+{7}(000)000-00-00'
  }
)

const lastname = document.getElementById('lastname');
const name = document.getElementById('name');
const postname = document.getElementById('postname');
const phoneMask = document.getElementById('phoneMask');
const mail = document.getElementById('mail');
const manager = document.getElementById('manager');
const btnSubmit = document.getElementById('btnSubmit');
const error = document.getElementById('error');
const errorLastname = document.getElementById('errorLastname');
const errorName = document.getElementById('errorName');
const errorPostname = document.getElementById('errorPostname');
const errorPhoneMask = document.getElementById('errorPhoneMask');
const errorMail = document.getElementById('errorMail');
const errorManager = document.getElementById('errorManager');
const errorPassword = document.getElementById('errorPassword');
const errorReplayPassword = document.getElementById('errorReplayPassword');
const tickOne = document.getElementById('tickOne');

btnSubmit.addEventListener('click', function () {
  const password = document.getElementById('password')
  const replayPassword = document.getElementById('replayPassword');

  if (lastname.value === "") {
    errorLastname.textContent = "1. Пожалуйста заполните поле Фамилия";
  } else {
    errorLastname.textContent = " "
  }

  if (name.value === "") {
    errorName.textContent = "2. Пожалуйста заполните поле Имя";
  } else {
    errorName.textContent = ""
  }

  if (postname.value === "") {
    errorPostname.textContent = "3. Пожалуйста заполните поле Отчество";
  } else {
    errorPostname.textContent = ""
  }

  if (phoneMask.value === "") {
    errorPhoneMask.textContent = "4. Пожалуйста заполните поле Телефон";
  } else {
    errorPhoneMask.textContent = ""
  }

  if (mail.value === "") {
    errorMail.textContent = "5. Пожалуйста заполните поле Электронная почта";
  } else {
    errorMail.textContent = ""
  }


  if (manager.value === "Выберите менеджера") {
    errorManager.textContent = "6. Выберите пожалуйста менеджера";
  } else {
    errorManager.textContent = ""
  }

  if (password.value.length < 8 || password.length > 20) {
    errorPassword.textContent = "7. Пожалуйста заполните поле Пароль (Длина от 8 до 20 символов)";
  } else {
    errorPassword.textContent = ""
  }

  if (replayPassword.value.length < 8 || password.value !== replayPassword.value) {
    errorReplayPassword.textContent = "8. Пожалуйста заполните поле Повторите пароль (Длина от 8 символов)";
  } else {
    errorReplayPassword.textContent = ""
  }

});

tickOne.addEventListener('change', function () {
  if (tickOne.checked) {
    password.type = 'text';
    replayPassword.type = 'text';

  } else {
    password.type = 'password';
    replayPassword.type = 'password';
  }
})

const fileInput1 = document.getElementById('fileInput1');
const fileInput2 = document.getElementById('fileInput2');
const fileInput3 = document.getElementById('fileInput3');
const imgContainerPassport = document.getElementById('img_container_passport');
const imgContainerPropiska = document.getElementById('img_container_propiska');
const imgContainerDogovor = document.getElementById('img_container_dogovor');
const pageName = document.getElementById('pageName');
const propiskaName = document.getElementById('propiskaName');
const dogovorName = document.getElementById('dogovorName');

document.getElementById('uploadButton1').addEventListener('click', function (event) {
  event.preventDefault();
  fileInput1.click();
});

document.getElementById('uploadButton2').addEventListener('click', function (event) {
  event.preventDefault();
  fileInput2.click();
});

document.getElementById('uploadButton3').addEventListener('click', function (event) {
  event.preventDefault();
  fileInput3.click();
});

fileInput1.addEventListener('change', function () {
  const file = fileInput1.files[0];
  displayUploadedPhoto(file, imgContainerPassport, pageName, 'passport-image');
});

fileInput2.addEventListener('change', function () {
  const file = fileInput2.files[0];
  displayUploadedPhoto(file, imgContainerPropiska, propiskaName, 'propiska-image');
});

fileInput3.addEventListener('change', function () {
  const file = fileInput3.files[0];
  displayUploadedPhoto(file, imgContainerDogovor, dogovorName, 'dogovor-image');
});

function displayUploadedPhoto(file, container, nameParagraph, className) {

  const reader = new FileReader();
  reader.onload = function (e) {

    container.innerHTML = '';

    const img = document.createElement('img');
    img.src = e.target.result;
    img.style.width = '250px';
    img.style.height = '150px';
    img.classList.add(className);

    container.appendChild(img);

    nameParagraph.textContent = file.name;
  };

  reader.readAsDataURL(file);
}

const pageDeleteButton = document.getElementById('page-delete');
const pageDownloadButton = document.getElementById('page-dowload');
const propiskaDeleteButton = document.getElementById('propiska-delete');
const propiskaDownloadButton = document.getElementById('propiska-dowload');
const dogovorDeleteButton = document.getElementById('dogovor-delete');
const dogovorDownloadButton = document.getElementById('dogovor-dowload');

pageDeleteButton.addEventListener('click', function (event) {
  event.preventDefault();
  imgContainerPassport.innerHTML = '';
  pageName.textContent = '';
});

propiskaDeleteButton.addEventListener('click', function (event) {
  event.preventDefault();
  imgContainerPropiska.innerHTML = '';
  propiskaName.textContent = '';
});

dogovorDeleteButton.addEventListener('click', function (event) {
  event.preventDefault();
  imgContainerDogovor.innerHTML = '';
  dogovorName.textContent = '';
});

pageDownloadButton.addEventListener('click', function (event) {
  event.preventDefault();
  downloadImage('passport-image');
});

propiskaDownloadButton.addEventListener('click', function (event) {
  event.preventDefault();
  downloadImage('propiska-image');
});

dogovorDownloadButton.addEventListener('click', function (event) {
  event.preventDefault();
  downloadImage('dogovor-image');
});

function downloadImage(imageClass) {
  const image = document.getElementsByClassName(imageClass);
  const imageURL = image.name;

  const a = document.createElement('a');
  a.href = imageURL;
  a.download = imageURL;

  a.click();
}

function submitForm() {
  const formData = new FormData(document.getElementById('yourFormId'));

  formData.append('passport_photo', document.getElementById('fileInput1').files[0]);
  formData.append('propiska_photo', document.getElementById('fileInput2').files[0]);
  formData.append('dogovor_photo', document.getElementById('fileInput3').files[0]);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'register.php', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.error('Произошла ошибка:', xhr.statusText);
    }
  };
  xhr.send(formData);
}