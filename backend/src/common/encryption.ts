import * as bcrypt from 'bcrypt';

const saltOrRounds = process.env.BACKEND_SALT;

export function encryptPassowrd(password: string) {
  try {
    const salt = bcrypt.genSaltSync(parseInt(saltOrRounds));
    const passwordEncryped = bcrypt.hashSync(password, salt);

    return passwordEncryped;
  } catch (e) {
    console.log(e);
  }
}

export async function passwordValid(
  passwordInput: string,
  passwordHash: string,
) {
  return await bcrypt.compare(passwordInput, passwordHash);
}
