var phantom = require("phantom");
var _ph, _page, _outObj;

phantom.create().then(function(ph){
    _ph = ph;
    return _ph.createPage();
}).then(function(page){
    _page = page;
    return _page.open('https://www.gympass.com/es/personas/entrar');
}).then(function(status){
    console.log(status);
    return _page.property('title')
}).then(function(content){
    console.log(content);
    _page.close();
    _ph.exit();
}).catch(function(e){
   console.log(e);
});
