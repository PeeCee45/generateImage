const nodeHtmlToImage = require('node-html-to-image');

async function generate() {
    try {
      const html = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: #f4f4f4;
              }
              h1 {
                color: #333;
              }
            </style>
          </head>
          <body>
            <h1>Hello from static HTML!</h1>
          </body>
        </html>
      `;
    
      const image = await nodeHtmlToImage({
        html,
        encoding: 'base64'
      });
      
      return `data:image/png;base64,${image}`;
    } catch (error) {
      return 'Image generation error:', error;
    }
}
module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      image: await generate()
    });
  } catch (err) {
    console.error('Error generating image:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
