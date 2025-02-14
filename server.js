const express = require('express');
const LeanCloud = require('leancloud-storage');
const app = express();

 
// 设置 LeanCloud 配置
LeanCloud.init({
  appId: 'oxjPVMpkF8MIcOmtiVgDNpsn-MdYXbMMI',   // 替换为你的 LeanCloud App ID
  appKey: 'G4Oi0ZuGGxZ3gfySkm3N6tgS',           // 替换为你的 LeanCloud App Key
  serverURL: 'https://oxjpvmpk.api.lncldglobal.com',  // 设置 LeanCloud 服务器 URL
  masterKey: 'trHYxRvQ56nQgASd3sjxp1VO',
});

 

// 定义 Badge 类
const Badge = LeanCloud.Object.extend('Badge');

// 生成 SVG 内容的函数，接受更多参数
function generateSVG({
  logo, leftText, rightText, logoColor, leftColor, rightColor,
  leftSize, rightSize, borderRadius, logoWidth, logoHeight
}) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="40">
      <rect x="0" y="0" width="100" height="40" fill="${leftColor}" rx="${borderRadius}" ry="${borderRadius}"/>
      <text x="10" y="20" font-size="${leftSize}" fill="white">${leftText}</text>
      
      <rect x="100" y="0" width="100" height="40" fill="${rightColor}" rx="${borderRadius}" ry="${borderRadius}"/>
      <text x="110" y="20" font-size="${rightSize}" fill="white">${rightText}</text>
      
      <circle cx="20" cy="20" r="${logoWidth / 2}" fill="${logoColor}" />
      <text x="17" y="23" font-size="14" fill="white">${logo}</text>
    </svg>
  `;
}

// 处理生成 SVG 并存储到 LeanCloud
app.get('/index', async (req, res) => {
  const { 
    logo, leftText, rightText, logoColor, leftColor, rightColor,
    leftSize, rightSize, borderRadius, logoWidth, logoHeight, link 
  } = req.query;
 
  const svgContent = generateSVG({
    logo: logo || 'GitHub',
    leftText: leftText || 'GitHub',
    rightText: rightText || '',
    logoColor: logoColor || 'white',
    leftColor: leftColor || 'blue',
    rightColor: rightColor || 'green',
    leftSize: leftSize || '14px',
    rightSize: rightSize || '14px',
    borderRadius: borderRadius || '6px',
    logoWidth: logoWidth || '20px',
    logoHeight: logoHeight || '20px',
  });

  const badge = new Badge();
  badge.set('logo', logo || 'GitHub');
  badge.set('leftText', leftText || 'GitHub');
  badge.set('rightText', rightText || '');
  badge.set('svgContent', svgContent);
  badge.set('logoColor', logoColor || 'white');
  badge.set('leftColor', leftColor || 'blue');
  badge.set('rightColor', rightColor || 'green');
  badge.set('leftSize', leftSize || '14px');
  badge.set('rightSize', rightSize || '14px');
  badge.set('borderRadius', borderRadius || '6px');
  badge.set('logoWidth', logoWidth || '20px');
  badge.set('logoHeight', logoHeight || '20px');
  badge.set('link', link || '');

 
  try {
 
    const savedBadge = await badge.save();
    const objectId = savedBadge.id;
    // 返回 SVG 内容
    const badgeUrl = `http://localhost:8080/svg/${objectId}`; // 根据需求调整前端请求 URL
    console.log(badgeUrl);
    res.set('Content-Type', 'image/svg+xml');
    res.send(svgContent);
  } catch (error) {
    console.error('Error saving badge:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 获取已存储的 Badge
app.get('/svg/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // 从 LeanCloud 查询 Badge 对象
    const badge = await new LeanCloud.Query(Badge).get(id);
    const svgContent = badge.get('svgContent');
    
    // 设置响应头为 SVG 文件
    res.set('Content-Type', 'image/svg+xml');
    res.send(svgContent);
  } catch (error) {
    console.error('Error fetching badge:', error);
    res.status(404).send('Badge not found');
  }
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
