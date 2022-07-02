let proxyObj={
}
proxyObj['/']={
    //webSocket
    ws: false,
    //目标地址-->后端接口
    target: `http://localhost:8181`,
    //发送请求头host会被设置成target
    changeOrigin: true,
    //不重写请求地址
    pathRewrite:{
        '^/':'/'
    }
}

proxyObj[`/ws`]={
    ws:true,
    target: `ws://localhost:8181`
};

module.exports={
    devServer:{
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}