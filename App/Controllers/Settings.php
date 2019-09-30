<?php

namespace App\Controllers;

use \Core\view;
use \App\Auth;
use \App\Flash;

/**
 * Settings controller
 */

class Settings extends Authenticated
{
	/**
     * Before filter - called before an action method.
     *
     * @return void
     */
    protected function before()
    {
		parent::before(); // avoid access settings page if not logged in
		$this->user = Auth::getUser();
    }

	/**
	 * Show Settings
	 *
	 * @return void
	 */
	public function showAction()
	{
		View::renderTemplate('Settings/show.html', [
			'user' => $this->user
		]);
	}

	/**
	 * Show the form for editing information
	 *
	 * @return void
	 */
	public function editAction()
	{
		View::renderTemplate('Settings/edit.html', [
			'user' => $this->user
		]);
	}

	/**
	 * Update Profile
	 *
	 * @return void
	 */
	public function updateAction()
	{
		if ($this->user->updateProfile($_POST)) {
			Flash::addMessage('Change saved');
			$this->redirect('/settings/show');
		} else {
			View::renderTemplate('Settings/edit.htlm', ['user' => $this->user]);
		}
	}
}
