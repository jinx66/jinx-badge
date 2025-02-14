const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 允许解析 JSON 请求体
app.use(express.json({ limit: '10mb' }));

// 接收客户端的 SVG 数据并保存到本地
app.post('/save-svg', (req, res) => {
  const svgData = req.body.svg;

  if (!svgData) {
    return res.status(400).json({ error: 'No SVG data received' });
  }

  // 保存文件路径
  const filePath = path.join(__dirname, 'saved_images', 'image.svg');

  // 创建保存目录（如果不存在）
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  // 将 SVG 数据保存为文件
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
