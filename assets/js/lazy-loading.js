var _extends =
    Object.assign ||
    function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var o in n)
          Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
      }
      return e;
    },
  _typeof =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(e) {
          return typeof e;
        }
      : function(e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        };
!(function(e, t) {
  'object' ===
    ('undefined' == typeof exports ? 'undefined' : _typeof(exports)) &&
  'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define(t)
      : (e.LazyLoad = t());
})(this, function() {
  'use strict';
  var d = function(e, t) {
      e && e(t);
    },
    o = function(e) {
      return (
        e.getBoundingClientRect().top +
        window.pageYOffset -
        e.ownerDocument.documentElement.clientTop
      );
    },
    h = function(e, t, n) {
      return (
        (t === window
          ? window.innerHeight + window.pageYOffset
          : o(t) + t.offsetHeight) <=
        o(e) - n
      );
    },
    i = function(e) {
      return (
        e.getBoundingClientRect().left +
        window.pageXOffset -
        e.ownerDocument.documentElement.clientLeft
      );
    },
    f = function(e, t, n) {
      var o = window.innerWidth;
      return (t === window ? o + window.pageXOffset : i(t) + o) <= i(e) - n;
    },
    _ = function(e, t, n) {
      return (
        (t === window ? window.pageYOffset : o(t)) >= o(e) + n + e.offsetHeight
      );
    },
    p = function(e, t, n) {
      return (
        (t === window ? window.pageXOffset : i(t)) >= i(e) + n + e.offsetWidth
      );
    };
  var s = function(e, t) {
    var n,
      o = 'LazyLoad::Initialized',
      i = new e(t);
    try {
      n = new CustomEvent(o, {detail: {instance: i}});
    } catch (e) {
      (n = document.createEvent('CustomEvent')).initCustomEvent(o, !1, !1, {
        instance: i,
      });
    }
    window.dispatchEvent(n);
  };
  var r = 'data-',
    l = 'was-processed',
    a = 'true',
    u = function(e, t) {
      return e.getAttribute(r + t);
    },
    m = function(e) {
      return (t = l), (n = a), e.setAttribute(r + t, n);
      var t, n;
    },
    c = function(e) {
      return u(e, l) === a;
    },
    g = function(e, t, n) {
      for (var o, i = 0; (o = e.children[i]); i += 1)
        if ('SOURCE' === o.tagName) {
          var s = u(o, n);
          s && o.setAttribute(t, s);
        }
    },
    v = function(e, t, n) {
      n && e.setAttribute(t, n);
    };
  var e = 'undefined' != typeof window,
    n = e && 'classList' in document.createElement('p'),
    w =
      (e && !('onscroll' in window)) ||
      /glebot|bingbot|crawler|spider|robot|crawling/i.test(navigator.userAgent),
    b = function(e, t) {
      n ? e.classList.add(t) : (e.className += (e.className ? ' ' : '') + t);
    },
    y = function(e, t) {
      n
        ? e.classList.remove(t)
        : (e.className = e.className
            .replace(new RegExp('(^|\\s+)' + t + '(\\s+|$)'), ' ')
            .replace(/^\s+/, '')
            .replace(/\s+$/, ''));
    },
    t = function(e) {
      (this._settings = _extends(
        {},
        {
          elements_selector: 'img',
          container: window,
          threshold: 300,
          throttle: 150,
          data_src: 'src',
          data_srcset: 'srcset',
          data_sizes: 'sizes',
          class_loading: 'loading',
          class_loaded: 'loaded',
          class_error: 'error',
          class_initial: 'initial',
          skip_invisible: !0,
          callback_load: null,
          callback_error: null,
          callback_set: null,
          callback_processed: null,
          callback_enter: null,
        },
        e
      )),
        (this._queryOriginNode =
          this._settings.container === window
            ? document
            : this._settings.container),
        (this._previousLoopTime = 0),
        (this._loopTimeout = null),
        (this._boundHandleScroll = this.handleScroll.bind(this)),
        (this._isFirstLoop = !0),
        window.addEventListener('resize', this._boundHandleScroll),
        this.update();
    };
  t.prototype = {
    _reveal: function(t, e) {
      if (e || !c(t)) {
        var n = this._settings,
          o = function e() {
            n &&
              (t.removeEventListener('load', i),
              t.removeEventListener('error', e),
              y(t, n.class_loading),
              b(t, n.class_error),
              d(n.callback_error, t));
          },
          i = function e() {
            n &&
              (y(t, n.class_loading),
              b(t, n.class_loaded),
              t.removeEventListener('load', e),
              t.removeEventListener('error', o),
              d(n.callback_load, t));
          };
        d(n.callback_enter, t),
          -1 < ['IMG', 'IFRAME', 'VIDEO'].indexOf(t.tagName) &&
            (t.addEventListener('load', i),
            t.addEventListener('error', o),
            b(t, n.class_loading)),
          (function(e, t) {
            var n = t.data_sizes,
              o = t.data_srcset,
              i = t.data_src,
              s = u(e, i),
              r = e.tagName;
            if ('IMG' === r) {
              var l = e.parentNode;
              l && 'PICTURE' === l.tagName && g(l, 'srcset', o);
              var a = u(e, n);
              v(e, 'sizes', a);
              var c = u(e, o);
              return v(e, 'srcset', c), v(e, 'src', s);
            }
            if ('IFRAME' !== r)
              return 'VIDEO' === r
                ? (g(e, 'src', i), v(e, 'src', s))
                : s && (e.style.backgroundImage = 'url("' + s + '")');
            v(e, 'src', s);
          })(t, n),
          d(n.callback_set, t);
      }
    },
    _loopThroughElements: function(e) {
      var t,
        n,
        o,
        i = this._settings,
        s = this._elements,
        r = s ? s.length : 0,
        l = void 0,
        a = [],
        c = this._isFirstLoop;
      for (l = 0; l < r; l++) {
        var u = s[l];
        (i.skip_invisible && null === u.offsetParent) ||
          ((!w &&
            !e &&
            ((t = u),
            (n = i.container),
            (o = i.threshold),
            h(t, n, o) || _(t, n, o) || f(t, n, o) || p(t, n, o))) ||
            (c && b(u, i.class_initial), this.load(u), a.push(l), m(u)));
      }
      for (; a.length; )
        s.splice(a.pop(), 1), d(i.callback_processed, s.length);
      0 === r && this._stopScrollHandler(), c && (this._isFirstLoop = !1);
    },
    _purgeElements: function() {
      var e = this._elements,
        t = e.length,
        n = void 0,
        o = [];
      for (n = 0; n < t; n++) {
        var i = e[n];
        c(i) && o.push(n);
      }
      for (; 0 < o.length; ) e.splice(o.pop(), 1);
    },
    _startScrollHandler: function() {
      this._isHandlingScroll ||
        ((this._isHandlingScroll = !0),
        this._settings.container.addEventListener(
          'scroll',
          this._boundHandleScroll
        ));
    },
    _stopScrollHandler: function() {
      this._isHandlingScroll &&
        ((this._isHandlingScroll = !1),
        this._settings.container.removeEventListener(
          'scroll',
          this._boundHandleScroll
        ));
    },
    handleScroll: function() {
      var e = this._settings.throttle;
      if (0 !== e) {
        var t = Date.now(),
          n = e - (t - this._previousLoopTime);
        n <= 0 || e < n
          ? (this._loopTimeout &&
              (clearTimeout(this._loopTimeout), (this._loopTimeout = null)),
            (this._previousLoopTime = t),
            this._loopThroughElements())
          : this._loopTimeout ||
            (this._loopTimeout = setTimeout(
              function() {
                (this._previousLoopTime = Date.now()),
                  (this._loopTimeout = null),
                  this._loopThroughElements();
              }.bind(this),
              n
            ));
      } else this._loopThroughElements();
    },
    loadAll: function() {
      this._loopThroughElements(!0);
    },
    update: function() {
      (this._elements = Array.prototype.slice.call(
        this._queryOriginNode.querySelectorAll(this._settings.elements_selector)
      )),
        this._purgeElements(),
        this._loopThroughElements(),
        this._startScrollHandler();
    },
    destroy: function() {
      window.removeEventListener('resize', this._boundHandleScroll),
        this._loopTimeout &&
          (clearTimeout(this._loopTimeout), (this._loopTimeout = null)),
        this._stopScrollHandler(),
        (this._elements = null),
        (this._queryOriginNode = null),
        (this._settings = null);
    },
    load: function(e, t) {
      this._reveal(e, t);
    },
  };
  var E = window.lazyLoadOptions;
  return (
    e &&
      E &&
      (function(e, t) {
        var n = t.length;
        if (n) for (var o = 0; o < n; o++) s(e, t[o]);
        else s(e, t);
      })(t, E),
    t
  );
});
