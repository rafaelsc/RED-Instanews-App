"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var jQuery = require("jquery");
var nyt;
(function (nyt_1) {
    var api;
    (function (api_1) {
        var nyt;
        (function (nyt) {
            var api;
            (function (api) {
                var topstores;
                (function (topstores) {
                    var Client = (function () {
                        function Client(baseUrl) {
                            this.beforeSend = undefined;
                            this.jsonParseReviver = undefined;
                            this.baseUrl = baseUrl ? baseUrl : "http://api.nytimes.com/svc/topstories/v2";
                        }
                        Client.prototype.topStories = function (section, format, callback, onSuccess, onFail) {
                            var _this = this;
                            var url_ = this.baseUrl + "/{section}.{format}?";
                            if (section === undefined || section === null)
                                throw new Error("The parameter 'section' must be defined.");
                            url_ = url_.replace("{section}", encodeURIComponent("" + section));
                            if (format === undefined || format === null)
                                throw new Error("The parameter 'format' must be defined.");
                            url_ = url_.replace("{format}", encodeURIComponent("" + format));
                            if (callback !== undefined)
                                url_ += "callback=" + encodeURIComponent("" + callback) + "&";
                            url_ = url_.replace(/[?&]$/, "");
                            var jqXhr = jQuery.ajax({
                                url: url_,
                                beforeSend: this.beforeSend,
                                type: "get",
                                dataType: "text",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json"
                                }
                            });
                            jqXhr.done(function (_data, _textStatus, xhr) {
                                _this.processTopStoriesWithCallbacks(url_, xhr, onSuccess, onFail);
                            }).fail(function (xhr) {
                                _this.processTopStoriesWithCallbacks(url_, xhr, onSuccess, onFail);
                            });
                            return jqXhr;
                        };
                        Client.prototype.processTopStoriesWithCallbacks = function (_url, xhr, onSuccess, onFail) {
                            try {
                                var result = this.processTopStories(xhr);
                                if (onSuccess !== undefined)
                                    onSuccess(result);
                            }
                            catch (e) {
                                if (onFail !== undefined)
                                    onFail(e, "http_service_exception");
                            }
                        };
                        Client.prototype.processTopStories = function (xhr) {
                            var status = xhr.status;
                            var _headers = {};
                            if (status === 200) {
                                var _responseText = xhr.responseText;
                                var result200 = null;
                                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                                result200 = resultData200 ? Anonymous.fromJS(resultData200) : new Anonymous();
                                return result200;
                            }
                            else if (status !== 200 && status !== 204) {
                                var _responseText = xhr.responseText;
                                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
                            }
                            return null;
                        };
                        return Client;
                    }());
                    topstores.Client = Client;
                    var Article = (function () {
                        function Article(data) {
                            if (data) {
                                for (var property in data) {
                                    if (data.hasOwnProperty(property))
                                        this[property] = data[property];
                                }
                            }
                        }
                        Article.prototype.init = function (data) {
                            if (data) {
                                this.section = data["section"];
                                this.subsection = data["subsection"];
                                this.title = data["title"];
                                this.abstract = data["abstract"];
                                this.url = data["url"];
                                this.thumbnail_standard = data["thumbnail_standard"];
                                this.short_url = data["short_url"];
                                this.byline = data["byline"];
                                this.item_type = data["item_type"];
                                this.updated_date = data["updated_date"];
                                this.created_date = data["created_date"];
                                this.published_date = data["published_date"];
                                this.material_type_facet = data["material_type_facet"];
                                this.kicker = data["kicker"];
                                if (data["des_facet"] && data["des_facet"].constructor === Array) {
                                    this.des_facet = [];
                                    for (var _i = 0, _a = data["des_facet"]; _i < _a.length; _i++) {
                                        var item = _a[_i];
                                        this.des_facet.push(item);
                                    }
                                }
                                if (data["org_facet"] && data["org_facet"].constructor === Array) {
                                    this.org_facet = [];
                                    for (var _b = 0, _c = data["org_facet"]; _b < _c.length; _b++) {
                                        var item = _c[_b];
                                        this.org_facet.push(item);
                                    }
                                }
                                if (data["per_facet"] && data["per_facet"].constructor === Array) {
                                    this.per_facet = [];
                                    for (var _d = 0, _e = data["per_facet"]; _d < _e.length; _d++) {
                                        var item = _e[_d];
                                        this.per_facet.push(item);
                                    }
                                }
                                if (data["geo_facet"] && data["geo_facet"].constructor === Array) {
                                    this.geo_facet = [];
                                    for (var _f = 0, _g = data["geo_facet"]; _f < _g.length; _f++) {
                                        var item = _g[_f];
                                        this.geo_facet.push(item);
                                    }
                                }
                                if (data["multimedia"] && data["multimedia"].constructor === Array) {
                                    this.multimedia = [];
                                    for (var _h = 0, _j = data["multimedia"]; _h < _j.length; _h++) {
                                        var item = _j[_h];
                                        this.multimedia.push(Multimedia.fromJS(item));
                                    }
                                }
                                if (data["related_urls"] && data["related_urls"].constructor === Array) {
                                    this.related_urls = [];
                                    for (var _k = 0, _l = data["related_urls"]; _k < _l.length; _k++) {
                                        var item = _l[_k];
                                        this.related_urls.push(Related_urls.fromJS(item));
                                    }
                                }
                            }
                        };
                        Article.fromJS = function (data) {
                            data = typeof data === 'object' ? data : {};
                            var result = new Article();
                            result.init(data);
                            return result;
                        };
                        Article.prototype.toJSON = function (data) {
                            data = typeof data === 'object' ? data : {};
                            data["section"] = this.section;
                            data["subsection"] = this.subsection;
                            data["title"] = this.title;
                            data["abstract"] = this.abstract;
                            data["url"] = this.url;
                            data["thumbnail_standard"] = this.thumbnail_standard;
                            data["short_url"] = this.short_url;
                            data["byline"] = this.byline;
                            data["item_type"] = this.item_type;
                            data["updated_date"] = this.updated_date;
                            data["created_date"] = this.created_date;
                            data["published_date"] = this.published_date;
                            data["material_type_facet"] = this.material_type_facet;
                            data["kicker"] = this.kicker;
                            if (this.des_facet && this.des_facet.constructor === Array) {
                                data["des_facet"] = [];
                                for (var _i = 0, _a = this.des_facet; _i < _a.length; _i++) {
                                    var item = _a[_i];
                                    data["des_facet"].push(item);
                                }
                            }
                            if (this.org_facet && this.org_facet.constructor === Array) {
                                data["org_facet"] = [];
                                for (var _b = 0, _c = this.org_facet; _b < _c.length; _b++) {
                                    var item = _c[_b];
                                    data["org_facet"].push(item);
                                }
                            }
                            if (this.per_facet && this.per_facet.constructor === Array) {
                                data["per_facet"] = [];
                                for (var _d = 0, _e = this.per_facet; _d < _e.length; _d++) {
                                    var item = _e[_d];
                                    data["per_facet"].push(item);
                                }
                            }
                            if (this.geo_facet && this.geo_facet.constructor === Array) {
                                data["geo_facet"] = [];
                                for (var _f = 0, _g = this.geo_facet; _f < _g.length; _f++) {
                                    var item = _g[_f];
                                    data["geo_facet"].push(item);
                                }
                            }
                            if (this.multimedia && this.multimedia.constructor === Array) {
                                data["multimedia"] = [];
                                for (var _h = 0, _j = this.multimedia; _h < _j.length; _h++) {
                                    var item = _j[_h];
                                    data["multimedia"].push(item.toJSON());
                                }
                            }
                            if (this.related_urls && this.related_urls.constructor === Array) {
                                data["related_urls"] = [];
                                for (var _k = 0, _l = this.related_urls; _k < _l.length; _k++) {
                                    var item = _l[_k];
                                    data["related_urls"].push(item.toJSON());
                                }
                            }
                            return data;
                        };
                        return Article;
                    }());
                    topstores.Article = Article;
                    var Section;
                    (function (Section) {
                        Section[Section["Home"] = "home"] = "Home";
                        Section[Section["Opinion"] = "opinion"] = "Opinion";
                        Section[Section["World"] = "world"] = "World";
                        Section[Section["National"] = "national"] = "National";
                        Section[Section["Politics"] = "politics"] = "Politics";
                        Section[Section["Upshot"] = "upshot"] = "Upshot";
                        Section[Section["Nyregion"] = "nyregion"] = "Nyregion";
                        Section[Section["Business"] = "business"] = "Business";
                        Section[Section["Technology"] = "technology"] = "Technology";
                        Section[Section["Science"] = "science"] = "Science";
                        Section[Section["Health"] = "health"] = "Health";
                        Section[Section["Sports"] = "sports"] = "Sports";
                        Section[Section["Arts"] = "arts"] = "Arts";
                        Section[Section["Books"] = "books"] = "Books";
                        Section[Section["Movies"] = "movies"] = "Movies";
                        Section[Section["Theater"] = "theater"] = "Theater";
                        Section[Section["Sundayreview"] = "sundayreview"] = "Sundayreview";
                        Section[Section["Fashion"] = "fashion"] = "Fashion";
                        Section[Section["Tmagazine"] = "tmagazine"] = "Tmagazine";
                        Section[Section["Food"] = "food"] = "Food";
                        Section[Section["Travel"] = "travel"] = "Travel";
                        Section[Section["Magazine"] = "magazine"] = "Magazine";
                        Section[Section["Realestate"] = "realestate"] = "Realestate";
                        Section[Section["Automobiles"] = "automobiles"] = "Automobiles";
                        Section[Section["Obituaries"] = "obituaries"] = "Obituaries";
                        Section[Section["Insider"] = "insider"] = "Insider";
                    })(Section = topstores.Section || (topstores.Section = {}));
                    var Format;
                    (function (Format) {
                        Format[Format["Json"] = "json"] = "Json";
                        Format[Format["Jsonp"] = "jsonp"] = "Jsonp";
                    })(Format = topstores.Format || (topstores.Format = {}));
                    var Anonymous = (function () {
                        function Anonymous(data) {
                            if (data) {
                                for (var property in data) {
                                    if (data.hasOwnProperty(property))
                                        this[property] = data[property];
                                }
                            }
                        }
                        Anonymous.prototype.init = function (data) {
                            if (data) {
                                if (data["results"] && data["results"].constructor === Array) {
                                    this.results = [];
                                    for (var _i = 0, _a = data["results"]; _i < _a.length; _i++) {
                                        var item = _a[_i];
                                        this.results.push(Article.fromJS(item));
                                    }
                                }
                            }
                        };
                        Anonymous.fromJS = function (data) {
                            data = typeof data === 'object' ? data : {};
                            var result = new Anonymous();
                            result.init(data);
                            return result;
                        };
                        Anonymous.prototype.toJSON = function (data) {
                            data = typeof data === 'object' ? data : {};
                            if (this.results && this.results.constructor === Array) {
                                data["results"] = [];
                                for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
                                    var item = _a[_i];
                                    data["results"].push(item.toJSON());
                                }
                            }
                            return data;
                        };
                        return Anonymous;
                    }());
                    topstores.Anonymous = Anonymous;
                    var Multimedia = (function () {
                        function Multimedia(data) {
                            if (data) {
                                for (var property in data) {
                                    if (data.hasOwnProperty(property))
                                        this[property] = data[property];
                                }
                            }
                        }
                        Multimedia.prototype.init = function (data) {
                            if (data) {
                                this.url = data["url"];
                                this.format = data["format"];
                                this.height = data["height"];
                                this.width = data["width"];
                                this.type = data["type"];
                                this.subtype = data["subtype"];
                                this.caption = data["caption"];
                                this.copyright = data["copyright"];
                            }
                        };
                        Multimedia.fromJS = function (data) {
                            data = typeof data === 'object' ? data : {};
                            var result = new Multimedia();
                            result.init(data);
                            return result;
                        };
                        Multimedia.prototype.toJSON = function (data) {
                            data = typeof data === 'object' ? data : {};
                            data["url"] = this.url;
                            data["format"] = this.format;
                            data["height"] = this.height;
                            data["width"] = this.width;
                            data["type"] = this.type;
                            data["subtype"] = this.subtype;
                            data["caption"] = this.caption;
                            data["copyright"] = this.copyright;
                            return data;
                        };
                        return Multimedia;
                    }());
                    topstores.Multimedia = Multimedia;
                    var Related_urls = (function () {
                        function Related_urls(data) {
                            if (data) {
                                for (var property in data) {
                                    if (data.hasOwnProperty(property))
                                        this[property] = data[property];
                                }
                            }
                        }
                        Related_urls.prototype.init = function (data) {
                            if (data) {
                                this.suggested_link_text = data["suggested_link_text"];
                                this.url = data["url"];
                            }
                        };
                        Related_urls.fromJS = function (data) {
                            data = typeof data === 'object' ? data : {};
                            var result = new Related_urls();
                            result.init(data);
                            return result;
                        };
                        Related_urls.prototype.toJSON = function (data) {
                            data = typeof data === 'object' ? data : {};
                            data["suggested_link_text"] = this.suggested_link_text;
                            data["url"] = this.url;
                            return data;
                        };
                        return Related_urls;
                    }());
                    topstores.Related_urls = Related_urls;
                    var SwaggerException = (function (_super) {
                        __extends(SwaggerException, _super);
                        function SwaggerException(message, status, response, headers, result) {
                            var _this = _super.call(this) || this;
                            _this.isSwaggerException = true;
                            _this.message = message;
                            _this.status = status;
                            _this.response = response;
                            _this.headers = headers;
                            _this.result = result;
                            return _this;
                        }
                        SwaggerException.isSwaggerException = function (obj) {
                            return obj.isSwaggerException === true;
                        };
                        return SwaggerException;
                    }(Error));
                    topstores.SwaggerException = SwaggerException;
                    function throwException(message, status, response, headers, result) {
                        if (result !== null && result !== undefined)
                            throw result;
                        else
                            throw new SwaggerException(message, status, response, headers, null);
                    }
                })(topstores = api.topstores || (api.topstores = {}));
            })(api = nyt.api || (nyt.api = {}));
        })(nyt || (nyt = {}));
    })(api = nyt_1.api || (nyt_1.api = {}));
})(nyt = exports.nyt || (exports.nyt = {}));
