
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.conductor= function(req, res){
  res.render('conductor', { title: 'Express' });
};
