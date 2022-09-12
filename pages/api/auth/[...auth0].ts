import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          //   audience: 'gateway.dev.abcdDomain.com',
          // Add the `offline_access` scope to also get a Refresh Token
          //   scope: 'openid profile email offline_access', // or AUTH0_SCOPE
          useRefreshTokens: true,
        },
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
