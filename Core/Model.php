<?php

namespace Core;

use PDO;
use App\Config;

/**
 * Base model
 */
abstract class model
{
	/**
	 * Get the PDO database connection
	 *
	 * @return mixed
	 */
	protected static function getDB()
	{
		static $db = null;

		if ($db === null)
		{

			$dsn = 'mysql:host=' . Config::DB_HOST . ';dbname='. Config::DB_NAME . ';charset=utf8';
			$db = new PDO($dsn, config::DB_USER, config::DB_PASSWORD);

			// Throw an Exception when an error occurs
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			return $db;
		} else {
			return $db;
		}
	}
}
