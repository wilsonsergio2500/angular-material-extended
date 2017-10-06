"use strict";
var angular = require('angular');
var index_1 = require('../../main/index');
require('./tile-view.css');
var mergeobject_1 = require('../../helpers/mergeobject');
(function () {
    'use strict';
    //const mod = angular.module('td.tileview', ['td.scroll']);
    var tileViewTemplate = require('!!raw-loader!./tile-view.html');
    index_1.APP_MODULE.directive('tdTileview', ['$compile', '$templateCache', '$timeout', '$window', function ($compile, $templateCache, $timeout, $window) {
            return {
                restrict: 'E',
                scope: {
                    items: '=',
                    options: '='
                },
                template: tileViewTemplate,
                link: function (scope, elem, attrs) {
                    scope.elem = elem;
                    scope.tileStyle = {};
                    scope.tileStyle.marginRight = "4px";
                    scope.tileStyle.marginBottom = "4px";
                    scope.tileStyle.float = "left";
                    var container = elem.children();
                    var itemContainer = container.children().eq(0);
                    var linkFunction;
                    var heightStart = 0;
                    var heightEnd = 0;
                    var startRow = 0, endRow;
                    var renderedStartRow = -1, renderedEndRow = -1;
                    var itemsPerRow;
                    var rowCount;
                    var cachedRowCount;
                    var virtualRows = [];
                    var scopes = {};
                    var scopeCounter = 0;
                    function nextScopeId() {
                        scopeCounter = scopeCounter + 1;
                        return 'scope-' + scopeCounter;
                    }
                    function handleTileSizeChange() {
                        forEachElement(function (el) {
                            el.css('width', scope.options.tileSize.width + 'px');
                            el.css('height', scope.options.tileSize.height + 'px');
                        });
                    }
                    function handleTemplateUrlChange() {
                        var template = (!!scope.options.templateUrl) ? $templateCache.get(scope.options.templateUrl) : scope.options.template;
                        if (template !== undefined) {
                            linkFunction = $compile(template);
                            removeAll();
                        }
                        else {
                            console.error('Template url not found: ' + scope.options.templateUrl);
                        }
                    }
                    function handleAlignHorizontalChange() {
                        if (scope.options.alignHorizontal) {
                            sizeDimension = 'width';
                            minSizeDimension = 'min-width';
                            orthogonalDimension = 'min-height';
                            elem.children().addClass('horizontal');
                        }
                        else {
                            sizeDimension = 'height';
                            minSizeDimension = 'min-height';
                            orthogonalDimension = 'min-width';
                            elem.children().removeClass('horizontal');
                        }
                    }
                    scope.$watch('options', function (options, currentOptions) {
                        // set defaults:
                        options.scrollEndOffset = def(options.scrollEndOffset, 0);
                        options.overflow = def(options.overflow, 2);
                        options.debounce = def(options.debounce, 0);
                        options.afterScrollDelay = def(options.afterScrollDelay, 100);
                        if (options === currentOptions || options.templateUrl !== currentOptions.templateUrl) {
                            handleTemplateUrlChange();
                        }
                        if (options === currentOptions || options.alignHorizontal !== currentOptions.alignHorizontal) {
                            handleAlignHorizontalChange();
                        }
                        layout(true);
                        if (options === currentOptions || options.tileSize.width !== currentOptions.tileSize.width || options.tileSize.height !== currentOptions.tileSize.height) {
                            handleTileSizeChange();
                        }
                    }, true);
                    var sizeDimension, minSizeDimension, orthogonalDimension;
                    scope.$watchCollection('items', function () {
                        lastScrollPosition = Number.NEGATIVE_INFINITY;
                        layout(true);
                    });
                    var resizeTimeout;
                    scope.$on('td.tileview.resize', function () {
                        // this might be called within a $digest
                        if (resizeTimeout) {
                            $timeout.cancel(resizeTimeout);
                        }
                        resizeTimeout = $timeout(resize, 50, false);
                    });
                    scope.$on('td.tileview.update', function () {
                        layout(true);
                    });
                    angular.element($window).on('resize', onResize);
                    scope.$on('$destroy', function () {
                        angular.element($window).off('resize', onResize);
                        // unregister all timers:
                        if (resizeTimeout !== undefined) {
                            $timeout.cancel(resizeTimeout);
                        }
                        if (scrollEndTimeout !== undefined) {
                            $timeout.cancel(scrollEndTimeout);
                        }
                        if (debounceTimeout !== undefined) {
                            $timeout.cancel(debounceTimeout);
                        }
                        removeAll();
                    });
                    function removeElement(el) {
                        var id = el.attr('id');
                        if (scopes[id] !== undefined) {
                            scopes[id].$destroy();
                            delete scopes[id];
                        }
                        el.remove();
                    }
                    function removeAll() {
                        forEachRow(removeRow);
                    }
                    function forEachElement(fn) {
                        forEachRow(function (row, rowIndex) {
                            for (var i = 0; i < row.children().length; ++i) {
                                fn(row.children().eq(i), rowIndex * itemsPerRow + i);
                            }
                        });
                    }
                    function forEachRow(fn) {
                        var numOfRows = visibleRowCount();
                        for (var i = 0; i < numOfRows; ++i) {
                            fn(itemContainer.children().eq(i), startRow + i);
                        }
                    }
                    function visibleRowCount() {
                        return itemContainer.children().length;
                    }
                    function itemElementCount() {
                        return visibleRowCount() * itemsPerRow;
                    }
                    var lastScrollPosition = Number.NEGATIVE_INFINITY;
                    function updateVisibleRows() {
                        function clamp(value, min, max) {
                            return Math.max(Math.min(value, max), min);
                        }
                        var rect = container[0].getBoundingClientRect();
                        var itemSize = scope.options.tileSize[sizeDimension];
                        var maxScrollPosition = rowCount * itemSize - rect[sizeDimension];
                        var scrollPosition = scope.options.alignHorizontal ?
                            container.scrollLeft() :
                            container[0].scrollTop;
                        var scrollEndThreshold = maxScrollPosition - scope.options.scrollEndOffset * itemSize;
                        if (scrollPosition >= scrollEndThreshold && !(lastScrollPosition >= scrollEndThreshold) && scope.options.onScrollEnd !== undefined) {
                            $timeout(function () {
                                scope.options.onScrollEnd();
                            }, 1);
                        }
                        startRow = clamp(Math.floor(scrollPosition / itemSize) - scope.options.overflow, 0, rowCount - cachedRowCount);
                        endRow = startRow + cachedRowCount;
                        lastScrollPosition = scrollPosition;
                    }
                    function updateItem(elem, index, digest) {
                        var item = scope.items[index];
                        if (item !== undefined) {
                            if (elem.css('display') === 'none') {
                                elem.css('display', 'inline-block');
                            }
                            var itemScope = scopes[elem.attr('id')];
                            //console.log(scope.items);
                            //console.log(itemScope);
                            itemScope.item = item;
                            itemScope.$index = index;
                            if (digest === true) {
                                itemScope.$digest();
                            }
                        }
                        else {
                            elem.css('display', 'none');
                        }
                    }
                    function updateRow(el, rowIndex, digest) {
                        var ch = el.children();
                        for (var i = 0; i < ch.length; ++i) {
                            updateItem(ch.eq(i), rowIndex * itemsPerRow + i, digest);
                        }
                        var translate = Math.max(rowIndex * scope.options.tileSize[sizeDimension], 0);
                        //el.css('transform', `${translate}(${Math.max(rowIndex * scope.options.tileSize[sizeDimension], 0)}px), translateZ(${rowIndex})`);
                        if (scope.options.alignHorizontal) {
                            if (itemContainer.direction() === 'rtl') {
                                translate = -translate;
                            }
                            el.css('transform', "translate3d(" + translate + "px, 0px, 0)");
                        }
                        else {
                            el.css('transform', "translate3d(0px, " + translate + "px, 0)");
                        }
                    }
                    function addRow() {
                        var row = angular.element('<div class="td-row"></div>');
                        row.css('position', 'absolute');
                        itemContainer.append(row);
                        return row;
                    }
                    function clearRow(row) {
                        while (row.children().length > 0) {
                            removeElementFromRow(row);
                        }
                    }
                    function removeRow() {
                        var row = itemContainer.children().eq(-1);
                        clearRow(row);
                        row.remove();
                    }
                    function addElementToRow(row) {
                        var newScope = scope.$parent.$new();
                        linkFunction(newScope, function (clonedElement) {
                            var style = {
                                width: scope.options.tileSize.width + 'px',
                                height: scope.options.tileSize.height + 'px',
                                display: 'inline-block',
                                'vertical-align': 'top'
                            };
                            if (!!scope.options.padding) {
                                style = mergeobject_1.MergeObject(style, { padding: scope.options.padding + 'px' });
                            }
                            clonedElement.css(style);
                            var scopeId = nextScopeId();
                            clonedElement.attr('id', scopeId);
                            scopes[scopeId] = newScope;
                            row.append(clonedElement);
                        });
                    }
                    function fillRow(row) {
                        var currentRowLength = row.children().length;
                        if (currentRowLength < itemsPerRow) {
                            for (var i = currentRowLength; i < itemsPerRow; ++i) {
                                addElementToRow(row);
                            }
                        }
                        else if (currentRowLength > itemsPerRow) {
                            for (var i = currentRowLength; i > itemsPerRow; --i) {
                                removeElementFromRow(row);
                            }
                        }
                    }
                    function removeElementFromRow(row) {
                        var p = row.children().eq(-1);
                        removeElement(row.children().eq(-1));
                    }
                    function createElements(numRows) {
                        updateVisibleRows();
                        var currentRowCount = itemContainer.children().length;
                        if (currentRowCount < numRows) {
                            for (var i = currentRowCount; i < numRows; ++i) {
                                addRow();
                            }
                        }
                        else if (currentRowCount > numRows) {
                            for (var i = currentRowCount; i > numRows; --i) {
                                removeRow();
                            }
                        }
                        forEachRow(fillRow);
                        virtualRows = [];
                        var startIndex = startRow * itemsPerRow;
                        forEachRow(function (el, i) {
                            virtualRows.push(el);
                            updateRow(el, i, false);
                        });
                        renderedStartRow = startRow;
                        renderedEndRow = endRow;
                    }
                    function resize() {
                        var newComponentSize = container[0].getBoundingClientRect();
                        if (newComponentSize.width !== componentWidth || newComponentSize.height !== componentHeight) {
                            if (layout(false)) {
                                forEachElement(function (el) { return scopes[el.attr('id')].$digest(); });
                            }
                        }
                    }
                    function onResize() {
                        resize();
                    }
                    function measure() {
                        var rect = container[0].getBoundingClientRect();
                        componentWidth = rect.width;
                        componentHeight = rect.height;
                        var itemWidth = scope.options.tileSize.width;
                        var width = rect.width;
                        var size = rect[sizeDimension];
                        var newItemsPerRow = (scope.options.alignHorizontal) ? 1 : Math.floor(width / itemWidth);
                        var newCachedRowCount = Math.ceil(size / scope.options.tileSize[sizeDimension]) + scope.options.overflow * 2;
                        var changes = newItemsPerRow !== itemsPerRow || newCachedRowCount !== cachedRowCount;
                        itemsPerRow = Math.max(newItemsPerRow, 1);
                        cachedRowCount = newCachedRowCount;
                        rowCount = Math.ceil(scope.items.length / itemsPerRow);
                        return changes;
                    }
                    var componentWidth = 0, componentHeight = 0;
                    function layout(alwaysLayout) {
                        if (linkFunction !== undefined && scope.items !== undefined && sizeDimension !== undefined) {
                            if (measure() || alwaysLayout) {
                                createElements(cachedRowCount);
                                itemContainer.css(minSizeDimension, rowCount * scope.options.tileSize[sizeDimension] + 'px');
                                itemContainer.css(orthogonalDimension, '100%');
                                //setPlaceholder();
                                scope.$parent.$broadcast('td.tileview.layout');
                                return true;
                            }
                        }
                        return false;
                    }
                    function update() {
                        updateVisibleRows();
                        animationFrameRequested = false;
                        if (startRow !== renderedStartRow || endRow !== renderedEndRow) {
                            if (startRow > renderedEndRow || endRow < renderedStartRow) {
                                virtualRows.forEach(function (el, i) { return updateRow(el, startRow + i, true); });
                            }
                            else {
                                var intersectionStart = Math.max(startRow, renderedStartRow);
                                var intersectionEnd = Math.min(endRow, renderedEndRow);
                                if (endRow > intersectionEnd) {
                                    // scrolling downwards
                                    for (var i = intersectionEnd; i < endRow; ++i) {
                                        var e = virtualRows.shift();
                                        updateRow(e, i, true);
                                        virtualRows.push(e);
                                    }
                                }
                                else if (startRow < intersectionStart) {
                                    // scrolling upwards
                                    for (var i = intersectionStart - 1; i >= startRow; --i) {
                                        var e = virtualRows.pop();
                                        updateRow(e, i, true);
                                        virtualRows.unshift(e);
                                    }
                                }
                            }
                            renderedStartRow = startRow;
                            renderedEndRow = endRow;
                        }
                    }
                    function detectScrollStartEnd() {
                        if (scope.options.afterScrollDelay !== undefined) {
                            if (scrollEndTimeout !== undefined) {
                                $timeout.cancel(scrollEndTimeout);
                            }
                            else {
                                scope.$parent.$broadcast('td.tileview.scrollStart');
                            }
                            scrollEndTimeout = $timeout(function () {
                                // scrolling ends:
                                scrollEndTimeout = undefined;
                                scope.$parent.$broadcast('td.tileview.scrollEnd');
                            }, scope.options.afterScrollDelay, false);
                        }
                    }
                    var debounceTimeout, scrollEndTimeout;
                    var animationFrameRequested = false;
                    function onScroll() {
                        detectScrollStartEnd();
                        if (scope.options.debounce !== undefined && scope.options.debounce > 0) {
                            if (debounceTimeout === undefined) {
                                debounceTimeout = $timeout(function () {
                                    debounceTimeout = undefined;
                                    update();
                                }, scope.options.debounce, false);
                            }
                        }
                        else {
                            if (!animationFrameRequested) {
                                animationFrameRequested = true;
                                requestAnimationFrame(update);
                            }
                        }
                    }
                    container.on('scroll', onScroll);
                }
            };
        }]);
    // Helper functions:
    function def(value, defaultValue) {
        return (value !== undefined) ? value : defaultValue;
    }
})();
//# sourceMappingURL=tile-view.js.map