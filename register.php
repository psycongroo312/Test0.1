<?php

$conn = mysqli_connect('localhost', 'root', '', 'users');

if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $lastname = $_POST["lastname"];
    $name = $_POST["name"];
    $postname = $_POST["postname"];
    $phone = $_POST["phone"];
    $mail = $_POST["mail"];
    $manager = $_POST["manager"];
    $password = $_POST["password"];
    $replayPassword = $_POST["replayPassword"];

    $targetDir = "uploads/";

    $file1 = $_FILES["fileInput1"];
    $file2 = $_FILES["fileInput2"];
    $file3 = $_FILES["fileInput3"];

    $fileName1 = $_FILES["fileInput1"]["name"];
    $fileName2 = $_FILES["fileInput2"]["name"];
    $fileName3 = $_FILES["fileInput3"]["name"];

    $tmpName1 = $file1["tmp_name"];
    $tmpName2 = $file2["tmp_name"];
    $tmpName3 = $file3["tmp_name"];

    move_uploaded_file($tmpName1, "$targetDir/$fileName1");
    move_uploaded_file($tmpName2, "$targetDir/$fileName2");
    move_uploaded_file($tmpName3, "$targetDir/$fileName3");

    if (empty($lastname) || empty($name) || empty($postname) || empty($phone) || empty($mail) || empty($manager) || empty($password)) {
        echo "Пожалуйста, заполните все поля формы.";
        echo '<br><a href="javascript:history.back()">Вернуться назад</a>';
        exit;
    }

    if ($password !== $replayPassword){
        echo "Пожалуйста, заполните все поля формы.";
        echo '<br><a href="javascript:history.back()">Вернуться назад</a>';
        exit;
    }

    $sql = "INSERT INTO users (lastname, name, postname, phone, mail, manager, password, file1, file2, file3)
    VALUES ('$lastname', '$name', '$postname', '$phone', '$mail', '$manager', '$password', '$fileName1', '$fileName2', '$fileName3')";

    if ($conn->query($sql) === TRUE) {
        echo "Данные успешно отправлены в БД";
    } else {
        echo "Ошибка: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();