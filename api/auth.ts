export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user`;
  return Response.redirect(url, 302);
}
