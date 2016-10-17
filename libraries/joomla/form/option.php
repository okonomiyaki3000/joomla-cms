<?php
/**
 * @package     Joomla.Platform
 * @subpackage  Form
 *
 * @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('JPATH_PLATFORM') or die;

/**
 * Abstract Form Option class for the Joomla Platform.
 *
 * @package     Joomla.Platform
 * @subpackage  Form
 * @since       11.1
 */
abstract class JFormOption
{
	/**
	 * Method to get a list of options.
	 *
	 * @param   SimpleXMLElement  $option     <option/> element
	 * @param   string            $fieldname  The name of the field containing this option.
	 *
	 * @return  array  A list of objects representing HTML option elements (such as created by JHtmlSelect::option).
	 *
	 * @since   11.1
	 */
	public static function getOptions(SimpleXMLElement $option, $fieldname = '')
	{
		// Filter requirements
		if ($requires = explode(',', (string) $option['requires']))
		{
			// Requires multilanguage
			if (in_array('multilanguage', $requires) && !JLanguageMultilang::isEnabled())
			{
				return array();
			}

			// Requires associations
			if (in_array('associations', $requires) && !JLanguageAssociations::isEnabled())
			{
				return array();
			}
		}

		$type = $option['type'] ? (string) $option['type'] : 'standard';

		$class = JFormHelper::loadOptionClass($type);

		return $class ? $class::getOptions($option, $fieldname) : array();
	}
}
