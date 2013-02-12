<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_languages
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Languages Overrides Controller
 *
 * @package     Joomla.Administrator
 * @subpackage  com_languages
 * @since       2.5
 */
class LanguagesControllerOverrides extends JControllerAdmin
{
	/**
	 * The prefix to use with controller messages
	 *
	 * @var		string
	 * @since	2.5
	 */
	protected $text_prefix = 'COM_LANGUAGES_VIEW_OVERRIDES';

	/**
	 * Method for deleting one or more overrides
	 *
	 * @return  void
	 *
	 * @since		2.5
	 */
	public function delete()
	{
		// Check for request forgeries
		JSession::checkToken() or die(JText::_('JINVALID_TOKEN'));

		// Redirect here regardless of any outcome
		$this->setRedirect(JRoute::_('index.php?option='.$this->option.'&view='.$this->view_list, false));

		// Get items to dlete from the request
		$cid	= JRequest::getVar('cid', array(), '', 'array');

		if (!is_array($cid) || count($cid) < 1)
		{
			$this->setMessage(JText::_($this->text_prefix.'_NO_ITEM_SELECTED'), 'warning');
			return;
		}

		// Get the model
		$model = $this->getModel('overrides');

		JPluginHelper::importPlugin('content');
		$dispatcher	= JDispatcher::getInstance();

		// Trigger the onContentBeforeDelete event.
		$dataObject = JObject(array('keys' => $cid));
		$result = $dispatcher->trigger('onContentBeforeDelete', array('com_languages.override', &$dataObject));
		if (in_array(false, $result, true))
		{
			// There are some errors in the plugins
			$errors = $dataObject->getErrors();
			$this->setMessage(JText::plural('COM_LANGUAGES_ERROR_BEFORE_DELETE', count($errors), implode('<br />', $errors)), 'error');
			return;
		}

		// Remove the items
		if (!$model->delete($dataObject->keys))
		{
			$this->setMessage($model->getError());
		}

		// Trigger the onContentAfterSave event.
		$dispatcher->trigger('onContentAfterDelete', array('com_languages.override', &$dataObject));

		$this->setMessage(JText::plural($this->text_prefix.'_N_ITEMS_DELETED', count($cid)));

	}
}
