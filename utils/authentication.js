function createLoginUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.save(action);
}

function removeLoginUserSession(req) {
  req.session.uid = null;
}

module.exports = {
  createLoginUserSession: createLoginUserSession,
  removeLoginUserSession: removeLoginUserSession,
};
