const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Enable CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve the portfolio-img directory with directory listing enabled
app.use('/portfolio-img', express.static(path.join(__dirname, 'public/portfolio-img'), { 
  index: false,
  setHeaders: (res, path) => {
    if (fs.statSync(path).isDirectory()) {
      res.setHeader('Content-Type', 'text/html');
    }
  }
}));

app.get('/portfolio-img', (req, res) => {
  const directoryPath = path.join(__dirname, 'public/portfolio-img');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Error reading directory');
      return;
    }

    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Portfolio Images</title></head>
        <body>
          ${imageFiles.map(file => `<a href="/portfolio-img/${file}">${file}</a><br>`).join('\n')}
        </body>
      </html>
    `;

    res.send(html);
  });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
