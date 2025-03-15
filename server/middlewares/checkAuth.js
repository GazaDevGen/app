import verifyToken from '../helpers/jwtPromise.js';

const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ msg: 'not authorized' })
    }
    const userData = await verifyToken(token);
    req.user = userData
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return res.status(401).json({ msg: 'not authorized' });
    next(err);
  }
};
export default checkAuth;
