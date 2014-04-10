/**
 * jquery.tumblrMoArchs.js
 *
 * Display monthly archives widget for Tubmlr.
 *
 * @category    jQuery plugin
 * @license     http://www.opensource.org/licenses/mit-license.html  MIT License
 * @copyright   2014 Satoh_D
 * @author      Daiki Sato <sato.dik@gmail.com>
 * @link        http://orememo-v2.tumblr.com
 * @version     1.0
 * @since       April 10, 2014
 */

;(function($, window, document, undefined) {

	var pluginName = 'tumblrMoArchs',
			defaults = {
				url: '/archive',
				months: '#browse_months_widget li:not(.empty)'
			};

	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	} // end of Plugin()

	Plugin.prototype.init = function() {
		var self = this;

		self.$element = $(self.element);

		_fetchArchiveData(this.settings.url)
			.done(function(data) {
				self._createArchiveList(data);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				self._displayError(jqXHR, textStatus, errorThrown);
			});
	} // end of Plugin.prototype.init

	Plugin.prototype._createArchiveList = function(data) {
		var self = this,
				$responseText = $('<html>').html(data.responseText),
				$appendTag = $('<ul>'),
				$responseTextMonths = $responseText.find(self.settings.months),
				appendTagInner = '',
				month, count;

		for(var i = 0; i < $responseTextMonths.length; i++) {
			month = $($responseTextMonths[i]).find('a').attr('href');
			count = $($responseTextMonths[i]).find('span').html();

			month = month.replace(/\/archive\//, '');
			appendTagInner += '<li><a href="/' + month + '">' + month + ' (' + count + ')</a></li>'
		}

		$appendTag.html(appendTagInner);
		self.$element.append($appendTag);
	} // end of Plugin.prototype._createArchiveList

	Plugin.prototype._displayError = function(jqXHR, textStatus, errorThrown) {
		console.log('HTTP Status: ' + jqXHR.status);
		console.log('HTTP Status(Text): ' + textStatus);
		console.log('Error Message: ' + errorThrown);
	} // end  of Plugin.prototype._displayError

	var _fetchArchiveData = function(url) {
		var $dfd = $.Deferred();

		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'text',
			success: $dfd.resolve,
			error: $dfd.reject
		})

		return $dfd.promise();
	} // end of _getArchiveData()

	$.fn[pluginName] = function(options) {
		this.each(function() {
			if(!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});

		return this;
	}

})(jQuery, window, document, undefined);
