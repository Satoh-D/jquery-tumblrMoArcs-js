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
			.fail(function(status, textStatus) {
				self._displayError(status, textStatus);
			});
	} // end of Plugin.prototype.init

	Plugin.prototype._createArchiveList = function(data) {
		var self = this,
				$responseText = $('<html>').html(data),
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

	// Plugin.prototype._displayError = function(jqXHR, textStatus, errorThrown) {
	Plugin.prototype._displayError = function(status, textStatus) {
		console.log('HTTP Status: ' + status);
		console.log('HTTP Status(Text): ' + textStatus);
	} // end  of Plugin.prototype._displayError

	var _fetchArchiveData = function(url) {
		var $dfd = $.Deferred(),
				xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			// if(xhr.readyState == 4 && xhr.status == 200) {
			if(xhr.readyState == 4 && xhr.status == 200) {
				if(xhr.status == 200) {
					$dfd.resolve(xhr.responseText);
				} else {
					$dfd.reject(xhr.status, xhr.textStatus)
				}
			}
		}

		xhr.open('GET', url);
		xhr.send(null);

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