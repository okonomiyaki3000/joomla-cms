<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Editors.codemirror
 *
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access
defined('_JEXEC') or die;

$params     = $displayData->params;
$fontFamily = isset($displayData->fontFamily) ? $displayData->fontFamily : 'monospace';
$fontSize   = $params->get('fontSize', 13) . 'px;';
$lineHeight = $params->get('lineHeight', 1.2) . 'em;';


// Set the active line color.
$color = $params->get('activeLineColor', '#a4c2eb');
$r = hexdec($color{1} . $color{2});
$g = hexdec($color{3} . $color{4});
$b = hexdec($color{5} . $color{6});
$activeLineColor = 'rgba(' . $r . ', ' . $g . ', ' . $b . ', .5)';

// Set the color for matched tags.
$color = $params->get('highlightMatchColor', '#fa542f');
$r = hexdec($color{1} . $color{2});
$g = hexdec($color{3} . $color{4});
$b = hexdec($color{5} . $color{6});
$highlightMatchColor = 'rgba(' . $r . ', ' . $g . ', ' . $b . ', .5)';

?>
<?php ob_start(); ?>
<style type="text/css">
<?php ob_end_clean(); ?>

.CodeMirror
{
	font-family: <?php echo $fontFamily; ?>;
	font-size: <?php echo $fontSize; ?>;
	line-height: <?php echo $lineHeight; ?>;
	border: 1px solid #ccc;
}

/* In order to hid the Joomla menu */
.CodeMirror-fullscreen
{
	z-index: 1040;
}
/* Make the fold marker a little more visible/nice */
.CodeMirror-foldmarker
{
	background: rgb(255, 128, 0);
	background: rgba(255, 128, 0, .5);
	box-shadow: inset 0 0 2px rgba(255, 255, 255, .5);
	font-family: serif;
	font-size: 90%;
	border-radius: 1em;
	padding: 0 1em;
	vertical-align: middle;
	color: white;
	text-shadow: none;
}
.CodeMirror-foldgutter, .CodeMirror-markergutter { width: 1.2em; text-align: center; }
.CodeMirror-markergutter { cursor: pointer; }
.CodeMirror-markergutter-mark { cursor: pointer; text-align: center; }
.CodeMirror-markergutter-mark:after { content: "\25CF"; }

.CodeMirror-activeline-background { background: <?php echo $activeLineColor; ?>; }
.CodeMirror-matchingtag { background: <?php echo $highlightMatchColor; ?>; }

.CodeMirror-toolbar
{
	padding: .2em;
	background: #eee;
	border: 1px solid #e6e6e6;
	border-bottom: 0;
}

.CodeMirror-toolbar .cm-tb-btn
{
	line-height: 1em;
	text-align: center;
	padding: 1px .5em 0 .5em;
	font-size: 8px;
}

.CodeMirror-toolbar .cm-tb-btn-close
{
	float: right;
}

<?php ob_start(); ?>
</style>
<?php ob_end_clean(); ?>
