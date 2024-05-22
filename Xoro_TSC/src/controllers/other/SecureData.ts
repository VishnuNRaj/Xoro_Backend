import auth from '../../config/auth';

const encodeString = (data: string) => {
  return new TextEncoder().encode(data);
};

export const createPayloadSecure = async (data: any) => {
  const encodedData = encodeString(JSON.stringify(data));
  const encodedSecret = encodeString(auth.JWT_SECRET);

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      encodedSecret,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, encodedData);
    return signature;
  } catch (error) {
    console.error('Error creating payload:', error);
    return null;
  }
};

export const verifyPayloadSecure = async (data: any, signature: ArrayBuffer) => {
  const encodedData = encodeString(JSON.stringify(data));
  const encodedSecret = encodeString(auth.JWT_SECRET);

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      encodedSecret,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const verified = await crypto.subtle.verify('HMAC', key, signature, encodedData);
    return verified ? data : null;
  } catch (error) {
    console.error('Error verifying payload:', error);
    return null;
  }
};
