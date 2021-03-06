(function () {
    var d = !! !document.createElement("canvas").getContext;
    var h = function (u, s, t) {
            var r = u[s];
            if (r == null) {
                r = [];
                u[s] = r
            }
            r.push(t);
            return r
        };
    var g = null;
    var n = function (r, s) {
            return q.CurrentLibrary.getAttribute(b(r), s)
        };
    var f = function (s, t, r) {
            q.CurrentLibrary.setAttribute(b(s), t, r)
        };
    var m = function (s, r) {
            q.CurrentLibrary.addClass(b(s), r)
        };
    var k = function (s, r) {
            return q.CurrentLibrary.hasClass(b(s), r)
        };
    var c = function (s, r) {
            q.CurrentLibrary.removeClass(b(s), r)
        };
    var b = function (r) {
            return q.CurrentLibrary.getElementObject(r)
        };
    var p = function (r) {
            return q.CurrentLibrary.getOffset(b(r))
        };
    var e = function (r) {
            return q.CurrentLibrary.getSize(b(r))
        };
    var l = function (r, s) {
            if (r.logEnabled && typeof console != "undefined") {
                console.log(s)
            }
        };
    var a = function () {
            var v = {};
            var A = this;
            this.overlayPlacements = [];
            this.paintStyle = null, this.hoverPaintStyle = null;
            this._over = function (E) {
                var G = p(b(A.canvas));
                var I = q.CurrentLibrary.getPageXY(E);
                var B = I[0] - G.left,
                    H = I[1] - G.top;
                if (B > 0 && H > 0 && B < A.canvas.width && H < A.canvas.height) {
                    for (var C = 0; C < A.overlayPlacements.length; C++) {
                        var D = A.overlayPlacements[C];
                        if (D && (D[0] <= B && D[1] >= B && D[2] <= H && D[3] >= H)) {
                            return true
                        }
                    }
                    if (!d) {
                        var F = A.canvas.getContext("2d").getImageData(parseInt(B), parseInt(H), 1, 1);
                        return F.data[0] != 0 || F.data[1] != 0 || F.data[2] != 0 || F.data[3] != 0
                    } else {}
                }
                return false
            };
            this.bind = function (B, C) {
                h(v, B, C)
            };
            this.fireUpdate = function (D, E, B) {
                if (v[D]) {
                    for (var C = 0; C < v[D].length; C++) {
                        try {
                            v[D][C](E, B)
                        } catch (F) {
                            l(A, "jsPlumb: fireUpdate failed for event " + D + " : " + F + "; not fatal.")
                        }
                    }
                }
            };
            this.clearListeners = function (B) {
                if (B) {
                    delete v[B]
                } else {
                    delete v;
                    v = {}
                }
            };
            var y = false;
            var t = false,
                r = null,
                w = null,
                s = false,
                z = null,
                u = null;
            this.mousemove = function (G) {
                var E = q.CurrentLibrary;
                var D = E.getPageXY(G);
                var C = document.elementFromPoint(D[0], D[1]);
                var F = g == null && (k(C, "_jsPlumb_endpoint") || k(C, "_jsPlumb_connector"));
                if (t && z) {
                    s = true;
                    g = A;
                    var B = E.getPageXY(G);
                    var J = B[0] - r[0];
                    var I = B[1] - r[1];
                    var H = {
                        left: z.left + J,
                        top: z.top + I
                    };
                    E.setOffset(E.getElementObject(A.source), H);
                    q.repaint(A.source);
                    H = {
                        left: u.left + J,
                        top: u.top + I
                    };
                    E.setOffset(E.getElementObject(A.target), H);
                    q.repaint(A.target)
                } else {
                    if (!y && F && A._over(G)) {
                        y = true;
                        A.setHover(y);
                        A.fireUpdate("mouseenter", A, G)
                    } else {
                        if (y && (!A._over(G) || !F)) {
                            y = false;
                            A.setHover(y);
                            A.fireUpdate("mouseexit", A, G)
                        }
                    }
                }
            };
            this.setHover = function (B, C) {
                if (A.hoverPaintStyle != null) {
                    A.paintStyleInUse = B ? A.hoverPaintStyle : A.paintStyle;
                    A.repaint();
                    if (!C) {
                        x(B)
                    }
                }
            };
            var x = function (D) {
                    var C = A.getAttachedElements();
                    if (C) {
                        for (var B = 0; B < C.length; B++) {
                            C[B].setHover(D, true)
                        }
                    }
                };
            this.click = function (B) {
                if (y && A._over(B) && !s) {
                    A.fireUpdate("click", A, B)
                }
                s = false
            };
            this.dblclick = function (B) {
                if (y && A._over(B) && !s) {
                    A.fireUpdate("dblclick", A, B)
                }
                s = false
            };
            this.mousedown = function (B) {
                if (A._over(B) && !t) {
                    t = true;
                    r = q.CurrentLibrary.getPageXY(B);
                    if (A.canvas) {
                        w = q.CurrentLibrary.getOffset(q.CurrentLibrary.getElementObject(A.canvas))
                    }
                    if (A.source) {
                        z = q.CurrentLibrary.getOffset(q.CurrentLibrary.getElementObject(A.source))
                    } else {
                        console.log("oh")
                    }
                    if (A.target) {
                        u = q.CurrentLibrary.getOffset(q.CurrentLibrary.getElementObject(A.target))
                    }
                }
            };
            this.mouseup = function () {
                if (A == g) {
                    g = null
                }
                t = false
            };
            this.setPaintStyle = function (B) {
                A.paintStyle = B;
                A.paintStyleInUse = A.paintStyle;
                A.repaint()
            };
            this.setHoverPaintStyle = function (B) {
                A.hoverPaintStyle = B;
                A.repaint()
            }
        };
    var o = function (u) {
            this.Defaults = {
                Anchor: null,
                Anchors: [null, null],
                BackgroundPaintStyle: null,
                Connector: null,
                Container: null,
                DragOptions: {},
                DropOptions: {},
                Endpoint: null,
                Endpoints: [null, null],
                EndpointStyle: {
                    fillStyle: null
                },
                EndpointStyles: [null, null],
                EndpointHoverStyle: null,
                EndpointHoverStyles: [null, null],
                HoverPaintStyle: null,
                LabelStyle: {
                    fillStyle: "rgba(0,0,0,0)",
                    color: "black"
                },
                LogEnabled: true,
                MaxConnections: null,
                MouseEventsEnabled: false,
                PaintStyle: {
                    lineWidth: 10,
                    strokeStyle: "red"
                },
                Scope: "_jsPlumb_DefaultScope"
            };
            if (u) {
                q.extend(this.Defaults, u)
            }
            this.logEnabled = this.Defaults.LogEnabled;
            a.apply(this);
            var ao = this.bind;
            this.bind = function (ar, aq) {
                if ("ready" === ar && D) {
                    aq()
                } else {
                    ao(ar, aq)
                }
            };
            var x = this;
            var z = null;
            var ae = function () {
                    q.repaintEverything()
                };
            var t = true;

            function ad() {
                if (t) {
                    ae()
                }
            }
            var ac = null;
            var D = false;
            var E = {};
            var ab = {};
            var M = {};
            var P = {};
            var w = {};
            var S = {};
            var aa = {};
            var aj = this.Defaults.MouseEventsEnabled;
            var R = true;
            var Z = [];
            var J = [];
            var af = {};
            var v = "DEFAULT";
            var U = 1200;
            var Y = function (at, au, aq, ax) {
                    var aw = function (aA, az) {
                            if (aA === az) {
                                return true
                            } else {
                                if (typeof aA == "object" && typeof az == "object") {
                                    var aB = true;
                                    for (var ay in aA) {
                                        if (!aw(aA[ay], az[ay])) {
                                            aB = false;
                                            break
                                        }
                                    }
                                    for (var ay in az) {
                                        if (!aw(az[ay], aA[ay])) {
                                            aB = false;
                                            break
                                        }
                                    }
                                    return aB
                                }
                            }
                        };
                    for (var av = +aq || 0, ar = at.length; av < ar; av++) {
                        if (aw(at[av], au)) {
                            return av
                        }
                    }
                    return -1
                };
            var L = function (aq, ar) {
                    if (!ar) {
                        document.body.appendChild(aq)
                    } else {
                        q.CurrentLibrary.appendElement(aq, ar)
                    }
                };
            var al = function () {
                    return "" + (new Date()).getTime()
                };
            var am = function (aw, aD, az) {
                    var aq = n(aw, "id");
                    var ar = ab[aq];
                    if (!az) {
                        az = al()
                    }
                    if (ar) {
                        y({
                            elId: aq,
                            offset: aD,
                            recalc: false,
                            timestamp: az
                        });
                        var aA = P[aq],
                            ay = J[aq];
                        for (var ax = 0; ax < ar.length; ax++) {
                            ar[ax].paint({
                                timestamp: az,
                                offset: aA,
                                dimensions: ay
                            });
                            var at = ar[ax].connections;
                            for (var av = 0; av < at.length; av++) {
                                at[av].paint({
                                    elId: aq,
                                    ui: aD,
                                    recalc: false,
                                    timestamp: az
                                });
                                var aF = at[av].endpoints[0] == ar[ax] ? 1 : 0;
                                if (at[av].endpoints[aF].anchor.isDynamic && !at[av].endpoints[aF].isFloating()) {
                                    var au = aF == 0 ? at[av].sourceId : at[av].targetId;
                                    var aB = P[au],
                                        aC = J[au];
                                    var aE = at[av].endpoints[aF].anchor.compute({
                                        xy: [aB.left, aB.top],
                                        wh: aC,
                                        element: at[av].endpoints[aF],
                                        txy: [aA.left, aA.top],
                                        twh: ay,
                                        tElement: ar[ax]
                                    });
                                    at[av].endpoints[aF].paint({
                                        anchorLoc: aE
                                    })
                                }
                            }
                        }
                    }
                };
            var C = function (ar, au) {
                    var av = null;
                    if (ar.constructor == Array) {
                        av = [];
                        for (var aq = 0; aq < ar.length; aq++) {
                            var at = b(ar[aq]),
                                aw = n(at, "id");
                            av.push(au(at, aw))
                        }
                    } else {
                        var at = b(ar),
                            aw = n(at, "id");
                        av = au(at, aw)
                    }
                    return av
                };
            var Q = function (aq) {
                    return M[aq]
                };
            var I = function (av, au, at) {
                    var aq = au == null ? R : au;
                    if (aq) {
                        if (q.CurrentLibrary.isDragSupported(av) && !q.CurrentLibrary.isAlreadyDraggable(av)) {
                            var ar = at || x.Defaults.DragOptions || q.Defaults.DragOptions;
                            ar = q.extend({}, ar);
                            var ax = q.CurrentLibrary.dragEvents.drag;
                            var aw = q.CurrentLibrary.dragEvents.stop;
                            ar[ax] = ag(ar[ax], function () {
                                var ay = q.CurrentLibrary.getUIPosition(arguments);
                                am(av, ay);
                                m(av, "jsPlumb_dragged")
                            });
                            ar[aw] = ag(ar[aw], function () {
                                var ay = q.CurrentLibrary.getUIPosition(arguments);
                                am(av, ay);
                                c(av, "jsPlumb_dragged")
                            });
                            var aq = aa[ap(av)];
                            ar.disabled = aq == null ? false : !aq;
                            q.CurrentLibrary.initDraggable(av, ar)
                        }
                    }
                };
            var O = function (ar) {
                    var aq = document.createElement("canvas");
                    L(aq, ar.container);
                    aq.style.position = "absolute";
                    if (ar["class"]) {
                        aq.className = ar["class"]
                    }
                    ap(aq, ar.uuid);
                    if (d) {
                        q.sizeCanvas(aq, 0, 0, U, U);
                        aq = G_vmlCanvasManager.initElement(aq)
                    }
                    return aq
                };
            var an = function (ar) {
                    var aq = q.Defaults.ConnectionType || A;
                    return new aq(ar)
                };
            var ah = function (ar) {
                    var aq = q.Defaults.EndpointType || ak;
                    return new aq(ar)
                };
            var N = function (at, av) {
                    var aq = ab[at];
                    if (aq && aq.length) {
                        for (var au = 0; au < aq.length; au++) {
                            for (var ar = 0; ar < aq[au].connections.length; ar++) {
                                var aw = av(aq[au].connections[ar]);
                                if (aw) {
                                    return
                                }
                            }
                        }
                    }
                };
            var F = function (ar) {
                    for (var aq in ab) {
                        N(aq, ar)
                    }
                };
            var X = function (aq, ar) {
                    if (aq != null) {
                        if (!ar) {
                            try {
                                document.body.removeChild(aq)
                            } catch (at) {}
                        } else {
                            q.CurrentLibrary.removeElement(aq, ar)
                        }
                    }
                };
            var K = function (at, ar) {
                    for (var aq = 0; aq < at.length; aq++) {
                        X(at[aq], ar)
                    }
                };
            var G = function (av, at, au) {
                    if (at != null) {
                        var aq = av[at];
                        if (aq != null) {
                            var ar = Y(aq, au);
                            if (ar >= 0) {
                                delete(aq[ar]);
                                aq.splice(ar, 1);
                                return true
                            }
                        }
                    }
                    return false
                };
            var r = function (ar, aq) {
                    return C(ar, function (at, au) {
                        aa[au] = aq;
                        if (q.CurrentLibrary.isDragSupported(at)) {
                            q.CurrentLibrary.setDraggable(at, aq)
                        }
                    })
                };
            var ai = function (aq, ar) {
                    N(n(aq, "id"), function (at) {
                        at.canvas.style.display = ar
                    })
                };
            var H = function (aq) {
                    return C(aq, function (at, ar) {
                        var au = aa[ar] == null ? R : aa[ar];
                        au = !au;
                        aa[ar] = au;
                        q.CurrentLibrary.setDraggable(at, au);
                        return au
                    })
                };
            var s = function (aq) {
                    N(aq, function (at) {
                        var ar = ("none" == at.canvas.style.display);
                        at.canvas.style.display = ar ? "block" : "none"
                    })
                };
            var y = function (aw) {
                    var au = aw.timestamp,
                        aq = aw.recalc,
                        av = aw.offset,
                        ar = aw.elId;
                    if (!aq) {
                        if (au && au === w[ar]) {
                            return
                        }
                    }
                    if (aq || av == null) {
                        var at = b(ar);
                        if (at != null) {
                            J[ar] = e(at);
                            P[ar] = p(at);
                            w[ar] = au
                        }
                    } else {
                        P[ar] = av
                    }
                };
            var ap = function (aq, ar) {
                    var at = b(aq);
                    var au = n(at, "id");
                    if (!au || au == "undefined") {
                        if (arguments.length == 2 && arguments[1] != undefined) {
                            au = ar
                        } else {
                            au = "jsPlumb_" + al()
                        }
                        f(at, "id", au)
                    }
                    return au
                };
            var ag = function (at, aq, ar) {
                    at = at ||
                    function () {};
                    aq = aq ||
                    function () {};
                    return function () {
                        var au = null;
                        try {
                            au = aq.apply(this, arguments)
                        } catch (av) {
                            l(x, "jsPlumb function failed : " + av)
                        }
                        if (ar == null || (au !== ar)) {
                            try {
                                at.apply(this, arguments)
                            } catch (av) {
                                l(x, "wrapped function failed : " + av)
                            }
                        }
                        return au
                    }
                };
            this.connectorClass = "_jsPlumb_connector";
            this.endpointClass = "_jsPlumb_endpoint";
            this.overlayClass = "_jsPlumb_overlay";
            this.Anchors = {};
            this.Connectors = {};
            this.Endpoints = {};
            this.Overlays = {};
            this.addEndpoint = function (aw, au, aA) {
                aA = aA || {};
                var ar = q.extend({}, aA);
                q.extend(ar, au);
                ar.endpoint = ar.endpoint || x.Defaults.Endpoint || q.Defaults.Endpoint;
                ar.endpointStyle = ar.endpointStyle || x.Defaults.EndpointStyle || q.Defaults.EndpointStyle;
                var at = b(aw),
                    aq = n(at, "id");
                ar.source = at;
                y({
                    elId: aq
                });
                var ax = ah(ar);
                h(ab, aq, ax);
                var ay = P[aq],
                    av = J[aq];
                var az = ax.anchor.compute({
                    xy: [ay.left, ay.top],
                    wh: av,
                    element: ax
                });
                ax.paint({
                    anchorLoc: az
                });
                return ax
            };
            this.addEndpoints = function (av, ar, aq) {
                var au = [];
                for (var at = 0; at < ar.length; at++) {
                    au.push(x.addEndpoint(av, ar[at], aq))
                }
                return au
            };
            this.animate = function (at, ar, aq) {
                var au = b(at),
                    ax = n(at, "id");
                aq = aq || {};
                var aw = q.CurrentLibrary.dragEvents.step;
                var av = q.CurrentLibrary.dragEvents.complete;
                aq[aw] = ag(aq[aw], function () {
                    x.repaint(ax)
                });
                aq[av] = ag(aq[av], function () {
                    x.repaint(ax)
                });
                q.CurrentLibrary.animate(au, ar, aq)
            };
            this.connect = function (ax, at) {
                var ar = q.extend({}, ax);
                if (at) {
                    q.extend(ar, at)
                }
                if (ar.source && ar.source.endpoint) {
                    ar.sourceEndpoint = ar.source
                }
                if (ar.source && ar.target.endpoint) {
                    ar.targetEndpoint = ar.target
                }
                if (ax.uuids) {
                    ar.sourceEndpoint = Q(ax.uuids[0]);
                    ar.targetEndpoint = Q(ax.uuids[1])
                }
                if (ar.sourceEndpoint && ar.sourceEndpoint.isFull()) {
                    l(x, "could not add connection; source endpoint is full");
                    return
                }
                if (ar.targetEndpoint && ar.targetEndpoint.isFull()) {
                    l(x, "could not add connection; target endpoint is full");
                    return
                }
                if (ar.dynamicAnchors) {
                    var au = ar.dynamicAnchors.constructor == Array;
                    var aq = au ? new T(q.makeAnchors(ar.dynamicAnchors)) : new T(q.makeAnchors(ar.dynamicAnchors.source));
                    var av = au ? new T(q.makeAnchors(ar.dynamicAnchors)) : new T(q.makeAnchors(ar.dynamicAnchors.target));
                    ar.anchors = [aq, av]
                }
                var aw = an(ar);
                h(E, aw.scope, aw);
                x.fireUpdate("jsPlumbConnection", {
                    source: aw.source,
                    target: aw.target,
                    sourceId: aw.sourceId,
                    targetId: aw.targetId,
                    sourceEndpoint: aw.endpoints[0],
                    targetEndpoint: aw.endpoints[1]
                });
                am(aw.source);
                return aw
            };
            this.deleteEndpoint = function (ar) {
                var ax = (typeof ar == "string") ? M[ar] : ar;
                if (ax) {
                    var au = ax.getUuid();
                    if (au) {
                        M[au] = null
                    }
                    ax.detachAll();
                    X(ax.canvas, ax.container);
                    for (var aw in ab) {
                        var aq = ab[aw];
                        if (aq) {
                            var av = [];
                            for (var at = 0; at < aq.length; at++) {
                                if (aq[at] != ax) {
                                    av.push(aq[at])
                                }
                            }
                            ab[aw] = av
                        }
                    }
                    delete ax
                }
            };
            this.deleteEveryEndpoint = function () {
                for (var at in ab) {
                    var aq = ab[at];
                    if (aq && aq.length) {
                        for (var ar = 0; ar < aq.length; ar++) {
                            x.deleteEndpoint(aq[ar])
                        }
                    }
                }
                delete ab;
                ab = {};
                delete M;
                M = {}
            };
            var W = function (aq) {
                    x.fireUpdate("jsPlumbConnectionDetached", {
                        source: aq.source,
                        target: aq.target,
                        sourceId: aq.sourceId,
                        targetId: aq.targetId,
                        sourceEndpoint: aq.endpoints[0],
                        targetEndpoint: aq.endpoints[1]
                    })
                };
            this.detach = function (aq, av) {
                if (arguments.length == 2) {
                    var az = b(aq),
                        at = ap(az);
                    var ay = b(av),
                        au = ap(ay);
                    N(at, function (aA) {
                        if ((aA.sourceId == at && aA.targetId == au) || (aA.targetId == at && aA.sourceId == au)) {
                            X(aA.canvas, aA.container);
                            aA.endpoints[0].removeConnection(aA);
                            aA.endpoints[1].removeConnection(aA);
                            G(E, aA.scope, aA)
                        }
                    })
                } else {
                    if (arguments.length == 1) {
                        if (arguments[0].constructor == A) {
                            arguments[0].endpoints[0].detachFrom(arguments[0].endpoints[1])
                        } else {
                            if (arguments[0].connection) {
                                arguments[0].connection.endpoints[0].detachFrom(arguments[0].connection.endpoints[1])
                            } else {
                                var ar = q.extend({}, aq);
                                if (ar.uuids) {
                                    Q(ar.uuids[0]).detachFrom(Q(ar.uuids[1]))
                                } else {
                                    if (ar.sourceEndpoint && ar.targetEndpoint) {
                                        ar.sourceEndpoint.detachFrom(ar.targetEndpoint)
                                    } else {
                                        var ax = ap(ar.source);
                                        var aw = ap(ar.target);
                                        N(ax, function (aA) {
                                            if ((aA.sourceId == ax && aA.targetId == aw) || (aA.targetId == ax && aA.sourceId == aw)) {
                                                X(aA.canvas, aA.container);
                                                aA.endpoints[0].removeConnection(aA);
                                                aA.endpoints[1].removeConnection(aA);
                                                G(E, aA.scope, aA)
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            };
            this.detachAllConnections = function (at) {
                var au = n(at, "id");
                var aq = ab[au];
                if (aq && aq.length) {
                    for (var ar = 0; ar < aq.length; ar++) {
                        aq[ar].detachAll()
                    }
                }
            };
            this.detachAll = this.detachAllConnections;
            this.detachEveryConnection = function () {
                for (var at in ab) {
                    var aq = ab[at];
                    if (aq && aq.length) {
                        for (var ar = 0; ar < aq.length; ar++) {
                            aq[ar].detachAll()
                        }
                    }
                }
                delete E;
                E = {}
            };
            this.detachEverything = this.detachEveryConnection;
            this.draggable = function (at, aq) {
                if (typeof at == "object" && at.length) {
                    for (var ar = 0; ar < at.length; ar++) {
                        var au = b(at[ar]);
                        if (au) {
                            I(au, true, aq)
                        }
                    }
                } else {
                    if (at._nodes) {
                        for (var ar = 0; ar < at._nodes.length; ar++) {
                            var au = b(at._nodes[ar]);
                            if (au) {
                                I(au, true, aq)
                            }
                        }
                    } else {
                        var au = b(at);
                        if (au) {
                            I(au, true, aq)
                        }
                    }
                }
            };
            this.extend = function (ar, aq) {
                return q.CurrentLibrary.extend(ar, aq)
            };
            this.getDefaultEndpointType = function () {
                return ak
            };
            this.getDefaultConnectionType = function () {
                return A
            };
            this.getConnections = function (aA) {
                var aq = {};
                aA = aA || {};
                var az = function (aB) {
                        var aC = [];
                        if (aB) {
                            if (typeof aB == "string") {
                                aC.push(aB)
                            } else {
                                aC = aB
                            }
                        }
                        return aC
                    };
                var ay = az(aA.scope);
                var ar = az(aA.source);
                var aw = az(aA.target);
                var at = function (aC, aB) {
                        return aC.length > 0 ? Y(aC, aB) != -1 : true
                    };
                for (var av in E) {
                    if (at(ay, av)) {
                        aq[av] = [];
                        for (var au = 0; au < E[av].length; au++) {
                            var ax = E[av][au];
                            if (at(ar, ax.sourceId) && at(aw, ax.targetId)) {
                                aq[av].push({
                                    sourceId: ax.sourceId,
                                    targetId: ax.targetId,
                                    source: ax.source,
                                    target: ax.target,
                                    sourceEndpoint: ax.endpoints[0],
                                    targetEndpoint: ax.endpoints[1],
                                    connection: ax
                                })
                            }
                        }
                    }
                }
                return aq
            };
            this.getDefaultScope = function () {
                return v
            };
            this.getEndpoint = Q;
            this.getId = ap;
            this.hide = function (aq) {
                ai(aq, "none")
            };
            this.init = function () {
                var aq = function (ar) {
                        q.CurrentLibrary.bind(document, ar, function (ax) {
                            if (!x.currentlyDragging && aj) {
                                for (var aw in E) {
                                    var ay = E[aw];
                                    for (var au = 0; au < ay.length; au++) {
                                        if (ay[au][ar](ax)) {
                                            return
                                        }
                                    }
                                }
                                for (var av in ab) {
                                    var at = ab[av];
                                    for (var au = 0; au < at.length; au++) {
                                        if (at[au][ar](ax)) {
                                            return
                                        }
                                    }
                                }
                            }
                        })
                    };
                aq("click");
                aq("dblclick");
                aq("mousemove");
                aq("mousedown");
                aq("mouseup");
                D = true;
                x.fireUpdate("ready")
            };
            this.makeAnchor = function (ay, av, aw, at, au, aq) {
                if (arguments.length == 0) {
                    return null
                }
                var ar = {};
                if (arguments.length == 1) {
                    var az = arguments[0];
                    if (az.compute && az.getOrientation) {
                        return az
                    } else {
                        if (typeof az == "string") {
                            return x.Anchors[arguments[0]]()
                        } else {
                            if (az.constructor == Array) {
                                if (az[0].constructor == Array || az[0].constructor == String) {
                                    return new T(az)
                                } else {
                                    return q.makeAnchor.apply(this, az)
                                }
                            } else {
                                if (typeof arguments[0] == "object") {
                                    q.extend(ar, ay)
                                }
                            }
                        }
                    }
                } else {
                    ar = {
                        x: ay,
                        y: av
                    };
                    if (arguments.length >= 4) {
                        ar.orientation = [arguments[2], arguments[3]]
                    }
                    if (arguments.length == 6) {
                        ar.offsets = [arguments[4], arguments[5]]
                    }
                }
                var ax = new V(ar);
                ax.clone = function () {
                    return new V(ar)
                };
                return ax
            };
            this.makeAnchors = function (ar) {
                var at = [];
                for (var aq = 0; aq < ar.length; aq++) {
                    if (typeof ar[aq] == "string") {
                        at.push(x.Anchors[ar[aq]]())
                    } else {
                        if (ar[aq].constructor == Array) {
                            at.push(q.makeAnchor(ar[aq]))
                        }
                    }
                }
                return at
            };
            this.makeDynamicAnchor = function (aq, ar) {
                return new T(aq, ar)
            };
            this.repaint = function (ar) {
                var at = function (au) {
                        am(b(au))
                    };
                if (typeof ar == "object") {
                    for (var aq = 0; aq < ar.length; aq++) {
                        at(ar[aq])
                    }
                } else {
                    at(ar)
                }
            };
            this.repaintEverything = function () {
                var ar = al();
                for (var aq in ab) {
                    am(b(aq), null, ar)
                }
            };
            this.removeAllEndpoints = function (at) {
                var aq = n(at, "id");
                var au = ab[aq];
                for (var ar in au) {
                    x.deleteEndpoint(au[ar])
                }
                ab[aq] = []
            };
            this.removeEveryEndpoint = this.deleteEveryEndpoint;
            this.removeEndpoint = function (aq, ar) {
                x.deleteEndpoint(ar)
            };
            this.reset = function () {
                this.deleteEveryEndpoint();
                this.clearListeners()
            };
            this.setAutomaticRepaint = function (aq) {
                t = aq
            };
            this.setDefaultNewCanvasSize = function (aq) {
                U = aq
            };
            this.setDefaultScope = function (aq) {
                v = aq
            };
            this.setDraggable = r;
            this.setDraggableByDefault = function (aq) {
                R = aq
            };
            this.setDebugLog = function (aq) {
                z = aq
            };
            this.setRepaintFunction = function (aq) {
                ae = aq
            };
            this.setMouseEventsEnabled = function (aq) {
                aj = aq
            };
            this.show = function (aq) {
                ai(aq, "block")
            };
            this.sizeCanvas = function (at, aq, av, ar, au) {
                if (at) {
                    at.style.height = au + "px";
                    at.height = au;
                    at.style.width = ar + "px";
                    at.width = ar;
                    at.style.left = aq + "px";
                    at.style.top = av + "px"
                }
            };
            this.getTestHarness = function () {
                return {
                    endpointsByElement: ab,
                    endpointCount: function (aq) {
                        var ar = ab[aq];
                        return ar ? ar.length : 0
                    },
                    connectionCount: function (aq) {
                        aq = aq || v;
                        var ar = E[aq];
                        return ar ? ar.length : 0
                    },
                    findIndex: Y,
                    getId: ap
                }
            };
            this.toggle = s;
            this.toggleVisible = s;
            this.toggleDraggable = H;
            this.unload = function () {
                delete ab;
                delete M;
                delete P;
                delete J;
                delete S;
                delete aa;
                delete Z
            };
            this.wrap = ag;
            this.addListener = this.bind;
            var V = function (av) {
                    var at = this;
                    this.x = av.x || 0;
                    this.y = av.y || 0;
                    var ar = av.orientation || [0, 0];
                    var au = null,
                        aq = null;
                    this.offsets = av.offsets || [0, 0];
                    at.timestamp = null;
                    this.compute = function (aB) {
                        var aG = aB.xy,
                            ax = aB.wh,
                            aC = aB.element,
                            aD = aB.timestamp;
                        if (aD && aD === at.timestamp) {
                            return aq
                        }
                        aq = [aG[0] + (at.x * ax[0]) + at.offsets[0], aG[1] + (at.y * ax[1]) + at.offsets[1]];
                        var ay = aC ? aC.container : null;
                        var aE = {
                            left: 0,
                            top: 0
                        };
                        if (ay != null) {
                            var aw = b(ay);
                            var az = p(aw);
                            var aA = q.CurrentLibrary.getScrollLeft(aw);
                            var aF = q.CurrentLibrary.getScrollTop(aw);
                            aE.left = az.left - aA;
                            aE.top = az.top - aF;
                            aq[0] = aq[0] - aE.left;
                            aq[1] = aq[1] - aE.top
                        }
                        at.timestamp = aD;
                        return aq
                    };
                    this.getOrientation = function () {
                        return ar
                    };
                    this.equals = function (aw) {
                        if (!aw) {
                            return false
                        }
                        var ax = aw.getOrientation();
                        var ay = this.getOrientation();
                        return this.x == aw.x && this.y == aw.y && this.offsets[0] == aw.offsets[0] && this.offsets[1] == aw.offsets[1] && ay[0] == ax[0] && ay[1] == ax[1]
                    };
                    this.getCurrentLocation = function () {
                        return aq
                    }
                };
            var B = function (ax) {
                    var av = ax.reference;
                    var aw = ax.referenceCanvas;
                    var at = e(b(aw));
                    var ar = 0,
                        ay = 0;
                    var aq = null;
                    var au = null;
                    this.compute = function (aD) {
                        var aB = aD.xy,
                            aA = aD.element;
                        var az = [aB[0] + (at[0] / 2), aB[1] + (at[1] / 2)];
                        if (aA.container != null) {
                            var aC = p(aA.container);
                            az[0] = az[0] - aC.left;
                            az[1] = az[1] - aC.top
                        }
                        au = az;
                        return az
                    };
                    this.getOrientation = function () {
                        if (aq) {
                            return aq
                        } else {
                            var az = av.getOrientation();
                            return [Math.abs(az[0]) * ar * -1, Math.abs(az[1]) * ay * -1]
                        }
                    };
                    this.over = function (az) {
                        aq = az.getOrientation()
                    };
                    this.out = function () {
                        aq = null
                    };
                    this.getCurrentLocation = function () {
                        return au
                    }
                };
            var T = function (at, ar) {
                    this.isSelective = true;
                    this.isDynamic = true;
                    var aA = at || [];
                    var ay = function (aB) {
                            return aB.constructor == V ? aB : q.makeAnchor(aB)
                        };
                    for (var ax = 0; ax < aA.length; ax++) {
                        aA[ax] = ay(aA[ax])
                    }
                    this.addAnchor = function (aB) {
                        aA.push(ay(aB))
                    };
                    this.getAnchors = function () {
                        return aA
                    };
                    var au = aA.length > 0 ? aA[0] : null;
                    var aw = aA.length > 0 ? 0 : -1;
                    this.locked = false;
                    var az = this;
                    var av = function (aD, aB, aH, aG, aC) {
                            var aF = aG[0] + (aD.x * aC[0]),
                                aE = aG[1] + (aD.y * aC[1]);
                            return Math.sqrt(Math.pow(aB - aF, 2) + Math.pow(aH - aE, 2))
                        };
                    var aq = ar ||
                    function (aL, aC, aD, aE, aB) {
                        var aG = aD[0] + (aE[0] / 2),
                            aF = aD[1] + (aE[1] / 2);
                        var aI = -1,
                            aK = Infinity;
                        for (var aH = 0; aH < aB.length; aH++) {
                            var aJ = av(aB[aH], aG, aF, aL, aC);
                            if (aJ < aK) {
                                aI = aH + 0;
                                aK = aJ
                            }
                        }
                        return aB[aI]
                    };
                    this.compute = function (aF) {
                        var aE = aF.xy,
                            aB = aF.wh,
                            aD = aF.timestamp,
                            aC = aF.txy,
                            aH = aF.twh;
                        if (az.locked || aC == null || aH == null) {
                            return au.compute(aF)
                        } else {
                            aF.timestamp = null
                        }
                        au = aq(aE, aB, aC, aH, aA);
                        var aG = au.compute(aF);
                        return aG
                    };
                    this.getCurrentLocation = function () {
                        var aB = au != null ? au.getCurrentLocation() : null;
                        return aB
                    };
                    this.getOrientation = function () {
                        return au != null ? au.getOrientation() : [0, 0]
                    };
                    this.over = function (aB) {
                        if (au != null) {
                            au.over(aB)
                        }
                    };
                    this.out = function () {
                        if (au != null) {
                            au.out()
                        }
                    }
                };
            var A = function (aJ) {
                    a.apply(this);
                    var az = this;
                    var ar = true;
                    this.isVisible = function () {
                        return ar
                    };
                    this.setVisible = function (aL) {
                        ar = aL;
                        if (az.canvas) {
                            az.canvas.style.display = aL ? "block" : "none"
                        }
                    };
                    var aC = new String("_jsplumb_c_" + (new Date()).getTime());
                    this.getId = function () {
                        return aC
                    };
                    this.container = aJ.container || x.Defaults.Container;
                    this.source = b(aJ.source);
                    this.target = b(aJ.target);
                    if (aJ.sourceEndpoint) {
                        this.source = aJ.sourceEndpoint.getElement()
                    }
                    if (aJ.targetEndpoint) {
                        this.target = aJ.targetEndpoint.getElement()
                    }
                    this.sourceId = n(this.source, "id");
                    this.targetId = n(this.target, "id");
                    this.endpointsOnTop = aJ.endpointsOnTop != null ? aJ.endpointsOnTop : true;
                    this.getAttachedElements = function () {
                        return az.endpoints
                    };
                    this.scope = aJ.scope;
                    this.endpoints = [];
                    this.endpointStyles = [];
                    var aI = function (aL) {
                            if (aL) {
                                return q.makeAnchor(aL)
                            }
                        };
                    var aF = function (aL, aO, aM, aN) {
                            if (aL) {
                                az.endpoints[aO] = aL;
                                aL.addConnection(az)
                            } else {
                                if (!aM.endpoints) {
                                    aM.endpoints = [null, null]
                                }
                                var aU = aM.endpoints[aO] || aM.endpoint || x.Defaults.Endpoints[aO] || q.Defaults.Endpoints[aO] || x.Defaults.Endpoint || q.Defaults.Endpoint || new q.Endpoints.Dot();
                                if (aU.constructor == String) {
                                    aU = new q.Endpoints[aU]()
                                } else {
                                    if (aU.constructor == Array) {
                                        aU = new q.Endpoints[aU[0]](aU[1])
                                    }
                                }
                                if (!aM.endpointStyles) {
                                    aM.endpointStyles = [null, null]
                                }
                                if (!aM.endpointHoverStyles) {
                                    aM.endpointHoverStyles = [null, null]
                                }
                                var aS = aM.endpointStyles[aO] || aM.endpointStyle || x.Defaults.EndpointStyles[aO] || q.Defaults.EndpointStyles[aO] || x.Defaults.EndpointStyle || q.Defaults.EndpointStyle;
                                var aQ = aM.endpointHoverStyles[aO] || aM.endpointHoverStyle || x.Defaults.EndpointHoverStyles[aO] || q.Defaults.EndpointHoverStyles[aO] || x.Defaults.EndpointHoverStyle || q.Defaults.EndpointHoverStyle;
                                var aR = aM.anchors ? aM.anchors[aO] : aI(x.Defaults.Anchors[aO]) || aI(q.Defaults.Anchors[aO]) || aI(x.Defaults.Anchor) || aI(q.Defaults.Anchor) || aI("BottomCenter");
                                var aT = aM.uuids ? aM.uuids[aO] : null;
                                var aP = ah({
                                    paintStyle: aS,
                                    hoverPaintStyle: aQ,
                                    endpoint: aU,
                                    connections: [az],
                                    uuid: aT,
                                    anchor: aR,
                                    source: aN,
                                    container: az.container
                                });
                                az.endpoints[aO] = aP;
                                return aP
                            }
                        };
                    var aB = aF(aJ.sourceEndpoint, 0, aJ, az.source);
                    if (aB) {
                        h(ab, this.sourceId, aB)
                    }
                    var aA = aF(aJ.targetEndpoint, 1, aJ, az.target);
                    if (aA) {
                        h(ab, this.targetId, aA)
                    }
                    if (!this.scope) {
                        this.scope = this.endpoints[0].scope
                    }
                    this.connector = this.endpoints[0].connector || this.endpoints[1].connector || aJ.connector || x.Defaults.Connector || q.Defaults.Connector || new q.Connectors.Bezier();
                    if (this.connector.constructor == String) {
                        this.connector = new q.Connectors[this.connector]()
                    } else {
                        if (this.connector.constructor == Array) {
                            this.connector = new q.Connectors[this.connector[0]](this.connector[1])
                        }
                    }
                    this.paintStyle = this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || aJ.paintStyle || x.Defaults.PaintStyle || q.Defaults.PaintStyle;
                    var ay = this.endpoints[0].connectorBackgroundStyle || this.endpoints[1].connectorBackgroundStyle || aJ.backgroundPaintStyle || x.Defaults.BackgroundPaintStyle || q.Defaults.BackgroundPaintStyle;
                    this.hoverPaintStyle = this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || aJ.hoverPaintStyle || x.Defaults.HoverPaintStyle || q.Defaults.HoverPaintStyle;
                    this.paintStyleInUse = this.paintStyle;
                    this.overlays = [];
                    if (aJ.overlays) {
                        for (var aH = 0; aH < aJ.overlays.length; aH++) {
                            var aG = aJ.overlays[aH];
                            if (aG.constructor == Array) {
                                var au = aG[0];
                                var aD = q.CurrentLibrary.extend({
                                    connection: az
                                }, aG[1]);
                                if (aG.length == 3) {
                                    q.CurrentLibrary.extend(aD, aG[2])
                                }
                                this.overlays.push(new q.Overlays[au](aD))
                            } else {
                                if (aG.constructor == String) {
                                    this.overlays.push(new q.Overlays[aG]({
                                        connection: az
                                    }))
                                } else {
                                    this.overlays.push(aG)
                                }
                            }
                        }
                    }
                    var aK = [];
                    this.addOverlay = function (aL) {
                        overlays.push(aL)
                    };
                    this.labelStyle = aJ.labelStyle || x.Defaults.LabelStyle || q.Defaults.LabelStyle;
                    this.label = aJ.label;
                    if (this.label) {
                        this.overlays.push(new q.Overlays.Label({
                            labelStyle: this.labelStyle,
                            label: this.label,
                            connection: az
                        }))
                    }
                    y({
                        elId: this.sourceId
                    });
                    y({
                        elId: this.targetId
                    });
                    this.setLabel = function (aL) {
                        az.label = aL;
                        x.repaint(az.source)
                    };
                    var aw = P[this.sourceId],
                        av = J[this.sourceId];
                    var aq = P[this.targetId];
                    var ax = J[this.targetId];
                    var aE = this.endpoints[0].anchor.compute({
                        xy: [aw.left, aw.top],
                        wh: av,
                        element: this.endpoints[0],
                        txy: [aq.left, aq.top],
                        twh: ax,
                        tElement: this.endpoints[1]
                    });
                    this.endpoints[0].paint({
                        anchorLoc: aE
                    });
                    aE = this.endpoints[1].anchor.compute({
                        xy: [aq.left, aq.top],
                        wh: ax,
                        element: this.endpoints[1],
                        txy: [aw.left, aw.top],
                        twh: av,
                        tElement: this.endpoints[0]
                    });
                    this.endpoints[1].paint({
                        anchorLoc: aE
                    });
                    var at = O({
                        "class": q.connectorClass,
                        container: az.container
                    });
                    this.canvas = at;
                    this.setBackgroundPaintStyle = function (aL) {
                        ay = aL;
                        az.repaint()
                    };
                    this.paint = function (a6) {
                        a6 = a6 || {};
                        var aV = a6.elId,
                            aX = a6.ui,
                            aT = a6.recalc,
                            aM = a6.timestamp;
                        var aP = az.floatingAnchorIndex;
                        var aY = false;
                        var a5 = aY ? this.sourceId : this.targetId,
                            aS = aY ? this.targetId : this.sourceId;
                        var aN = aY ? 0 : 1,
                            a7 = aY ? 1 : 0;
                        var aL = aY ? this.target : this.source;
                        if (this.canvas.getContext) {
                            y({
                                elId: aV,
                                offset: aX,
                                recalc: aT,
                                timestamp: aM
                            });
                            y({
                                elId: a5,
                                timestamp: aM
                            });
                            var a0 = at.getContext("2d");
                            var aQ = this.endpoints[a7].anchor.getCurrentLocation();
                            var aR = this.endpoints[a7].anchor.getOrientation();
                            var a3 = this.endpoints[aN].anchor.getCurrentLocation();
                            var a4 = this.endpoints[aN].anchor.getOrientation();
                            var aO = 0;
                            for (var a2 = 0; a2 < az.overlays.length; a2++) {
                                var aZ = az.overlays[a2];
                                var aW = aZ.computeMaxSize(az.connector, a0);
                                if (aW > aO) {
                                    aO = aW
                                }
                            }
                            var a1 = this.connector.compute(aQ, a3, this.endpoints[a7].anchor, this.endpoints[aN].anchor, az.paintStyleInUse.lineWidth, aO);
                            q.sizeCanvas(at, a1[0], a1[1], a1[2], a1[3]);
                            var aU = function (a8, ba) {
                                    a8.save();
                                    q.extend(a8, ba);
                                    if (ba.gradient && !d) {
                                        var bb = az.connector.createGradient(a1, a8, (aV == this.sourceId));
                                        for (var a9 = 0; a9 < ba.gradient.stops.length; a9++) {
                                            bb.addColorStop(ba.gradient.stops[a9][0], ba.gradient.stops[a9][1])
                                        }
                                        a8.strokeStyle = bb
                                    }
                                    az.connector.paint(a1, a8);
                                    a8.restore()
                                };
                            if (ay != null) {
                                aU(a0, ay)
                            }
                            aU(a0, az.paintStyleInUse);
                            for (var a2 = 0; a2 < az.overlays.length; a2++) {
                                var aZ = az.overlays[a2];
                                az.overlayPlacements[a2] = aZ.draw(az.connector, a0, az.paintStyleInUse)
                            }
                        }
                    };
                    this.repaint = function () {
                        this.paint({
                            elId: this.sourceId,
                            recalc: true
                        })
                    };
                    I(az.source, aJ.draggable, aJ.dragOptions);
                    I(az.target, aJ.draggable, aJ.dragOptions);
                    if (this.source.resize) {
                        this.source.resize(function (aL) {
                            q.repaint(az.sourceId)
                        })
                    }
                };
            var ak = function (aP) {
                    a.apply(this);
                    aP = aP || {};
                    var aE = this;
                    var ar = true;
                    this.isVisible = function () {
                        return ar
                    };
                    this.setVisible = function (aR, aU, aQ) {
                        ar = aR;
                        if (aE.canvas) {
                            aE.canvas.style.display = aR ? "block" : "none"
                        }
                        if (!aU) {
                            for (var aT = 0; aT < aE.connections.length; aT++) {
                                aE.connections[aT].setVisible(aR);
                                if (!aQ) {
                                    var aS = aE === aE.connections[aT].endpoints[0] ? 1 : 0;
                                    if (aE.connections[aT].endpoints[aS].connections.length == 1) {
                                        aE.connections[aT].endpoints[aS].setVisible(aR, true, true)
                                    }
                                }
                            }
                        }
                    };
                    var aF = new String("_jsplumb_e_" + (new Date()).getTime());
                    this.getId = function () {
                        return aF
                    };
                    if (aP.dynamicAnchors) {
                        aE.anchor = new T(q.makeAnchors(aP.dynamicAnchors))
                    } else {
                        aE.anchor = aP.anchor ? q.makeAnchor(aP.anchor) : aP.anchors ? q.makeAnchor(aP.anchors) : q.makeAnchor("TopCenter")
                    }
                    var aC = aP.endpoint || new q.Endpoints.Dot();
                    if (aC.constructor == String) {
                        aC = new q.Endpoints[aC]()
                    } else {
                        if (aC.constructor == Array) {
                            aC = new q.Endpoints[aC[0]](aC[1])
                        }
                    }
                    aE.endpoint = aC;
                    this.paintStyle = aP.paintStyle || aP.style || x.Defaults.EndpointStyle || q.Defaults.EndpointStyle;
                    this.hoverPaintStyle = aP.hoverPaintStyle || x.Defaults.EndpointHoverStyle || q.Defaults.EndpointHoverStyle;
                    this.paintStyleInUse = this.paintStyle;
                    this.connectorStyle = aP.connectorStyle;
                    this.connectorBackgroundStyle = aP.connectorBackgroundStyle;
                    this.connectorHoverStyle = aP.connectorHoverStyle;
                    this.connectorOverlays = aP.connectorOverlays;
                    this.connector = aP.connector;
                    this.isSource = aP.isSource || false;
                    this.isTarget = aP.isTarget || false;
                    var aD = aP.source,
                        az = aP.uuid;
                    var aN = null,
                        au = null;
                    if (az) {
                        M[az] = aE
                    }
                    this.container = aP.container || x.Defaults.Container || q.Defaults.Container;
                    var ax = n(aD, "id");
                    this.elementId = ax;
                    var aK = aP.maxConnections || 1;
                    this.getAttachedElements = function () {
                        return aE.connections
                    };
                    this.canvas = aP.canvas || O({
                        "class": q.endpointClass,
                        container: this.container,
                        uuid: aP.uuid
                    });
                    this.connections = aP.connections || [];
                    this.scope = aP.scope || v;
                    this.timestamp = null;
                    var aB = aP.reattach || false;
                    var aA = aP.dragAllowedWhenFull || true;
                    this.computeAnchor = function (aQ) {
                        return aE.anchor.compute(aQ)
                    };
                    this.addConnection = function (aQ) {
                        aE.connections.push(aQ)
                    };
                    this.detach = function (aR, aT) {
                        var aQ = Y(aE.connections, aR);
                        if (aQ >= 0) {
                            aE.connections.splice(aQ, 1);
                            if (!aT) {
                                var aS = aR.endpoints[0] == aE ? aR.endpoints[1] : aR.endpoints[0];
                                aS.detach(aR, true)
                            }
                            X(aR.canvas, aR.container);
                            G(E, aR.scope, aR);
                            if (!aT) {
                                W(aR)
                            }
                        }
                    };
                    this.detachAll = function () {
                        while (aE.connections.length > 0) {
                            aE.detach(aE.connections[0])
                        }
                    };
                    this.detachFrom = function (aR) {
                        var aS = [];
                        for (var aQ = 0; aQ < aE.connections.length; aQ++) {
                            if (aE.connections[aQ].endpoints[1] == aR || aE.connections[aQ].endpoints[0] == aR) {
                                aS.push(aE.connections[aQ])
                            }
                        }
                        for (var aQ = 0; aQ < aS.length; aQ++) {
                            aS[aQ].setHover(false);
                            aE.detach(aS[aQ])
                        }
                    };
                    this.detachFromConnection = function (aR) {
                        var aQ = Y(aE.connections, aR);
                        if (aQ >= 0) {
                            aE.connections.splice(aQ, 1)
                        }
                    };
                    this.getElement = function () {
                        return aD
                    };
                    this.getUuid = function () {
                        return az
                    };
                    this.makeInPlaceCopy = function () {
                        var aQ = ah({
                            anchor: aE.anchor,
                            source: aD,
                            paintStyle: this.paintStyle,
                            endpoint: aC
                        });
                        return aQ
                    };
                    this.isConnectedTo = function (aS) {
                        var aR = false;
                        if (aS) {
                            for (var aQ = 0; aQ < aE.connections.length; aQ++) {
                                if (aE.connections[aQ].endpoints[1] == aS) {
                                    aR = true;
                                    break
                                }
                            }
                        }
                        return aR
                    };
                    this.isFloating = function () {
                        return aN != null
                    };
                    this.connectorSelector = function () {
                        return (aE.connections.length < aK) ? null : aE.connections[0]
                    };
                    this.isFull = function () {
                        return aK < 1 ? false : (aE.connections.length >= aK)
                    };
                    this.setDragAllowedWhenFull = function (aQ) {
                        aA = aQ
                    };
                    this.setPaintStyle = this.setPaintStyle;
                    this.setHoverPaintStyle = this.setHoverPaintStyle;
                    this.setStyle = aE.setPaintStyle;
                    this.equals = function (aQ) {
                        return this.anchor.equals(aQ.anchor)
                    };
                    this.paint = function (aT) {
                        aT = aT || {};
                        var aX = aT.timestamp;
                        if (!aX || aE.timestamp !== aX) {
                            var aW = aT.anchorPoint,
                                aS = aT.canvas,
                                aU = aT.connectorPaintStyle;
                            if (aW == null) {
                                var a2 = aT.offset || P[ax];
                                var aQ = aT.dimensions || J[ax];
                                if (a2 == null || aQ == null) {
                                    y({
                                        elId: ax,
                                        timestamp: aX
                                    });
                                    a2 = P[ax];
                                    aQ = J[ax]
                                }
                                var aR = {
                                    xy: [a2.left, a2.top],
                                    wh: aQ,
                                    element: aE,
                                    timestamp: aX
                                };
                                if (aE.anchor.isDynamic) {
                                    if (aE.connections.length > 0) {
                                        var aZ = aE.connections[0];
                                        var a1 = aZ.endpoints[0] == aE ? 1 : 0;
                                        var aV = a1 == 0 ? aZ.sourceId : aZ.targetId;
                                        var aY = P[aV],
                                            a0 = J[aV];
                                        aR.txy = [aY.left, aY.top];
                                        aR.twh = a0;
                                        aR.tElement = aZ.endpoints[a1]
                                    }
                                }
                                aW = aE.anchor.compute(aR)
                            }
                            aC.paint(aW, aE.anchor.getOrientation(), aS || aE.canvas, aE.paintStyleInUse, aU || aE.paintStyleInUse);
                            aE.timestamp = aX
                        }
                    };
                    this.repaint = this.paint;
                    this.removeConnection = this.detach;
                    if (aP.isSource && q.CurrentLibrary.isDragSupported(aD)) {
                        var aJ = null,
                            aF = null,
                            aI = null,
                            aq = false,
                            at = null;
                        var av = function () {
                                aI = aE.connectorSelector();
                                if (aE.isFull() && !aA) {
                                    return false
                                }
                                y({
                                    elId: ax
                                });
                                au = aE.makeInPlaceCopy();
                                au.paint();
                                aJ = document.createElement("div");
                                var aU = b(aJ);
                                L(aJ, aE.container);
                                var aW = ap(aU);
                                y({
                                    elId: aW
                                });
                                f(b(aE.canvas), "dragId", aW);
                                f(b(aE.canvas), "elId", ax);
                                var aR = new B({
                                    reference: aE.anchor,
                                    referenceCanvas: aE.canvas
                                });
                                aN = ah({
                                    paintStyle: {
                                        fillStyle: "rgba(0,0,0,0)"
                                    },
                                    endpoint: aC,
                                    anchor: aR,
                                    source: aU
                                });
                                if (aI == null) {
                                    aE.anchor.locked = true;
                                    aI = an({
                                        sourceEndpoint: aE,
                                        targetEndpoint: aN,
                                        source: b(aD),
                                        target: b(aJ),
                                        anchors: [aE.anchor, aR],
                                        paintStyle: aP.connectorStyle,
                                        hoverPaintStyle: aP.connectorHoverStyle,
                                        backgroundPaintStyle: aP.connectorBackgroundStyle,
                                        connector: aP.connector,
                                        overlays: aP.connectorOverlays
                                    });
                                    aI.setHover(false)
                                } else {
                                    aq = true;
                                    aI.setHover(false);
                                    aw(b(au.canvas));
                                    var aQ = aI.sourceId == ax ? 0 : 1;
                                    aI.floatingAnchorIndex = aQ;
                                    aE.detachFromConnection(aI);
                                    var aV = b(aE.canvas);
                                    var aT = q.CurrentLibrary.getDragScope(aV);
                                    f(aV, "originalScope", aT);
                                    var aS = "scope_" + (new Date()).getTime();
                                    if (aQ == 0) {
                                        at = [aI.source, aI.sourceId, aM, aT];
                                        aI.source = b(aJ);
                                        aI.sourceId = aW
                                    } else {
                                        at = [aI.target, aI.targetId, aM, aT];
                                        aI.target = b(aJ);
                                        aI.targetId = aW
                                    }
                                    q.CurrentLibrary.setDragScope(aM, aS);
                                    aI.endpoints[aQ == 0 ? 1 : 0].anchor.locked = true;
                                    aI.suspendedEndpoint = aI.endpoints[aQ];
                                    aI.endpoints[aQ] = aN
                                }
                                S[aW] = aI;
                                aN.addConnection(aI);
                                h(ab, aW, aN);
                                x.currentlyDragging = true
                            };
                        var aL = aP.dragOptions || {};
                        var aG = q.extend({}, q.CurrentLibrary.defaultDragOptions);
                        aL = q.extend(aG, aL);
                        aL.scope = aL.scope || aE.scope;
                        var aH = q.CurrentLibrary.dragEvents.start;
                        var aO = q.CurrentLibrary.dragEvents.stop;
                        var ay = q.CurrentLibrary.dragEvents.drag;
                        aL[aH] = ag(aL[aH], av);
                        aL[ay] = ag(aL[ay], function () {
                            var aQ = q.CurrentLibrary.getUIPosition(arguments);
                            q.CurrentLibrary.setOffset(aJ, aQ);
                            am(b(aJ), aQ)
                        });
                        aL[aO] = ag(aL[aO], function () {
                            G(ab, aF, aN);
                            K([aJ, aN.canvas], aD);
                            X(au.canvas, aD);
                            var aQ = aI.floatingAnchorIndex == null ? 1 : aI.floatingAnchorIndex;
                            aI.endpoints[aQ == 0 ? 1 : 0].anchor.locked = false;
                            if (aI.endpoints[aQ] == aN) {
                                if (aq && aI.suspendedEndpoint) {
                                    if (aQ == 0) {
                                        aI.source = at[0];
                                        aI.sourceId = at[1]
                                    } else {
                                        aI.target = at[0];
                                        aI.targetId = at[1]
                                    }
                                    q.CurrentLibrary.setDragScope(at[2], at[3]);
                                    aI.endpoints[aQ] = aI.suspendedEndpoint;
                                    if (aB) {
                                        aI.floatingAnchorIndex = null;
                                        aI.suspendedEndpoint.addConnection(aI);
                                        q.repaint(at[1])
                                    } else {
                                        aI.endpoints[aQ == 0 ? 1 : 0].detach(aI)
                                    }
                                } else {
                                    X(aI.canvas, aE.container);
                                    aE.detachFromConnection(aI)
                                }
                            }
                            aE.anchor.locked = false;
                            aE.paint();
                            aI.repaint();
                            aI = null;
                            delete au;
                            delete ab[aN.elementId];
                            delete aN;
                            x.currentlyDragging = false
                        });
                        var aM = b(aE.canvas);
                        q.CurrentLibrary.initDraggable(aM, aL)
                    }
                    var aw = function (aT) {
                            if (aP.isTarget && q.CurrentLibrary.isDropSupported(aD)) {
                                var aQ = aP.dropOptions || x.Defaults.DropOptions || q.Defaults.DropOptions;
                                aQ = q.extend({}, aQ);
                                aQ.scope = aQ.scope || aE.scope;
                                var aW = null;
                                var aU = q.CurrentLibrary.dragEvents.drop;
                                var aV = q.CurrentLibrary.dragEvents.over;
                                var aR = q.CurrentLibrary.dragEvents.out;
                                var aS = function () {
                                        var a5 = b(q.CurrentLibrary.getDragObject(arguments));
                                        var aX = n(a5, "dragId");
                                        var aZ = n(a5, "elId");
                                        var a4 = n(a5, "originalScope");
                                        if (a4) {
                                            q.CurrentLibrary.setDragScope(a5, a4)
                                        }
                                        var a1 = S[aX];
                                        var a2 = a1.floatingAnchorIndex == null ? 1 : a1.floatingAnchorIndex,
                                            a3 = a2 == 0 ? 1 : 0;
                                        if (!aE.isFull() && !(a2 == 0 && !aE.isSource) && !(a2 == 1 && !aE.isTarget)) {
                                            if (a2 == 0) {
                                                a1.source = aD;
                                                a1.sourceId = ax
                                            } else {
                                                a1.target = aD;
                                                a1.targetId = ax
                                            }
                                            a1.endpoints[a2].detachFromConnection(a1);
                                            if (a1.suspendedEndpoint) {
                                                a1.suspendedEndpoint.detachFromConnection(a1)
                                            }
                                            a1.endpoints[a2] = aE;
                                            aE.addConnection(a1);
                                            if (!a1.suspendedEndpoint) {
                                                h(E, a1.scope, a1);
                                                I(aD, aP.draggable, {})
                                            } else {
                                                var a0 = a1.suspendedEndpoint.getElement(),
                                                    aY = a1.suspendedEndpoint.elementId;
                                                x.fireUpdate("jsPlumbConnectionDetached", {
                                                    source: a2 == 0 ? a0 : a1.source,
                                                    target: a2 == 1 ? a0 : a1.target,
                                                    sourceId: a2 == 0 ? aY : a1.sourceId,
                                                    targetId: a2 == 1 ? aY : a1.targetId,
                                                    sourceEndpoint: a2 == 0 ? a1.suspendedEndpoint : a1.endpoints[0],
                                                    targetEndpoint: a2 == 1 ? a1.suspendedEndpoint : a1.endpoints[1],
                                                    connection: a1
                                                })
                                            }
                                            q.repaint(aZ);
                                            x.fireUpdate("jsPlumbConnection", {
                                                source: a1.source,
                                                target: a1.target,
                                                sourceId: a1.sourceId,
                                                targetId: a1.targetId,
                                                sourceEndpoint: a1.endpoints[0],
                                                targetEndpoint: a1.endpoints[1],
                                                connection: a1
                                            })
                                        }
                                        x.currentlyDragging = false;
                                        delete S[aX]
                                    };
                                aQ[aU] = ag(aQ[aU], aS);
                                aQ[aV] = ag(aQ[aV], function () {
                                    var aY = q.CurrentLibrary.getDragObject(arguments);
                                    var a0 = n(b(aY), "dragId");
                                    var aZ = S[a0];
                                    var aX = aZ.floatingAnchorIndex == null ? 1 : aZ.floatingAnchorIndex;
                                    aZ.endpoints[aX].anchor.over(aE.anchor)
                                });
                                aQ[aR] = ag(aQ[aR], function () {
                                    var aY = q.CurrentLibrary.getDragObject(arguments);
                                    var a0 = n(b(aY), "dragId");
                                    var aZ = S[a0];
                                    var aX = aZ.floatingAnchorIndex == null ? 1 : aZ.floatingAnchorIndex;
                                    aZ.endpoints[aX].anchor.out()
                                });
                                q.CurrentLibrary.initDroppable(aT, aQ)
                            }
                        };
                    aw(b(aE.canvas));
                    return aE
                }
        };
    var q = window.jsPlumb = new o();
    q.getInstance = function (s) {
        var r = new o(s);
        return r
    }
})();
(function () {
    var b = !! !document.createElement("canvas").getContext;
    var a = function (c, f, e, d) {
            return function () {
                return jsPlumb.makeAnchor(c, f, e, d)
            }
        };
    jsPlumb.Anchors.TopCenter = a(0.5, 0, 0, -1);
    jsPlumb.Anchors.BottomCenter = a(0.5, 1, 0, 1);
    jsPlumb.Anchors.LeftMiddle = a(0, 0.5, -1, 0);
    jsPlumb.Anchors.RightMiddle = a(1, 0.5, 1, 0);
    jsPlumb.Anchors.Center = a(0.5, 0.5, 0, 0);
    jsPlumb.Anchors.TopRight = a(1, 0, 0, -1);
    jsPlumb.Anchors.BottomRight = a(1, 1, 0, 1);
    jsPlumb.Anchors.TopLeft = a(0, 0, 0, -1);
    jsPlumb.Anchors.BottomLeft = a(0, 1, 0, 1);
    jsPlumb.Defaults.DynamicAnchors = function () {
        return jsPlumb.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"])
    };
    jsPlumb.Anchors.AutoDefault = function () {
        return jsPlumb.makeDynamicAnchor(jsPlumb.Defaults.DynamicAnchors())
    };
    jsPlumb.Connectors.Straight = function () {
        var q = this;
        var k = null;
        var e, l, o, n, m, f, p, h, g, d, c;
        this.compute = function (u, I, E, r, B, t) {
            var H = Math.abs(u[0] - I[0]);
            var A = Math.abs(u[1] - I[1]);
            var C = false,
                v = false;
            var z = 0.45 * H,
                s = 0.45 * A;
            H *= 1.9;
            A *= 1.9;
            var F = Math.min(u[0], I[0]) - z;
            var D = Math.min(u[1], I[1]) - s;
            var G = Math.max(2 * B, t);
            if (H < G) {
                H = G;
                F = u[0] + ((I[0] - u[0]) / 2) - (G / 2);
                z = (H - Math.abs(u[0] - I[0])) / 2
            }
            if (A < G) {
                A = G;
                D = u[1] + ((I[1] - u[1]) / 2) - (G / 2);
                s = (A - Math.abs(u[1] - I[1])) / 2
            }
            h = u[0] < I[0] ? z : H - z;
            g = u[1] < I[1] ? s : A - s;
            d = u[0] < I[0] ? H - z : z;
            c = u[1] < I[1] ? A - s : s;
            k = [F, D, H, A, h, g, d, c];
            n = d - h, m = (c - g);
            e = m / n, l = -1 / e;
            o = -1 * ((e * h) - g);
            f = Math.atan(e);
            p = Math.atan(l);
            return k
        };
        this.paint = function (s, r) {
            r.beginPath();
            r.moveTo(s[4], s[5]);
            r.lineTo(s[6], s[7]);
            r.stroke()
        };
        this.pointOnPath = function (r) {
            var s = h + (r * n);
            var t = (e == Infinity || e == -Infinity) ? g + (r * (c - g)) : (e * s) + o;
            return {
                x: s,
                y: t
            }
        };
        this.gradientAtPoint = function (r) {
            return e
        };
        this.pointAlongPathFrom = function (s, w) {
            var u = q.pointOnPath(s);
            var t = w > 0 ? 1 : -1;
            var v = Math.abs(w * Math.sin(f));
            if (g > c) {
                v = v * -1
            }
            var r = Math.abs(w * Math.cos(f));
            if (h > d) {
                r = r * -1
            }
            return {
                x: u.x + (t * r),
                y: u.y + (t * v)
            }
        };
        this.perpendicularToPathAt = function (u, v, A) {
            var w = q.pointAlongPathFrom(u, A);
            var t = q.gradientAtPoint(w.location);
            var s = Math.atan(-1 / t);
            var z = v / 2 * Math.sin(s);
            var r = v / 2 * Math.cos(s);
            return [{
                x: w.x + r,
                y: w.y + z
            }, {
                x: w.x - r,
                y: w.y - z
            }]
        };
        this.createGradient = function (s, r) {
            return r.createLinearGradient(s[4], s[5], s[6], s[7])
        }
    };
    jsPlumb.Connectors.Bezier = function (g) {
        var r = this;
        this.majorAnchor = 150;
        if (g) {
            if (g.constructor == Number) {
                this.majorAnchor = g
            } else {
                if (g.curviness) {
                    this.majorAnchor = g.curviness
                }
            }
        }
        this.minorAnchor = 10;
        var l = null;
        this._findControlPoint = function (B, s, w, z, t) {
            var y = z.getOrientation(),
                A = t.getOrientation();
            var v = y[0] != A[0] || y[1] == A[1];
            var u = [];
            var C = r.majorAnchor,
                x = r.minorAnchor;
            if (!v) {
                if (y[0] == 0) {
                    u.push(s[0] < w[0] ? B[0] + x : B[0] - x)
                } else {
                    u.push(B[0] - (C * y[0]))
                }
                if (y[1] == 0) {
                    u.push(s[1] < w[1] ? B[1] + x : B[1] - x)
                } else {
                    u.push(B[1] + (C * A[1]))
                }
            } else {
                if (A[0] == 0) {
                    u.push(w[0] < s[0] ? B[0] + x : B[0] - x)
                } else {
                    u.push(B[0] + (C * A[0]))
                }
                if (A[1] == 0) {
                    u.push(w[1] < s[1] ? B[1] + x : B[1] - x)
                } else {
                    u.push(B[1] + (C * y[1]))
                }
            }
            return u
        };
        var q, p, m, d, c, m, h, f, e, o, k;
        this.compute = function (M, v, K, t, s, G) {
            s = s || 0;
            o = Math.abs(M[0] - v[0]) + s;
            k = Math.abs(M[1] - v[1]) + s;
            f = Math.min(M[0], v[0]) - (s / 2);
            e = Math.min(M[1], v[1]) - (s / 2);
            m = M[0] < v[0] ? o - (s / 2) : (s / 2);
            h = M[1] < v[1] ? k - (s / 2) : (s / 2);
            d = M[0] < v[0] ? (s / 2) : o - (s / 2);
            c = M[1] < v[1] ? (s / 2) : k - (s / 2);
            q = r._findControlPoint([m, h], M, v, K, t);
            p = r._findControlPoint([d, c], v, M, t, K);
            var F = Math.min(m, d);
            var E = Math.min(q[0], p[0]);
            var A = Math.min(F, E);
            var L = Math.max(m, d);
            var I = Math.max(q[0], p[0]);
            var x = Math.max(L, I);
            if (x > o) {
                o = x
            }
            if (A < 0) {
                f += A;
                var B = Math.abs(A);
                o += B;
                q[0] += B;
                m += B;
                d += B;
                p[0] += B
            }
            var J = Math.min(h, c);
            var H = Math.min(q[1], p[1]);
            var w = Math.min(J, H);
            var C = Math.max(h, c);
            var z = Math.max(q[1], p[1]);
            var u = Math.max(C, z);
            if (u > k) {
                k = u
            }
            if (w < 0) {
                e += w;
                var y = Math.abs(w);
                k += y;
                q[1] += y;
                h += y;
                c += y;
                p[1] += y
            }
            if (G && o < G) {
                var D = (G - o) / 2;
                o = G;
                f -= D;
                m = m + D;
                d = d + D;
                q[0] = q[0] + D;
                p[0] = p[0] + D
            }
            if (G && k < G) {
                var D = (G - k) / 2;
                k = G;
                e -= D;
                h = h + D;
                c = c + D;
                q[1] = q[1] + D;
                p[1] = p[1] + D
            }
            l = [f, e, o, k, m, h, d, c, q[0], q[1], p[0], p[1]];
            return l
        };
        this.paint = function (t, s) {
            s.beginPath();
            s.moveTo(t[4], t[5]);
            s.bezierCurveTo(t[8], t[9], t[10], t[11], t[6], t[7]);
            s.stroke()
        };
        var n = function () {
                return [{
                    x: m,
                    y: h
                }, {
                    x: q[0],
                    y: q[1]
                }, {
                    x: p[0],
                    y: p[1]
                }, {
                    x: d,
                    y: c
                }]
            };
        this.pointOnPath = function (s) {
            return jsBezier.pointOnCurve(n(), s)
        };
        this.gradientAtPoint = function (s) {
            return jsBezier.gradientAtPoint(n(), s)
        };
        this.pointAlongPathFrom = function (s, t) {
            return jsBezier.pointAlongCurveFrom(n(), s, t)
        };
        this.perpendicularToPathAt = function (s, t, u) {
            return jsBezier.perpendicularToCurveAt(n(), s, t, u)
        };
        this.createGradient = function (u, s, t) {
            return (t) ? s.createLinearGradient(u[4], u[5], u[6], u[7]) : s.createLinearGradient(u[6], u[7], u[4], u[5])
        }
    };
    jsPlumb.Endpoints.Dot = function (h) {
        h = h || {
            radius: 10
        };
        var f = this;
        this.radius = h.radius;
        var g = 0.5 * this.radius;
        var d = this.radius / 3;
        var e = function (k) {
                try {
                    return parseInt(k)
                } catch (l) {
                    if (k.substring(k.length - 1) == "%") {
                        return parseInt(k.substring(0, k - 1))
                    }
                }
            };
        var c = function (m) {
                var k = g;
                var l = d;
                if (m.offset) {
                    k = e(m.offset)
                }
                if (m.innerRadius) {
                    l = e(m.innerRadius)
                }
                return [k, l]
            };
        this.paint = function (z, m, o, n, q) {
            var u = n.radius || f.radius;
            var w = z[0] - u;
            var v = z[1] - u;
            jsPlumb.sizeCanvas(o, w, v, u * 2, u * 2);
            var A = o.getContext("2d");
            var l = jsPlumb.extend({}, n);
            if (l.fillStyle == null) {
                l.fillStyle = q.strokeStyle
            }
            jsPlumb.extend(A, l);
            if (n.gradient && !b) {
                var p = c(n.gradient);
                var s = m[1] == 1 ? p[0] * -1 : p[0];
                var k = m[0] == 1 ? p[0] * -1 : p[0];
                var t = A.createRadialGradient(u, u, u, u + k, u + s, p[1]);
                for (var r = 0; r < n.gradient.stops.length; r++) {
                    t.addColorStop(n.gradient.stops[r][0], n.gradient.stops[r][1])
                }
                A.fillStyle = t
            }
            A.beginPath();
            A.arc(u, u, u, 0, Math.PI * 2, true);
            A.closePath();
            A.fill()
        }
    };
    jsPlumb.Endpoints.Rectangle = function (d) {
        d = d || {
            width: 20,
            height: 20
        };
        var c = this;
        this.width = d.width;
        this.height = d.height;
        this.paint = function (e, l, k, n, p) {
            var s = n.width || c.width;
            var q = n.height || c.height;
            var o = e[0] - (s / 2);
            var m = e[1] - (q / 2);
            jsPlumb.sizeCanvas(k, o, m, s, q);
            var t = k.getContext("2d");
            var v = jsPlumb.extend({}, n);
            if (v.fillStyle == null) {
                v.fillStyle = p.strokeStyle
            }
            jsPlumb.extend(t, v);
            var r = (/MSIE/.test(navigator.userAgent) && !window.opera);
            if (n.gradient && !r) {
                var h = l[1] == 1 ? q : l[1] == 0 ? q / 2 : 0;
                var f = l[1] == -1 ? q : l[1] == 0 ? q / 2 : 0;
                var A = l[0] == 1 ? s : l[0] == 0 ? s / 2 : 0;
                var w = l[0] == -1 ? s : l[0] == 0 ? q / 2 : 0;
                var z = t.createLinearGradient(A, h, w, f);
                for (var u = 0; u < n.gradient.stops.length; u++) {
                    z.addColorStop(n.gradient.stops[u][0], n.gradient.stops[u][1])
                }
                t.fillStyle = z
            }
            t.beginPath();
            t.rect(0, 0, s, q);
            t.closePath();
            t.fill()
        }
    };
    jsPlumb.Endpoints.Triangle = function (d) {
        d = d || {
            width: 55,
            height: 55
        };
        var c = this;
        this.width = d.width;
        this.height = d.height;
        this.paint = function (q, f, h, g, l) {
            var e = g.width || c.width;
            var r = g.height || c.height;
            var p = q[0] - e / 2;
            var o = q[1] - r / 2;
            jsPlumb.sizeCanvas(h, p, o, e, r);
            var s = h.getContext("2d");
            var n = 0,
                m = 0,
                k = 0;
            if (f[0] == 1) {
                n = e;
                m = r;
                k = 180
            }
            if (f[1] == -1) {
                n = e;
                k = 90
            }
            if (f[1] == 1) {
                m = r;
                k = -90
            }
            s.fillStyle = g.fillStyle;
            s.translate(n, m);
            s.rotate(k * Math.PI / 180);
            s.beginPath();
            s.moveTo(0, 0);
            s.lineTo(e / 2, r / 2);
            s.lineTo(0, r);
            s.closePath();
            s.fill()
        }
    };
    jsPlumb.Endpoints.Image = function (f) {
        var c = this;
        this.img = new Image();
        var d = false;
        this.img.onload = function () {
            c.ready = true
        };
        this.img.src = f.src || f.url;
        var e = function (p, h, l, k, m) {
                var g = c.img.width || k.width;
                var q = c.img.height || k.height;
                var o = p[0] - (g / 2);
                var n = p[1] - (q / 2);
                jsPlumb.sizeCanvas(l, o, n, g, q);
                var r = l.getContext("2d");
                r.drawImage(c.img, 0, 0)
            };
        this.paint = function (l, g, h, m, k) {
            if (c.ready) {
                e(l, g, h, m, k)
            } else {
                window.setTimeout(function () {
                    c.paint(l, g, h, m, k)
                }, 200)
            }
        }
    };
    jsPlumb.Overlays.Arrow = function (h) {
        h = h || {};
        var d = this;
        this.length = h.length || 20;
        this.width = h.width || 20;
        this.connection = h.connection;
        var g = (h.direction || 1) < 0 ? -1 : 1;
        var e = h.paintStyle || {
            lineWidth: 1
        };
        this.loc = h.location == null ? 0.5 : h.location;
        var c = h.foldback || 0.623;
        var f = function (k, m) {
                if (c == 0.5) {
                    return k.pointOnPath(m)
                } else {
                    var l = 0.5 - c;
                    return k.pointAlongPathFrom(m, g * d.length * l)
                }
            };
        this.computeMaxSize = function () {
            return d.width * 1.5
        };
        this.draw = function (m, z, y) {
            var r = m.pointAlongPathFrom(d.loc, g * (d.length / 2));
            var k = m.pointAlongPathFrom(d.loc, -1 * g * (d.length / 2)),
                o = k.x,
                n = k.y;
            var s = m.perpendicularToPathAt(d.loc, d.width, -1 * g * (d.length / 2));
            var q = f(m, d.loc);
            if (d.loc == 1) {
                var p = m.pointOnPath(d.loc);
                var A = p.x - r.x,
                    x = p.y - r.y;
                q.x += A;
                q.y += x;
                k.x += A;
                k.y += x;
                s[0].x += A;
                s[0].y += x;
                s[1].x += A;
                s[1].y += x;
                r.x += A;
                r.y += x
            }
            if (d.loc == 0) {
                var p = m.pointOnPath(d.loc);
                var l = c > 1 ? q : {
                    x: s[0].x + ((s[1].x - s[0].x) / 2),
                    y: s[0].y + ((s[1].y - s[0].y) / 2)
                };
                var A = p.x - l.x,
                    x = p.y - l.y;
                q.x += A;
                q.y += x;
                k.x += A;
                k.y += x;
                s[0].x += A;
                s[0].y += x;
                s[1].x += A;
                s[1].y += x;
                r.x += A;
                r.y += x
            }
            var w = Math.min(r.x, s[0].x, s[1].x);
            var u = Math.max(r.x, s[0].x, s[1].x);
            var v = Math.min(r.y, s[0].y, s[1].y);
            var t = Math.max(r.y, s[0].y, s[1].y);
            z.lineWidth = e.lineWidth;
            z.beginPath();
            z.moveTo(r.x, r.y);
            z.lineTo(s[0].x, s[0].y);
            z.lineTo(q.x, q.y);
            z.lineTo(s[1].x, s[1].y);
            z.lineTo(r.x, r.y);
            z.closePath();
            if (e.strokeStyle) {
                z.strokeStyle = e.strokeStyle;
                z.stroke()
            }
            z.fillStyle = e.fillStyle || y.strokeStyle;
            z.fill();
            return [w, u, v, t]
        }
    };
    jsPlumb.Overlays.PlainArrow = function (d) {
        d = d || {};
        var c = jsPlumb.extend(d, {
            foldback: 1
        });
        jsPlumb.Overlays.Arrow.call(this, c)
    };
    jsPlumb.Overlays.Diamond = function (e) {
        e = e || {};
        var c = e.length || 40;
        var d = jsPlumb.extend(e, {
            length: c / 2,
            foldback: 2
        });
        jsPlumb.Overlays.Arrow.call(this, d)
    };
    jsPlumb.Overlays.Label = function (l) {
        this.labelStyle = l.labelStyle || jsPlumb.Defaults.LabelStyle;
        this.label = l.label;
        this.connection = l.connection;
        var d = this;
        var c = null,
            k = null,
            f = null,
            g = null;
        this.location = l.location || 0.5;
        this.cachedDimensions = null;
        var h = function (n) {
                if (d.cachedDimensions) {
                    return d.cachedDimensions
                }
                f = typeof d.label == "function" ? d.label(d) : d.label;
                var r = {};
                if (f) {
                    var m = f.split(/\n|\r\n/);
                    n.save();
                    if (d.labelStyle.font) {
                        n.font = d.labelStyle.font
                    }
                    var o = e(m, n);
                    var p = n.measureText("M").width;
                    g = d.labelStyle.padding || 0.25;
                    c = o + (2 * o * g);
                    k = (m.length * p) + (2 * p * g);
                    var q = m.length * p;
                    n.restore();
                    r = {
                        width: c,
                        height: k,
                        lines: m,
                        oneLine: p,
                        padding: g,
                        textHeight: q
                    }
                }
                if (typeof d.label != "function") {
                    d.cachedDimensions = r
                }
                return r
            };
        this.computeMaxSize = function (n, m) {
            var o = h(m);
            return o.width ? Math.max(o.width, o.height) * 1.5 : 0
        };
        var e = function (o, n) {
                var m = 0;
                for (var q = 0; q < o.length; q++) {
                    var p = n.measureText(o[q]).width;
                    if (p > m) {
                        m = p
                    }
                }
                return m
            };
        this.draw = function (p, o, q) {
            var s = h(o);
            if (s.width) {
                var r = p.pointOnPath(d.location);
                if (d.labelStyle.font) {
                    o.font = d.labelStyle.font
                }
                if (d.labelStyle.fillStyle) {
                    o.fillStyle = d.labelStyle.fillStyle
                } else {
                    o.fillStyle = "rgba(0,0,0,0)"
                }
                var n = r.x - (s.width / 2);
                var m = r.y - (s.height / 2);
                o.fillRect(n, m, s.width, s.height);
                if (d.labelStyle.color) {
                    o.fillStyle = d.labelStyle.color
                }
                o.textBaseline = "middle";
                o.textAlign = "center";
                for (i = 0; i < s.lines.length; i++) {
                    o.fillText(s.lines[i], r.x, r.y - (s.textHeight / 2) + (s.oneLine / 2) + (i * s.oneLine))
                }
                if (d.labelStyle.borderWidth > 0) {
                    o.strokeStyle = d.labelStyle.borderStyle || "black";
                    o.strokeRect(n, m, s.width, s.height)
                }
                return [n, n + s.width, m, m + s.height]
            } else {
                return [0, 0, 0, 0]
            }
        }
    };
    jsPlumb.Overlays.Image = function (e) {
        var l = this;
        this.location = e.location || 0.5;
        this.img = new Image();
        this.connection = e.connection;
        var m = null;
        var f = null;
        var d, c;
        var k = e.events || {};
        var h = function () {
                if (l.ready) {
                    window.clearInterval(f);
                    m = document.createElement("img");
                    m.src = l.img.src;
                    m.style.position = "absolute";
                    m.style.display = "none";
                    m.className = "_jsPlumb_overlay";
                    document.body.appendChild(m);
                    for (var n in k) {
                        jsPlumb.CurrentLibrary.bind(m, n, k[n])
                    }
                    if (d && c) {
                        g(d, c);
                        c = null;
                        d = null
                    }
                }
            };
        this.img.onload = function () {
            l.ready = true
        };
        this.img.src = e.src || e.url;
        f = window.setInterval(h, 250);
        this.computeMaxSize = function (o, n) {
            return [l.img.width, l.img.height]
        };
        var g = function (q, v, u) {
                if (m != null) {
                    var r = q.pointOnPath(l.location);
                    var p = jsPlumb.CurrentLibrary.getElementObject(v.canvas);
                    var w = jsPlumb.CurrentLibrary.getOffset(p);
                    var t = r.x - (l.img.width / 2);
                    var s = r.y - (l.img.height / 2);
                    var n = {
                        left: w.left + t,
                        top: w.top + s
                    };
                    jsPlumb.CurrentLibrary.setOffset(m, n);
                    m.style.display = "block";
                    return [t, t + l.img.width, s, s + l.img.height]
                }
            };
        this.draw = function (o, n) {
            if (l.ready) {
                return g(o, n)
            } else {
                d = o;
                c = n;
                return [0, 0, 0, 0]
            }
        }
    }
})();
(function () {
    jsPlumb.Connectors.Flowchart = function (f) {
        f = f || {};
        var o = this,
            b = f.minStubLength || 30,
            k = [],
            h = [],
            m = [],
            g = [],
            a = [],
            n = [],
            d, c, q = function (u, t, B, A) {
                var y = 0;
                for (var s = 0; s < k.length; s++) {
                    var z = s == 0 ? u : k[s][2],
                        x = s == 0 ? t : k[s][3],
                        w = k[s][0],
                        v = k[s][1];
                    h[s] = z == w ? Infinity : 0;
                    g[s] = Math.abs(z == w ? v - x : w - z);
                    y += g[s]
                }
                var r = 0;
                for (var s = 0; s < k.length; s++) {
                    a[s] = g[s] / y;
                    m[s] = [r, (r += (g[s] / y))]
                }
            },
            p = function () {
                n.push(k.length);
                for (var r = 0; r < k.length; r++) {
                    n.push(k[r][0]);
                    n.push(k[r][1])
                }
            },
            e = function (s, A, z, w, t, r) {
                var v = k.length == 0 ? z : k[k.length - 1][0];
                var u = k.length == 0 ? w : k[k.length - 1][1];
                k.push([s, A, v, u])
            },
            l = function (t) {
                var r = m.length - 1,
                    s = 0;
                for (var u = 0; u < m.length; u++) {
                    if (m[u][1] >= t) {
                        r = u;
                        s = (t - m[u][0]) / a[u];
                        break
                    }
                }
                return {
                    segment: k[r],
                    proportion: s,
                    index: r
                }
            };
        this.compute = function (u, J, F, r, C, s) {
            k = [];
            h = [];
            a = [];
            g = [];
            segmentProportionals = [];
            d = J[0] < u[0];
            c = J[1] < u[1];
            var v = C || 1,
                B = (v / 2) + (b * 2),
                A = (v / 2) + (b * 2),
                t = F.orientation || F.getOrientation(),
                I = r.orientation || r.getOrientation(),
                G = d ? J[0] : u[0],
                E = c ? J[1] : u[1],
                H = Math.abs(J[0] - u[0]) + 2 * B,
                z = Math.abs(J[1] - u[1]) + 2 * A;
            if (H < s) {
                B += (s - H) / 2;
                H = s
            }
            if (z < s) {
                A += (s - z) / 2;
                z = s
            }
            sx = d ? H - B : B, sy = c ? z - A : A, tx = d ? B : H - B, ty = c ? A : z - A, startStubX = sx + (t[0] * b), startStubY = sy + (t[1] * b), endStubX = tx + (I[0] * b), endStubY = ty + (I[1] * b), midx = startStubX + ((endStubX - startStubX) / 2), midy = startStubY + ((endStubY - startStubY) / 2);
            G -= B;
            E -= A;
            n = [G, E, H, z, sx, sy, tx, ty], extraPoints = [];
            e(startStubX, startStubY, sx, sy, tx, ty);
            if (t[0] == 0) {
                var D = startStubY < endStubY;
                if (D) {
                    e(startStubX, midy, sx, sy, tx, ty);
                    e(midx, midy, sx, sy, tx, ty);
                    e(endStubX, midy, sx, sy, tx, ty)
                } else {
                    e(midx, startStubY, sx, sy, tx, ty);
                    e(midx, endStubY, sx, sy, tx, ty)
                }
            } else {
                var D = startStubX < endStubX;
                if (D) {
                    e(midx, startStubY, sx, sy, tx, ty);
                    e(midx, midy, sx, sy, tx, ty);
                    e(midx, endStubY, sx, sy, tx, ty)
                } else {
                    e(startStubX, midy, sx, sy, tx, ty);
                    e(endStubX, midy, sx, sy, tx, ty)
                }
            }
            e(endStubX, endStubY, sx, sy, tx, ty);
            e(tx, ty, sx, sy, tx, ty);
            p();
            q(sx, sy, tx, ty);
            return n
        };
        this.paint = function (t, r) {
            r.beginPath();
            r.moveTo(t[4], t[5]);
            for (var s = 0; s < t[8]; s++) {
                r.lineTo(t[9 + (s * 2)], t[10 + (s * 2)])
            }
            r.lineTo(t[6], t[7]);
            r.stroke()
        };
        this.pointOnPath = function (r) {
            return o.pointAlongPathFrom(r, 0)
        };
        this.gradientAtPoint = function (r) {
            return h[l(r)["index"]]
        };
        this.pointAlongPathFrom = function (v, z) {
            var w = l(v),
                u = w.segment,
                y = w.proportion,
                t = g[w.index],
                r = h[w.index];
            var x = {
                x: r == Infinity ? u[2] : u[2] > u[0] ? u[0] + ((1 - y) * t) - z : u[2] + (y * t) + z,
                y: r == 0 ? u[3] : u[3] > u[1] ? u[1] + ((1 - y) * t) - z : u[3] + (y * t) + z,
                segmentInfo: w
            };
            return x
        };
        this.perpendicularToPathAt = function (u, v, A) {
            var w = o.pointAlongPathFrom(u, A);
            var t = h[w.segmentInfo.index];
            var s = Math.atan(-1 / t);
            var z = v / 2 * Math.sin(s);
            var r = v / 2 * Math.cos(s);
            return [{
                x: w.x + r,
                y: w.y + z
            }, {
                x: w.x - r,
                y: w.y - z
            }]
        }
    }
})();
(function (a) {
    jsPlumb.CurrentLibrary = {
        addClass: function (c, b) {
            c.addClass(b)
        },
        animate: function (d, c, b) {
            d.animate(c, b)
        },
        appendElement: function (c, b) {
            jsPlumb.CurrentLibrary.getElementObject(b).append(c)
        },
        bind: function (b, c, d) {
            b = jsPlumb.CurrentLibrary.getElementObject(b);
            b.bind(c, d)
        },
        dragEvents: {
            start: "start",
            stop: "stop",
            drag: "drag",
            step: "step",
            over: "over",
            out: "out",
            drop: "drop",
            complete: "complete"
        },
        extend: function (c, b) {
            return a.extend(c, b)
        },
        getAttribute: function (b, c) {
            return b.attr(c)
        },
        getDocumentElement: function () {
            return document
        },
        getDragObject: function (b) {
            return b[1].draggable
        },
        getDragScope: function (b) {
            return b.draggable("option", "scope")
        },
        getElementObject: function (b) {
            return typeof (b) == "string" ? a("#" + b) : a(b)
        },
        getOffset: function (b) {
            return b.offset()
        },
        getPageXY: function (b) {
            return [b.pageX, b.pageY]
        },
        getScrollLeft: function (b) {
            return b.scrollLeft()
        },
        getScrollTop: function (b) {
            return b.scrollTop()
        },
        getSize: function (b) {
            return [b.outerWidth(), b.outerHeight()]
        },
        getUIPosition: function (c) {
            var d = c[1],
                b = d.offset;
            return b || d.absolutePosition
        },
        hasClass: function (c, b) {
            return c.hasClass(b)
        },
        initDraggable: function (c, b) {
            b.helper = null;
            b.scope = b.scope || jsPlumb.Defaults.Scope;
            c.draggable(b)
        },
        initDroppable: function (c, b) {
            b.scope = b.scope || jsPlumb.Defaults.Scope;
            c.droppable(b)
        },
        isAlreadyDraggable: function (b) {
            b = jsPlumb.CurrentLibrary.getElementObject(b);
            return b.hasClass("ui-draggable")
        },
        isDragSupported: function (c, b) {
            return c.draggable
        },
        isDropSupported: function (c, b) {
            return c.droppable
        },
        removeClass: function (c, b) {
            c.removeClass(b)
        },
        removeElement: function (b, c) {
            jsPlumb.CurrentLibrary.getElementObject(b).remove()
        },
        setAttribute: function (c, d, b) {
            c.attr(d, b)
        },
        setDraggable: function (c, b) {
            c.draggable("option", "disabled", !b)
        },
        setDragScope: function (c, b) {
            c.draggable("option", "scope", b)
        },
        setOffset: function (b, c) {
            jsPlumb.CurrentLibrary.getElementObject(b).offset(c)
        }
    };
    a(document).ready(jsPlumb.init)
})(jQuery);
(function () {
    if (typeof Math.sgn == "undefined") {
        Math.sgn = function (m) {
            return m == 0 ? 0 : m > 0 ? 1 : -1
        }
    }
    var b = {
        subtract: function (n, m) {
            return {
                x: n.x - m.x,
                y: n.y - m.y
            }
        },
        dotProduct: function (n, m) {
            return n.x * m.x + n.y * m.y
        },
        square: function (m) {
            return Math.sqrt(m.x * m.x + m.y * m.y)
        },
        scale: function (n, m) {
            return {
                x: n.x * m,
                y: n.y * m
            }
        }
    },
        d = Math.pow(2, -65),
        h = function (y, x) {
            for (var s = [], v = x.length - 1, r = 2 * v - 1, t = [], w = [], o = [], p = [], q = [
                [1, 0.6, 0.3, 0.1],
                [0.4, 0.6, 0.6, 0.4],
                [0.1, 0.3, 0.6, 1]
            ], u = 0; u <= v; u++) {
                t[u] = b.subtract(x[u], y)
            }
            for (u = 0; u <= v - 1; u++) {
                w[u] = b.subtract(x[u + 1], x[u]);
                w[u] = b.scale(w[u], 3)
            }
            for (u = 0; u <= v - 1; u++) {
                for (var n = 0; n <= v; n++) {
                    o[u] || (o[u] = []);
                    o[u][n] = b.dotProduct(w[u], t[n])
                }
            }
            for (u = 0; u <= r; u++) {
                p[u] || (p[u] = []);
                p[u].y = 0;
                p[u].x = parseFloat(u) / r
            }
            r = v - 1;
            for (t = 0; t <= v + r; t++) {
                w = Math.min(t, v);
                for (u = Math.max(0, t - r); u <= w; u++) {
                    j = t - u;
                    p[u + j].y += o[j][u] * q[j][u]
                }
            }
            v = x.length - 1;
            p = l(p, 2 * v - 1, s, 0);
            r = b.subtract(y, x[0]);
            o = b.square(r);
            for (u = q = 0; u < p; u++) {
                r = b.subtract(y, k(x, v, s[u], null, null));
                r = b.square(r);
                if (r < o) {
                    o = r;
                    q = s[u]
                }
            }
            r = b.subtract(y, x[v]);
            r = b.square(r);
            if (r < o) {
                o = r;
                q = 1
            }
            return {
                location: q,
                distance: o
            }
        },
        l = function (E, D, y, B) {
            var x = [],
                z = [],
                C = [],
                u = [],
                v = 0,
                w, A;
            A = Math.sgn(E[0].y);
            for (var t = 1; t <= D; t++) {
                w = Math.sgn(E[t].y);
                w != A && v++;
                A = w
            }
            switch (v) {
            case 0:
                return 0;
            case 1:
                if (B >= 64) {
                    y[0] = (E[0].x + E[D].x) / 2;
                    return 1
                }
                var s, r, p;
                v = E[0].y - E[D].y;
                w = E[D].x - E[0].x;
                A = E[0].x * E[D].y - E[D].x * E[0].y;
                t = max_distance_below = 0;
                for (r = 1; r < D; r++) {
                    p = v * E[r].x + w * E[r].y + A;
                    if (p > t) {
                        t = p
                    } else {
                        if (p < max_distance_below) {
                            max_distance_below = p
                        }
                    }
                }
                s = v;
                r = w;
                p = A - t;
                s = 0 * r - s * 1;
                s = 1 / s;
                t = (1 * p - r * 0) * s;
                s = v;
                r = w;
                p = A - max_distance_below;
                s = 0 * r - s * 1;
                s = 1 / s;
                v = (1 * p - r * 0) * s;
                if (Math.max(t, v) - Math.min(t, v) < d ? 1 : 0) {
                    C = E[D].x - E[0].x;
                    u = E[D].y - E[0].y;
                    y[0] = 0 + 1 * (C * (E[0].y - 0) - u * (E[0].x - 0)) * (1 / (C * 0 - u * 1));
                    return 1
                }
            }
            k(E, D, 0.5, x, z);
            E = l(x, D, C, B + 1);
            D = l(z, D, u, B + 1);
            for (B = 0; B < E; B++) {
                y[B] = C[B]
            }
            for (B = 0; B < D; B++) {
                y[B + E] = u[B]
            }
            return E + D
        },
        k = function (n, m, p, r, o) {
            for (var q = [
                []
            ], s = 0; s <= m; s++) {
                q[0][s] = n[s]
            }
            for (n = 1; n <= m; n++) {
                for (s = 0; s <= m - n; s++) {
                    q[n] || (q[n] = []);
                    q[n][s] || (q[n][s] = {});
                    q[n][s].x = (1 - p) * q[n - 1][s].x + p * q[n - 1][s + 1].x;
                    q[n][s].y = (1 - p) * q[n - 1][s].y + p * q[n - 1][s + 1].y
                }
            }
            if (r != null) {
                for (s = 0; s <= m; s++) {
                    r[s] = q[s][0]
                }
            }
            if (o != null) {
                for (s = 0; s <= m; s++) {
                    o[s] = q[m - s][s]
                }
            }
            return q[m][0]
        },
        g = {},
        c = function (u) {
            var t = g[u];
            if (!t) {
                t = [];
                var p = function (v) {
                        return function () {
                            return v
                        }
                    },
                    r = function () {
                        return function (v) {
                            return v
                        }
                    },
                    o = function () {
                        return function (v) {
                            return 1 - v
                        }
                    },
                    q = function (v) {
                        return function (x) {
                            for (var w = 1, y = 0; y < v.length; y++) {
                                w *= v[y](x)
                            }
                            return w
                        }
                    };
                t.push(new function () {
                    return function (v) {
                        return Math.pow(v, u)
                    }
                });
                for (var s = 1; s < u; s++) {
                    for (var m = [new p(u)], n = 0; n < u - s; n++) {
                        m.push(new r)
                    }
                    for (n = 0; n < s; n++) {
                        m.push(new o)
                    }
                    t.push(new q(m))
                }
                t.push(new function () {
                    return function (v) {
                        return Math.pow(1 - v, u)
                    }
                });
                g[u] = t
            }
            return t
        },
        a = function (n, m) {
            for (var p = c(n.length - 1), r = 0, o = 0, q = 0; q < n.length; q++) {
                r += n[q].x * p[q](m);
                o += n[q].y * p[q](m)
            }
            return {
                x: r,
                y: o
            }
        },
        f = function (n, m, p) {
            var r = a(n, m),
                o = 0;
            m = m;
            for (var q = p > 0 ? 1 : -1, s = null; o < Math.abs(p);) {
                m += 0.005 * q;
                s = a(n, m);
                o += Math.sqrt(Math.pow(s.x - r.x, 2) + Math.pow(s.y - r.y, 2));
                r = s
            }
            return {
                point: s,
                location: m
            }
        },
        e = function (n, m) {
            var o = a(n, m),
                p = a(n.slice(0, n.length - 1), m);
            return Math.atan((p.y - o.y) / (p.x - o.x))
        };
    window.jsBezier = {
        distanceFromCurve: h,
        gradientAtPoint: e,
        nearestPointOnCurve: function (n, m) {
            var o = h(n, m);
            return {
                point: k(m, m.length - 1, o.location, null, null),
                location: o.location
            }
        },
        pointOnCurve: a,
        pointAlongCurveFrom: function (n, m, o) {
            return f(n, m, o).point
        },
        perpendicularToCurveAt: function (n, m, o, p) {
            p = p == null ? 0 : p;
            m = f(n, m, p);
            n = e(n, m.location);
            p = Math.atan(-1 / n);
            n = o / 2 * Math.sin(p);
            o = o / 2 * Math.cos(p);
            return [{
                x: m.point.x + o,
                y: m.point.y + n
            }, {
                x: m.point.x - o,
                y: m.point.y - n
            }]
        }
    }
})();