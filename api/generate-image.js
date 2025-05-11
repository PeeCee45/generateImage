const nodeHtmlToImage = require('node-html-to-image');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const parsed = JSON.parse(body);
      const html = parsed.html || '<h1>No HTML provided</h1>';

      const image = await nodeHtmlToImage({
        html,
        encoding: 'base64',
      });

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        image: `data:image/png;base64,${image}`,
      });
    } catch (err) {
      console.error('Failed to generate image:', err);
      res.status(500).json({ error: 'Failed to generate image' });
    }
  });
};
