<?php

namespace App;

/**
 * Flash notification messages: messages for one-time display using the session
 * for storage between requests.
 */
class Flash
{
	/**
	 * Success message type
	 *
	 * @var string
	 */
	const SUCCESS = 'success';

	/**
	 * Success message type
	 *
	 * @var string
	 */
	const WARNING = 'warning';

	/**
	 * Success message type
	 *
	 * @var string
	 */
	const INFO = 'info';

	/**
	 * Add a message
	 *
	 * @param string $message The message content
	 *
	 * @return void
	 */
	public static function addMessage($message, $type = 'success')
	{
		// Create array in the session if it doesn't already exist
		if (! isset($_SESSION['flash_notifications'])) {
			$_SESSION['flash_notifications'] = [];
		}

		// Append message to the array
		$_SESSION['flash_notifications'][] = [
			'body' => $message,
			'type' => $type
		];
	}

	/**
	 * Get all messages
	 *
	 * @return mixed An array with all the messages or null if none is set
	 */
	public static function getMessages()
	{
		if (isset($_SESSION['flash_notifications'])) {
			$messages = $_SESSION['flash_notifications'];
			unset($_SESSION['flash_notifications']);
			return $messages;
		}
	}
}
