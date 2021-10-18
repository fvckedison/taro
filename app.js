var linebot = require('linebot');

var bot = linebot({
  channelId: '1656546180',
  channelSecret: 'd098ad7399f974356c822ba42df37478',
  channelAccessToken: 'SuBPvYpkKBTTsICWX/6aPe6P8IbolqFRBRoJOoPk94INpvBHL1ohl8RYRk2bcFOI1Zb6we5jWjik5+f2FK4HW8hIeugUvT4gaX5OvalWXcaydgb0JSMYmfGjt+XcKpSpotfHULfmLeIK4R4V+TF6zAdB04t89/1O/w1cDnyilFU='
});
bot.on('message', function (event) {
    var replyMsg=''
    if(event.message.type=='text'){
        replyMsg = `Hello你剛才說的是:${event.message.text}`;
    }else{
        replyMsg="很抱歉我看不懂貼圖QQ"
    }

    event.reply(replyMsg).then(function (data) {
    }).catch(function (error) {
    });
    event.reply({
        type: 'location',
        title: 'my location',
        address: '〒150-0002 東京都渋谷区渋谷２丁目２１−１',
        latitude: 35.65910807942215,
        longitude: 139.70372892916203
      });
});

bot.listen('/test', 3000, function () {
    console.log('[BOT已準備就緒]');
});