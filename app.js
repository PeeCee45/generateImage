const nodeHtmlToImage = require('node-html-to-image');

module.exports = async (req, res) => {
  const html = req.body.html || '<h1>No HTML provided</h1>';

  const image = await nodeHtmlToImage({
    html,
    encoding: 'base64'
  });

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    image: `data:image/png;base64,${image}`
  });
};
