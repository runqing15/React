const WebSocket = require('ws');

// 创建 WebSocket 实例
const ws = new WebSocket('wss://socket.polygon.io/crypto');

// 监听连接打开事件
ws.on('open', () => {
    // 认证
    ws.send(JSON.stringify({
        action: 'auth',
        params: 'zpElus9N6EpBUIOrCsdQh09dGFLRHEB0',
    }));
});

// 监听接收消息事件
ws.on('message', (data) => {
    console.log('Received:', data);
});

// 订阅数据流
ws.on('open', () => {
    ws.send(JSON.stringify({
        action: 'subscribe',
        params: 'XT.X:BTC-USD,XT.X:ETH-USD',
    }));
});


