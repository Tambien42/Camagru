<?php

namespace App\Controllers;

use \Core\View;
use \App\Auth;

/**
 * Items Controller
 * Extending Authenticated to require login for all methods in class.
 */
class Items extends Authenticated
{
	/**
	 * Items index
	 *
	 * @return void
	 */
	public function indexAction()
	{
		View::renderTemplate('Items/index.html');
	}

	/**
	 * Show an item
	 *
	 * @return void
	 */
	public function showAction()
	{
		echo "Show Action";
	}

	/**
	 * Add new item
	 *
	 * @return void
	 */
	public function newAction()
	{
		echo "new Action";
	}
}
