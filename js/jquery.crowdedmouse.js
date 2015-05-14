;
/*!
 * Crowded Mouse
 * A menu transition micro-library
 *
 * (c) 2015 Michal Bluma
 */
(function ($) {

	CROWDEDMOUSE = {};


	CROWDEDMOUSE.pathTransition = {
		init                 : function ($navMenu) {
			var _this = CROWDEDMOUSE.pathTransition;


			_this.$navMenu = $navMenu;
			_this.$navMenuItemsContainers = _this.$navMenu.find('li');
			_this.$navMenuItems = _this.$navMenuItemsContainers.find('a');

			_this.$currentActiveItemContainer = _this.$navMenuItemsContainers.filter('.current-menu-item');
			_this.$currentActiveItem = _this.$currentActiveItemContainer.find('a');

			//console.log(_this.$navMenu, _this.$navMenuItems, _this.$currentActiveItem);

			_this.bindEvents();


		},
		bindEvents           : function () {
			var _this = CROWDEDMOUSE.pathTransition;

			_this.$navMenu.on('mouseenter', 'a', function () {

				_this.setupOriginalNewItems($(this));
			}).on('click', function(e) {

				//_this.$navMenuItemsContainers.removeClass('active current-menu-item');
				//
				//_this.$currentActiveItem = $(this);
				//_this.$currentActiveItemContainer = _this.$currentActiveItem.parents('li');
				//
				//_this.$currentActiveItemContainer.addClass('current-menu-item active');


			});



		},
		setupOriginalNewItems: function ($newItem) {
			var _this = CROWDEDMOUSE.pathTransition;

			_this.$originalItem = _this.$currentActiveItem;
			_this.$newItem = $newItem;

			//if(_this.$originalItem.offset().left < _this.$newItem.offset().left) {
			//	var tempOldOld = _this.$originalItem,
			//		tempOldNew = _this.$newItem;
			//
			//	_this.$originalItem = tempOldNew;
			//	_this.$newItem = tempOldOld;
			//}


			_this.svgCode = _this.prepConnectingPath();

			if (typeof _this.svgContainer === 'undefined') {
				_this.svgContainer = $('<div class="svg-container">' + _this.svgCode + '</div>').appendTo(_this.$navMenu);
			} else {
				_this.svgContainer.html( _this.svgCode);
			}
console.log(_this.svgContainer);


			_this.animateLine();

		},
		prepConnectingPath   : function () {
			var _this = CROWDEDMOUSE.pathTransition;

			var borderRadiusOrig = parseInt(_this.$originalItem.css('border-top-left-radius')),
				borderWidthOrig = _this.$originalItem.outerWidth() - (borderRadiusOrig * 2),
				borderHeightOrig = _this.$originalItem.outerHeight() - (borderRadiusOrig * 2),

				borderRadiusNew = parseInt(_this.$newItem.css('border-top-left-radius')),
				borderWidthNew = _this.$newItem.outerWidth() - (borderRadiusNew * 2),
				borderHeightNew = _this.$newItem.outerHeight() - (borderRadiusNew * 2),

				distanceBetween = Math.abs(_this.$originalItem.offset().left - _this.$newItem.offset().left),
				widthOrig = borderWidthOrig + (borderRadiusOrig * 2),
				widthNew = borderWidthNew + (borderRadiusNew * 2),
				heightOrig = borderHeightOrig + ( borderRadiusOrig * 2),
				heightNew = borderHeightNew + (borderRadiusNew * 2),
				boundsX = widthOrig > widthNew ? (widthOrig + distanceBetween) : (widthNew + distanceBetween),
				boundsY = heightOrig > heightNew ? heightOrig : heightNew;

			boundsX = Math.ceil(boundsX);
			boundsY = Math.ceil(boundsY);


			console.log('borderRadiusOrig: ', borderRadiusOrig,
				borderWidthOrig,
				borderHeightOrig,
				borderRadiusNew,
				borderWidthNew,
				borderHeightNew,
				distanceBetween,
				widthOrig,
				widthNew,
				heightOrig,
				heightNew,
				boundsX,
				boundsY);

			var pathTemplate = '<path  class="connecting-path" fill="none" stroke="#ffffff" strokewidth="1" d="';

			pathTemplate += 'M ' + borderRadiusOrig + ',' + boundsY + '	c 0 0, 0 0, ' + borderWidthOrig + ' 0 ' + "\n"; // point #1
			pathTemplate += 'm 0,0	c ' + borderRadiusOrig + ' 0, ' + borderRadiusOrig + ' -' + ( borderRadiusOrig / 2 ) + ', ' + borderRadiusOrig + ' -' + borderRadiusOrig + ' ' + "\n"; // point #2
			pathTemplate += 'm 0,0	c 0 0, 0 0, 0 -' + borderHeightOrig + ' ' + "\n"; // point #3
			pathTemplate += 'm 0,0	c 0 -' + ( borderRadiusOrig / 2 ) + ', -' + ( borderRadiusOrig / 2 ) + ' -' + borderRadiusOrig + ', -' + borderRadiusOrig + ' -' + borderRadiusOrig + ' ' + "\n"; // point #4
			pathTemplate += 'm 0,0	c 0 0, 0 0, -' + borderWidthOrig + ' 0 ' + "\n"; // point #5
			pathTemplate += 'm 0,0	c -' + ( borderRadiusOrig / 2 ) + ' 0, -' + borderRadiusOrig + ' ' + ( borderRadiusOrig / 2 ) + ', -' + borderRadiusOrig + ' ' + borderRadiusOrig + ' ' + "\n"; // point #6
			pathTemplate += 'm 0,0	c 0 0, 0 0, 0 ' + borderHeightOrig + ' ' + "\n"; // point #7
			pathTemplate += 'm 0,0	c 0 ' + ( borderRadiusOrig / 2 ) + ', ' + ( borderRadiusOrig / 2 ) + ' ' + borderRadiusOrig + ', ' + borderRadiusOrig + ' ' + borderRadiusOrig + ' ' + "\n"; // point #8

			pathTemplate += 'm 0,0	c 0 0, 0 0, ' + distanceBetween + ' 0 ' + "\n"; // point #9

			pathTemplate += 'm 0,0	c 0 0, 0 0, ' + borderWidthNew + ' 0  ' + "\n"; // point #10
			pathTemplate += 'm 0,0	c ' + ( borderRadiusNew / 2 ) + ' 0, ' + borderRadiusNew + ' -' + ( borderRadiusNew / 2 ) + ', ' + borderRadiusNew + ' -' + borderRadiusNew + ' ' + "\n"; // point #11
			pathTemplate += 'm 0,0	c 0 0, 0 0, 0 -' + borderHeightNew + ' ' + "\n"; // point #12
			pathTemplate += 'm 0,0	c 0 -' + ( borderRadiusNew / 2 ) + ', -' + ( borderRadiusNew / 2 ) + ' -' + borderRadiusNew + ', -' + borderRadiusNew + ' -' + borderRadiusNew + ' ' + "\n"; // point #13
			pathTemplate += 'm 0,0	c 0 0, 0 0, -' + borderWidthNew + ' 0 ' + "\n"; // point #14
			pathTemplate += 'm 0,0	c -' + ( borderRadiusNew / 2 ) + ' 0, -' + borderRadiusNew + ' ' + ( borderRadiusNew / 2 ) + ', -' + borderRadiusNew + ' ' + borderRadiusNew + ' ' + "\n"; // point #15
			pathTemplate += 'm 0,0	c 0 0, 0 0, 0 ' + borderHeightNew + ' ' + "\n"; // point #16
			pathTemplate += 'm 0,0	c 0 ' + ( borderRadiusNew / 2 ) + ', ' + ( borderRadiusNew / 2 ) + ' ' + borderRadiusNew + ', ' + borderRadiusNew + ' ' + borderRadiusNew + '' + "\n"; // point #17

			pathTemplate += '" />';


			var svgCode = '<svg version="1.1" id="connecting-path" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px" viewBox="0 0 ' + boundsX + ' ' + boundsY + '" width="' + boundsX + 'px" height="' + boundsY + '">';

			svgCode += pathTemplate;
			svgCode += '</svg>';

			return svgCode;

		},
		animateLine          : function () {
			var _this = CROWDEDMOUSE.pathTransition;
			//_this.connectingPath = _this.svgContainer.find('.connecting-path');

			var path = document.querySelector('.connecting-path');
			var length = path.getTotalLength();

			//
			//path.style.strokeDasharray = length  + ' ' +length ;
			//path.style.strokeDashoffset = length;


			console.log('path length', length);
		}
	};

	// Everything that should be run immediately


	$(document).ready(function () {
		// Everything that should be run on doc.ready

		CROWDEDMOUSE.pathTransition.init($('nav'));

	});


	$(window).load(function () {
		// Everything that should be run on window.load(ed)


	});

})(jQuery);