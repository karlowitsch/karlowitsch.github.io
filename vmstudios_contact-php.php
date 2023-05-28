<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Empfänger-E-Mail-Adresse
    $empfaenger = "lightvisionar@gmail.com";
    
    // Absender-Daten aus dem Formular
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    
    // E-Mail-Inhalt
    $inhalt = "Name: $name\n";
    $inhalt .= "E-Mail: $email\n\n";
    $inhalt .= "Nachricht:\n$message";
    
    // E-Mail-Header
    $header = "From: $name <$email>\r\n";
    $header .= "Reply-To: $email\r\n";
    
    // E-Mail senden
    if (mail($empfaenger, $subject, $inhalt, $header)) {
        echo "Die E-Mail wurde erfolgreich versendet.";
    } else {
        echo "Beim Versenden der E-Mail ist ein Fehler aufgetreten.";
    }
}
?>