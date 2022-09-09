import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          useRefreshTokens: true,
        },
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
