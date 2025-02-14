const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080', // 允许来自该端口的请求
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type'
}));

// 解析请求体中的 JSON 数据
app.use(bodyParser.json({ limit: '10mb' }));

// 接收客户端的 SVG 数据并保存
app.post('/save-svg', (req, res) => {
  const svgData = req.body.svg;

  if (!svgData) {
    return res.status(400).json({ error: 'No SVG data received' });
  }

  // 设置文件保存路径
  const filePath = path.join(__dirname, 'saved_images', 'image.svg');

  // 确保保存目录存在
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  // 保存 SVG 数据为文件
  fs.writeFile(filePath, svgData, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving SVG' });
    }

    // 返回成功响应
    res.json({ message: 'SVG saved successfully', filePath });
  });
});

// 获取保存的 SVG 文件
app.get('/get-svg', (req, res) => {
  const filePath = path.join(__dirname, 'saved_images', 'image.svg');
  
  // 如果文件存在，返回文件内容
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'SVG file not found' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
