const MongoClient = require('mongodb').MongoClient;

module.exports = (app) => {
  	// 第一个参数 mongodb 指定了挂载到 app 上的字段，我们可以通过 `app.mongodb` 访问到 MongoDB singleton 实例
  	// 第二个参数 createMongodb 接受两个参数(config, app)，并返回一个 MongoDB 的实例
  	app.addSingleton('mongodb', createMongoDB);
}


/**
 * @param  {Object} config   框架处理之后的配置项，如果应用配置了多个 MongoDB 实例，会将每一个配置项分别传入并调用多次 createMongoDB
 * @param  {Application} app 当前的应用
 * @return {Object}          返回创建的 MongoDB 实例
 */
async function createMongoDB(config, app) {
 	if(!(config.host && config.port && config.dbName)) {
        app.coreLogger.error('createMongoDB: config is not complete...');
        throw 'config is not complete...';
    }

    // Connection URL
    let url = '';
    if(config.user && config.password) {
        url = 'mongodb://' + config.user + ':' + config.password + '@' + config.host + ':' + config.port;
    }else {
        url = 'mongodb://' + config.host + ':' + config.port;
    }

    // Database Name
    const dbName = config.dbName;

    try {
        let db = await new Promise((resolve, reject) => {
            // Use connect method to connect to the server
            MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
                if(err) {
                    app.coreLogger.error(err);
                    reject(err);
                }

                const db = client.db(dbName);

                // 做启动应用前的检查
                app.beforeStart(() => {
                    const now = new Date();
                    app.coreLogger.info(`[egg-mogodb] init instance success, currentTime: ${now}`);
                });

                resolve(db);
            });
        });

        return db;
    }catch(e) {
        throw e;
    }
}

