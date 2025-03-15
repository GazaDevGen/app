import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/index.js';

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      reject(error);
    } else {
      resolve(decoded);
    }
  });
});

export default verifyToken;
