<?php

namespace App\Controllers;

use \Core\View;
use \App\Auth;
use \Models\User;

/**
 * Gallery Controller
 * Extending Authenticated to require login for all methods in class.
 */
class Gallery extends \Core\Controller
{
	/**
	 * Gallery index
	 *
	 * @return void
	 */
	public function indexAction()
	{
		View::renderTemplate('Gallery/index.html');
	}

	/**
	 * show the snapshot page
	 *
	 * @return void
	 */
	public function snapshotAction()
	{
		View::renderTemplate('Gallery/snapshot.html');
	}

	/**
	 * show the bonus page
	 *
	 * @return void
	 */
	public function bonusAction()
	{
		View::renderTemplate('Gallery/bonus.html');
	}
}
