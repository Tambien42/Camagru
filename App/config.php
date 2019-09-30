<?php

namespace App;

/**
 * Application configuration
 */
class Config
{
	/**
	 * Database host
	 *
	 * @var string
	 */
	const DB_HOST = 'localhost';

	/**
	 * Database name
	 *
	 * @var string
	 */
	const DB_NAME = 'mvc';

	/**
	 * Database user
	 *
	 * @var string
	 */
	const DB_USER = 'root';

	/**
	 * Database password
	 *
	 * @var string
	 */
	const DB_PASSWORD = 'root';

	/**
	* Show or hide error messages on screen
	*
	* @var boolean
	*/
	const SHOW_ERRORS = true;

	/**
	 * Secret key for hashing
	 * @var string
	 */
	const SECRET_KEY = 'YD2kUr82X2U6CfLGngVt8NE0yf3V46Sq';
}
