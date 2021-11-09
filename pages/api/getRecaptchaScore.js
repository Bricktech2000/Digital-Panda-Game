import consts from '../../components/consts';

export default function getRecaptchaScore(idToken) {
  return new Promise((resolve, reject) => {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${consts.reCAPTCHA_secret_key}&response=${idToken}`;
    fetch(url, { method: 'POST' })
      .then((res) => res.json())
      .then(async (json) => {
        if (!json.success) resolve(null);
        resolve(json.score);
      });
  });
}
