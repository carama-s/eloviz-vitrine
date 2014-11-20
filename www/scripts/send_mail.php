<?php

require_once dirname(__FILE__).DIRECTORY_SEPARATOR.'phpmailer/PHPMailerAutoload.php';

if (isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])) {
    echo "POST ok !";

    if (empty($_POST['firstname']) || empty($_POST['lastname']) || empty($_POST['email']) || empty($_POST['subject']) || empty($_POST['message'])) {
        $data = array('success' => false, 'message' => 'Missing information');
        echo json_encode($data);
        exit;
    }

    $mail = new PHPMailer();

    $mail->isSMTP();                                  // Set mailer to use SMTP
    $mail->Host = 'aspmx.l.google.com';               // Specify main and backup SMTP servers
    $mail->SMTPAuth = false;                          // Enable SMTP authentication
    //$mail->Username = '';                           // SMTP username
    //$mail->Password = '';                           // SMTP password
    //$mail->SMTPSecure = 'tls';                      // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 25;

    $mail->From = $_POST['email'];
    $mail->FromName = $_POST['firstname'] . " " . $_POST['lastname'];
    $mail->AddAddress('stephane.caramanno@gmail.com');
    $mail->Subject = $_POST['subject'];
    $mail->Body = "Name: " . $_POST['firstname'] . " " . $_POST['lastname'] . "\r\n\r\nMessage: " . stripslashes($_POST['message']);

    if (isset($_POST['phone'])) {
        $mail->Body .= "\r\n\r\nPhone: " . $_POST['phone'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Sent !');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);
}

?>
