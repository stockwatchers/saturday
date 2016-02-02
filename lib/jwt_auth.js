const Profile = require(__dirname + '/../models/profile');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
	var decoded;
	try {
		decoded = jwt.verify(req.headers.token, process.env.APP_SECRET || 'changethis');
	} catch(e) {
		return res.status(401).json({msg: 'Not allowed -JWT'});
	}
	Profile.findOne({_id: decoded.id}, (err, user) => {
		if(err) {
			console.log(err);
			return res.status(401).json({msg: 'Not right. Nope -JWT'});
		}
		if(!user) return res.status(401).json({msg: 'Not gunna happen - JWT'});

		req.user = user;
		next();
	});
};
