// Vercel Serverless Function for Admin Login
export default function handler(req, res) {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // If format=json is explicitly requested via query param
    if (req.query && req.query.format === 'json') {
      return res.status(200).json({
        status: 'active',
        portal: 'Indian Paratha Company Highway Station Command',
        message: 'Send a POST request with { username, password } to authenticate.',
        loginEndpoint: '/api/admin/login',
        method: 'POST',
      });
    }

    // Direct browser visits to /api/admin/login automatically redirect to the Admin Portal UI
    if (typeof res.redirect === 'function') {
      return res.redirect(302, '/?admin=true');
    }
    res.writeHead(302, { Location: '/?admin=true' });
    return res.end();
  }

  if (req.method === 'POST') {
    const { username, password } = req.body || {};
    const validUser = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();
    const validPass = (process.env.ADMIN_PASSWORD || 'password123').trim();

    const inputUser = (username || '').trim().toLowerCase();
    const inputPass = (password || '').trim();

    if (inputUser === validUser && inputPass === validPass) {
      const token = 'ipc_token_' + Buffer.from(`${inputUser}:${Date.now()}`).toString('base64');
      return res.status(200).json({
        success: true,
        token,
        user: 'Station Master (Highway Command)',
        expiresIn: '8h',
      });
    }

    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
