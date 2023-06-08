const encryptKeys = [
  'aws_s3_access_key_id',
  'aws_s3_region',
  'aws_s3_secret_access_key',
  'google_map_api_key',
  'google_login_auth_token',
  'facebook_app_id'
];
const encryptSaltKey = 'web';
const clientServerEncryptKeys = ['fileStorageAccessKey'];
export { encryptKeys, encryptSaltKey, clientServerEncryptKeys };
