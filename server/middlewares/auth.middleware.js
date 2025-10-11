// usage: authorize('admin') or authorize('admin', 'manager')
function authorize(...allowedRoles) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role) return res.status(403).json({ message: "Forbidden" });
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "You do not have permission" });
    }
    return next();
  };
}

module.exports = {
  authorize,
};
