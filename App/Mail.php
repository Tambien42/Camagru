<?php

namespace App;

use Mailgun\Mailgun;
use App\Config;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

/**
 * Mail
 */
class Mail
{
	/**
	 * Send a message
	 *
	 * @param string $to recipient
	 * @param string $subject Subject
	 * @param string $text Text-only content of the message
	 * @param string $html HTML content of the message
	 *
	 * @return int 1 if success
	 */
	public static function send($to, $subject, $text, $html)
	{
		// # Instantiate the client.
		// $mgClient = new Mailgun(Config::MAILGUN_API_KEY);
		// $domain = Config::MAILGUN_DOMAIN;
		// # Make the call to the client.
		// $result = $mgClient->sendMessage($domain, array(
		// 	'from'	=> 'fkchuc@gmail.com',
		// 	'to'	=> $to,
		// 	'subject' => $subject,
		// 	'text'	=> $text
		// ));

		$mail = new PHPMailer;

		$mail->isSMTP();                            // Set mailer to use SMTP
		$mail->Host = 'smtp.gmail.com';             // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                     // Enable SMTP authentication
		$mail->Username = 'camagru42student@gmail.com';          // SMTP username
		$mail->Password = 'Camagru1234'; // SMTP password
		$mail->SMTPSecure = 'tls';                  // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 587;                          // TCP port to connect to

		$mail->setFrom('fkchuc@gmail.com', 'Camagru');
		$mail->addReplyTo('fkchuc@gmail.com', 'Camagru');
		$mail->addAddress($to);   // Add a recipient
		//$mail->addCC('cc@example.com');
		//$mail->addBCC('bcc@example.com');
		// Add attachments
		//$mail->addAttachment('/var/tmp/file.tar.gz');
		//$mail->addAttachment('/tmp/image.jpg', 'new.jpg'); // Optional name

		$mail->isHTML(true);  // Set email format to HTML

		$mail->Subject = $subject;
		$mail->Body    = $html;

		return $mail->send();
		//$mail->SMTPDebug = 4;
		// if(!$mail->send()) {
		// 	$output = 'Message could not be sent.';
		// 	echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
		// 	echo "<script>console.log('Debug Objects: " . $mail->ErrorInfo . "' );</script>";
		// } else {
		// 	$output = 'Message has been sent';
		// 	echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
		// }
	}

	protected static function debug_to_console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}
}
