const satori = require('satori');
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const fontPath = path.join(__dirname, '../fonts/Inter-Regular.ttf');
    const fontData = fs.readFileSync(fontPath);

    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            background: '#f4f4f4',
            fontSize: 36,
          },
          children: 'Hello from Satori!',
        },
      },
      {
        width: 600,
        height: 400,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            weight: 400,
            style: 'normal',
          },
        ],
      }
    );

    const pngBuffer = new Resvg(svg).render().asPng();

    const base64Image = pngBuffer.toString('base64');
    res.status(200).json({
      image: `data:image/png;base64,${base64Image}`
    });

  } catch (err) {
    console.error('Image generation error:', err);
    res.status(500).json({ error: 'Failed to generate image' });
  }
};
