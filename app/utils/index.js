import bcrypt from 'bcrypt';

export async function verifyPassword(incomingPassword, userPassword) {
  return await bcrypt.compare(incomingPassword, userPassword);
}

export function setCookie(res, token) {
  res.cookie('refreshToken', token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
}
