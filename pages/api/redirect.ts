import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.writeHead(302, { Location: '/ComingSoon' }); // Remove '/pages' from the path
  res.end();
};