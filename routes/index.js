
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'ChoirBoy' });
};

exports.conductor= function(req, res){
  res.render('conductor', { title: 'ChoirBoy' });
};
