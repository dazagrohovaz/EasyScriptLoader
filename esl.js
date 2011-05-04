/**
  ESL: Easy Script Loader
  (c) DazaGrohovaz.Net / ProxyJS.com <guidoalfredo@dazagrohovaz.net>

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

if(!global) var global = window.global = window;

(function(){
	var esl= this.esl = {
		load: function (uri, cb){
			var d = document, h = d.head, s = d.createElement('script');
			s.src = uri;
			if(!!cb && typeof cb === 'function'){
				s.onreadystatechange = function(){if(this.readyState=='loaded')cb();};
				s.onload = cb;
			}
			h.appendChild(s);
		},
		sync: function (js, cb, i) {
			if(!i) i = 0;
			if(js[i])
				esl.load(js[i], function(){ esl.sync(jss, cb, i+1); });
			else if(i && i == js.length)
				cb();
		},
		async: function(js, cb){
			js = js.reverse();
			var i=js.length, cn=i-1, fn=function(){ if(!cn--)cb() };
			while(i--)esl.load(js[i], fn);
		}
	};
}).call(global);

/*
	Example:
	
	var async_js = ['jquery.js', 'dojo.js', 'mootols.js', 'framework.js', 'otherscript.js']
	var sync_js = ['api.js', 'main.js', 'init.js', 'app.js']
	  
	esl.async( async_js, function(){ 
	  esl.sync(sync_js, main);	
	});
	
	function main(){
		// your code here
	}
*/