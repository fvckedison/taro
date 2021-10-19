var linebot = require('linebot');
var bot = linebot({
    channelId: '1656546180',
    channelSecret: 'd098ad7399f974356c822ba42df37478',
    channelAccessToken: 'SuBPvYpkKBTTsICWX/6aPe6P8IbolqFRBRoJOoPk94INpvBHL1ohl8RYRk2bcFOI1Zb6we5jWjik5+f2FK4HW8hIeugUvT4gaX5OvalWXcaydgb0JSMYmfGjt+XcKpSpotfHULfmLeIK4R4V+TF6zAdB04t89/1O/w1cDnyilFU='
});
bot.on('message', function (event) {
    var replyMsg = ''
    var displayName = ''
    var startStatus = false
    event.source.profile().then(function (profile) {
        displayName = profile.displayName;
        //檢查輸入是否為字串而非貼圖
        if (event.message.type == 'text') {
            // replyMsg = `${displayName}:${event.message.text}`;
            if (event.message.text == '開始') {
                startStatus == true
                replyMsg = `${displayName}您好，請輸入您的西元出生年月日，格式範例1998/01/01`
                bot.on('message', function (data) {
                    var birth = data.message.text
                    var replyMsg = [
                        getFirstCard(birth),
                        getSecondCard(birth),
                        getThirdCard(birth),
                    ]+getLastCard(birth)
                    // for(var i=0;i<getLastCard(birth).length;i++){
                    //     replyMsg((getLastCard(birth)[i]))
                    // }
                    console.log(replyMsg)
                    data.reply(replyMsg).then(function (data) {
                    }).catch(function (error) {
                    });
                });
            } else if (event.message.text == '結束') {
                startStatus == false
            }

        } else {
            replyMsg = "很抱歉我看不懂貼圖QQ"
        }

        event.reply(replyMsg).then(function (data) {
        }).catch(function (error) {
        });
    });

});

bot.listen('/test', 3000, function () {
    console.log('[BOT已準備就緒]');
});

function getFirstCard(birth) {
    var firstCard = parseInt(birth.substr(8))
    if (firstCard > 22) {
        var data1 = (firstCard % 10) + Math.floor(firstCard / 10)
        if (data1 > 9) {
            var value = (data1 % 10) + Math.floor(data1 / 10)
            replyMsg = `您的第一張牌為:${value}`
        } else {
            replyMsg = `您的第一張牌為:${data1}`
        }

    } else {
        replyMsg = `您的第一張牌為:${firstCard}`
    }
    return replyMsg
}
function getSecondCard(birth) {
    var secondCard = parseInt(birth.substr(0, 1)) + parseInt(birth.substr(1, 1)) + parseInt(birth.substr(2, 1)) + parseInt(birth.substr(3, 1)) + parseInt(birth.substr(5, 1)) + parseInt(birth.substr(6, 1)) + parseInt(birth.substr(8, 1)) + parseInt(birth.substr(9, 1))
    if (secondCard > 22) {
        secondCard = secondCard % 22
    } else {
        secondCard = secondCard
    }
    return `您的第二張牌為:${secondCard}`
}
function getThirdCard(birth) {
    var thirdCard = parseInt(birth.substr(0, 1)) + parseInt(birth.substr(1, 1)) + parseInt(birth.substr(2, 1)) + parseInt(birth.substr(3, 1)) + parseInt(birth.substr(5, 2)) + parseInt(birth.substr(8, 2))
    if (thirdCard > 22) {
        thirdCard = thirdCard % 22
    } else {
        thirdCard = thirdCard
    }
    return `您的第三張牌為:${thirdCard}`
}
function getLastCard(birth) {
    var month = parseInt(birth.substr(5, 2))
    var date = parseInt(birth.substr(8, 2))
    var fourthCard = 0
    var fifthCard = 0
    var sixthCard = 0
    var seventhCard = 0
    if (month == 2 && date == 29) {
        fourthCard = 16
        fifthCard = 15
        sixthCard = 17
    } else if (month == 12 && date == 31) {
        fourthCard = 13
        fifthCard = 12
        sixthCard = 14
        seventhCard = 1
    }
    else {
        fourthCard = getDatesOfYear(month, date) % 22
        fifthCard = (getDatesOfYear(month, date) % 22) - 1
        sixthCard = (getDatesOfYear(month, date) % 22) + 1
    }
    if(seventhCard==0){
        return [`您的第四張牌為:${fourthCard}`,`您的第五張牌為:${fifthCard}`,`您的第六張牌為:${sixthCard}`]
    }else{
        return [`您的第四張牌為:${fourthCard}`,`您的第五張牌為:${fifthCard}`,`您的第六張牌為:${sixthCard}`,`您的第七張牌為:${seventhCard}`]
    }

}
function getDatesOfYear(month, date) {
    var datesOfYear = 0
    if (month == 1) {
        datesOfYear = date
    } else if (month == 2) {
        datesOfYear = date + 31
    } else if (month == 3) {
        datesOfYear = date + 31 + 28
    }
    else if (month == 4) {
        datesOfYear = date + 31 + 28 + 31
    }
    else if (month == 5) {
        datesOfYear = date + 31 + 28 + 31 + 30
    }
    else if (month == 6) {
        datesOfYear = date + 31 + 28 + 31 + 30 + 31
    }
    else if (month == 7) {
        datesOfYear = date + 31 + 28 + 31 + 30 + 31 + 30
    }
    else if (month == 8) {
        datesOfYear = date + 31 + 28 + 31 + 30 + 31 + 30 + 31
    }
    else if (month == 9) {
        datesOfYear = date + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31
    }
    else if (month == 10) {
        datesOfYear = date + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30
    }
    else if (month == 11) {
        datesOfYear = date + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31
    }
    else if (month == 12) {
        datesOfYear = date + 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30
    } else {
        console.log("error Input")
    }
    return (datesOfYear)
}

console.log(getDatesOfYear(4, 18) % 22)