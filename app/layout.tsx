import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lead The Business',
  description: 'Chandrabhan Singh Rajawat',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              'use strict';
              
              // Feature detection
              const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              const isOldMobile = /Android [1-4]|iPhone OS [1-9]_|iPad.*OS [1-9]_/i.test(navigator.userAgent);
              
              if (isMobile) {
                console.log('Applying mobile browser polyfills...');
              }

              // 1. AbortSignal.timeout polyfill (Chrome 103+, Firefox 100+, Safari 15.4+)
              if (typeof AbortSignal !== 'undefined' && !AbortSignal.timeout) {
                AbortSignal.timeout = function(milliseconds) {
                  const controller = new AbortController();
                  const timeoutId = setTimeout(function() {
                    controller.abort(new Error('Timeout'));
                  }, milliseconds);
                  
                  // Store timeout ID for cleanup
                  if (controller.signal) {
                    controller.signal.timeoutId = timeoutId;
                  }
                  
                  return controller.signal;
                };
              }

              // 2. Array.prototype.toSpliced polyfill (Chrome 110+, Firefox 115+, Safari 16+)
              if (!Array.prototype.toSpliced) {
                Array.prototype.toSpliced = function(start, deleteCount) {
                  var items = Array.prototype.slice.call(arguments, 2);
                  var arr = Array.prototype.slice.call(this);
                  var len = arr.length;
                  var actualStart = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
                  var actualDeleteCount = deleteCount === undefined ? len - actualStart : Math.max(0, Math.min(deleteCount, len - actualStart));
                  
                  arr.splice(actualStart, actualDeleteCount);
                  for (var i = 0; i < items.length; i++) {
                    arr.splice(actualStart + i, 0, items[i]);
                  }
                  return arr;
                };
              }

              // 3. Array.prototype.toSorted polyfill (Chrome 110+, Firefox 115+, Safari 16+)
              if (!Array.prototype.toSorted) {
                Array.prototype.toSorted = function(compareFn) {
                  return Array.prototype.slice.call(this).sort(compareFn);
                };
              }

              // 4. Array.prototype.toReversed polyfill (Chrome 110+, Firefox 115+, Safari 16+)
              if (!Array.prototype.toReversed) {
                Array.prototype.toReversed = function() {
                  return Array.prototype.slice.call(this).reverse();
                };
              }

              // 5. Array.prototype.with polyfill (Chrome 110+, Firefox 115+, Safari 16+)
              if (!Array.prototype.with) {
                Array.prototype.with = function(index, value) {
                  var arr = Array.prototype.slice.call(this);
                  var len = arr.length;
                  var actualIndex = index < 0 ? len + index : index;
                  
                  if (actualIndex < 0 || actualIndex >= len) {
                    throw new RangeError('Invalid index');
                  }
                  
                  arr[actualIndex] = value;
                  return arr;
                };
              }

              // 6. Array.prototype.at polyfill (Chrome 92+, Firefox 90+, Safari 15.4+)
              if (!Array.prototype.at) {
                Array.prototype.at = function(index) {
                  var len = this.length;
                  var k = index < 0 ? len + index : index;
                  return (k >= 0 && k < len) ? this[k] : undefined;
                };
              }

              // 7. String.prototype.at polyfill
              if (!String.prototype.at) {
                String.prototype.at = function(index) {
                  var len = this.length;
                  var k = index < 0 ? len + index : index;
                  return (k >= 0 && k < len) ? this[k] : undefined;
                };
              }

              // 8. Array.prototype.findLast polyfill (Chrome 97+, Firefox 104+, Safari 15.4+)
              if (!Array.prototype.findLast) {
                Array.prototype.findLast = function(callback, thisArg) {
                  for (var i = this.length - 1; i >= 0; i--) {
                    if (callback.call(thisArg, this[i], i, this)) {
                      return this[i];
                    }
                  }
                  return undefined;
                };
              }

              // 9. Array.prototype.findLastIndex polyfill (Chrome 97+, Firefox 104+, Safari 15.4+)
              if (!Array.prototype.findLastIndex) {
                Array.prototype.findLastIndex = function(callback, thisArg) {
                  for (var i = this.length - 1; i >= 0; i--) {
                    if (callback.call(thisArg, this[i], i, this)) {
                      return i;
                    }
                  }
                  return -1;
                };
              }

              // 10. Object.hasOwn polyfill (Chrome 93+, Firefox 92+, Safari 15.4+)
              if (!Object.hasOwn) {
                Object.hasOwn = function(obj, prop) {
                  return Object.prototype.hasOwnProperty.call(obj, prop);
                };
              }

              // 11. String.prototype.replaceAll polyfill (Chrome 85+, Firefox 77+, Safari 13.1+)
              if (!String.prototype.replaceAll) {
                String.prototype.replaceAll = function(searchValue, replaceValue) {
                  if (typeof searchValue === 'string') {
                    return this.split(searchValue).join(replaceValue);
                  }
                  if (searchValue instanceof RegExp) {
                    if (!searchValue.global) {
                      throw new TypeError('String.prototype.replaceAll called with a non-global RegExp argument');
                    }
                    return this.replace(searchValue, replaceValue);
                  }
                  return this;
                };
              }

              // 12. Promise.any polyfill (Chrome 85+, Firefox 79+, Safari 14+)
              if (!Promise.any) {
                Promise.any = function(promises) {
                  return new Promise(function(resolve, reject) {
                    var rejections = [];
                    var rejectionCount = 0;
                    var promiseCount = promises.length;
                    
                    if (promiseCount === 0) {
                      reject(new AggregateError([], 'All promises were rejected'));
                      return;
                    }
                    
                    promises.forEach(function(promise, index) {
                      Promise.resolve(promise).then(
                        function(value) {
                          resolve(value);
                        },
                        function(reason) {
                          rejections[index] = reason;
                          rejectionCount++;
                          if (rejectionCount === promiseCount) {
                            reject(new AggregateError(rejections, 'All promises were rejected'));
                          }
                        }
                      );
                    });
                  });
                };
              }

              // 13. AggregateError polyfill (for Promise.any)
              if (typeof AggregateError === 'undefined') {
                window.AggregateError = function(errors, message) {
                  var error = new Error(message);
                  error.name = 'AggregateError';
                  error.errors = errors;
                  return error;
                };
              }

              // 14. Array.prototype.flatMap polyfill (Chrome 69+, Firefox 62+, Safari 12+)
              if (!Array.prototype.flatMap) {
                Array.prototype.flatMap = function(callback, thisArg) {
                  return this.map(callback, thisArg).flat();
                };
              }

              // 15. Array.prototype.flat polyfill (Chrome 69+, Firefox 62+, Safari 12+)
              if (!Array.prototype.flat) {
                Array.prototype.flat = function(depth) {
                  depth = depth === undefined ? 1 : Number(depth);
                  
                  function flattenArray(arr, currentDepth) {
                    var result = [];
                    for (var i = 0; i < arr.length; i++) {
                      if (Array.isArray(arr[i]) && currentDepth > 0) {
                        result = result.concat(flattenArray(arr[i], currentDepth - 1));
                      } else {
                        result.push(arr[i]);
                      }
                    }
                    return result;
                  }
                  
                  return flattenArray(this, depth);
                };
              }

              // 16. Object.fromEntries polyfill (Chrome 73+, Firefox 63+, Safari 12.1+)
              if (!Object.fromEntries) {
                Object.fromEntries = function(entries) {
                  var obj = {};
                  for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    obj[entry[0]] = entry[1];
                  }
                  return obj;
                };
              }

              // 17. String.prototype.trimStart polyfill (Chrome 66+, Firefox 61+, Safari 12+)
              if (!String.prototype.trimStart) {
                String.prototype.trimStart = String.prototype.trimLeft || function() {
                  return this.replace(/^\\s+/, '');
                };
              }

              // 18. String.prototype.trimEnd polyfill (Chrome 66+, Firefox 61+, Safari 12+)
              if (!String.prototype.trimEnd) {
                String.prototype.trimEnd = String.prototype.trimRight || function() {
                  return this.replace(/\\s+$/, '');
                };
              }

              // 19. Array.prototype.includes polyfill (Chrome 47+, Firefox 43+, Safari 9+)
              if (!Array.prototype.includes) {
                Array.prototype.includes = function(searchElement, fromIndex) {
                  var len = this.length;
                  var k = fromIndex >= 0 ? fromIndex : Math.max(0, len + fromIndex);
                  
                  for (; k < len; k++) {
                    if (this[k] === searchElement || (this[k] !== this[k] && searchElement !== searchElement)) {
                      return true;
                    }
                  }
                  return false;
                };
              }

              // 20. String.prototype.includes polyfill (Chrome 41+, Firefox 40+, Safari 9+)
              if (!String.prototype.includes) {
                String.prototype.includes = function(search, start) {
                  if (typeof start !== 'number') {
                    start = 0;
                  }
                  
                  if (start + search.length > this.length) {
                    return false;
                  } else {
                    return this.indexOf(search, start) !== -1;
                  }
                };
              }

              // 21. String.prototype.startsWith polyfill (Chrome 41+, Firefox 17+, Safari 9+)
              if (!String.prototype.startsWith) {
                String.prototype.startsWith = function(search, pos) {
                  return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
                };
              }

              // 22. String.prototype.endsWith polyfill (Chrome 41+, Firefox 17+, Safari 9+)
              if (!String.prototype.endsWith) {
                String.prototype.endsWith = function(search, this_len) {
                  if (this_len === undefined || this_len > this.length) {
                    this_len = this.length;
                  }
                  return this.substring(this_len - search.length, this_len) === search;
                };
              }

              // 23. Object.assign polyfill (Chrome 45+, Firefox 34+, Safari 9+)
              if (!Object.assign) {
                Object.assign = function(target) {
                  if (target == null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                  }
                  
                  var to = Object(target);
                  
                  for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];
                    
                    if (nextSource != null) {
                      for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                          to[nextKey] = nextSource[nextKey];
                        }
                      }
                    }
                  }
                  return to;
                };
              }

              // 24. Element.prototype.closest polyfill (Chrome 41+, Firefox 35+, Safari 6+)
              if (!Element.prototype.closest) {
                Element.prototype.closest = function(s) {
                  var el = this;
                  do {
                    if (Element.prototype.matches.call(el, s)) return el;
                    el = el.parentElement || el.parentNode;
                  } while (el !== null && el.nodeType === 1);
                  return null;
                };
              }

              // 25. Element.prototype.matches polyfill
              if (!Element.prototype.matches) {
                Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                          Element.prototype.webkitMatchesSelector;
              }

              // 26. ResizeObserver polyfill detection (Chrome 64+, Firefox 69+, Safari 13.1+)
              if (typeof ResizeObserver === 'undefined') {
                console.warn('ResizeObserver not supported, consider adding a polyfill');
              }

              // 27. IntersectionObserver polyfill detection (Chrome 51+, Firefox 55+, Safari 12.1+)
              if (typeof IntersectionObserver === 'undefined') {
                console.warn('IntersectionObserver not supported, consider adding a polyfill');
              }

              // Log successful polyfill application
              if (isMobile) {
                console.log('Mobile browser polyfills applied successfully');
              }
            })();
          `
        }} />
      </head>
      <body className='bg-black'>{children}</body>
    </html>
  )
}