!function (e) {
    var n = {};

    function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {i: r, l: !1, exports: {}};
        return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }

    t.m = e, t.c = n, t.d = function (e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {enumerable: !0, get: r})
    }, t.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, t.t = function (e, n) {
        if (1 & n && (e = t(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (t.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & n && "string" != typeof e) for (var o in e) t.d(r, o, function (n) {
            return e[n]
        }.bind(null, o));
        return r
    }, t.n = function (e) {
        var n = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, t.p = "./dist/", t(t.s = 0)
}([function (e, n) {
    const t = "offline-fallback";

    function r(e) {
        return caches.open(t).then((function (n) {
            return n.match(e).then((function (e) {
                return e || Promise.reject("request-not-in-cache")
            }))
        }))
    }

    self.addEventListener("install", (function (e) {
        e.waitUntil(function () {
            const e = [{
                'revision': '9016bd108b507a1fc43c1b0f0b0c5192',
                'url': './dist/../index.html'
            }, {
                'revision': 'f2366b7edd19ce0d241f795a429a9834',
                'url': './dist/main.a17520be5458d22d14bd.css'
            }, {
                'revision': '94c15d982347ba934b756928924451e7',
                'url': './dist/main.d87b4202f0409c4f14c3.js'
            }].map(e => e.url);
            return caches.open(t).then((function (n) {
                return n.addAll(["./", ...e])
            }))
        }().then((function () {
            return self.skipWaiting()
        })))
    })), self.addEventListener("activate", (function (e) {
        e.waitUntil(self.clients.claim())
    })), self.addEventListener("fetch", (function (e) {
        var n;
        e.respondWith((n = e.request, fetch(n).then((function (e) {
            return e.ok ? e : r(n)
        })).catch((function () {
            return r(n)
        }))).catch((function () {
            return caches.open(t).then((function (e) {
                return e.match("./")
            }))
        })))
    }))
}]);
