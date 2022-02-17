/**
 * 支付宝翻翻卡
 * 
 * 使用方法：手动打开支付宝 -> 花呗 -> 翻翻卡的任务页面，然后运行脚本
 * 
 * Author: blademaster
 * Date: 2021/10/24 21:32
 * Versions: 1.0
 * Github: https://github.com/BlademasterQAQ/jd20211111
 */
//************************配置项*************************
var task_name = "去喂小羊.*|去膨胀.*|来天天.*|.*消费金|.*优酷视频|浏览商品.*"; // 使用正则表示任务的标题
//*******************************************************

console.show();
console.info("开始运行脚本");
auto.waitFor();

// var lottery_chance_array = textMatches("还有[0-9]*次翻卡机会").find();
// //log(lottery_chance_array.size());
// var lottery_chance = lottery_chance_array.get(0);
// var lottery_chance_num = lottery_chance_array.get(0).text()[2];//数字

// log(textMatches("完成任务得翻卡机会").find().size());
// exit();

// 等待进入任务页面
while(!isMainMenu())
{
    console.error("请打开任务页面");
    sleep1s(1);
}

// 进入任务页面
// textMatches(task_name).find().get(0).parent().child(3).click();


// 点击一次“得翻卡机会”按键，然后任务的UI就会一直出现（无需再次打开）
lottery_chance_array = textMatches("还有[0-9]*次翻卡机会").find();
lottery_chance = lottery_chance_array.get(0);
var get_chance = lottery_chance.parent().child(1); // “得翻卡机会”按键
get_chance.click();
sleep1s(2);

// 做任务
var task_array = textMatches(task_name).find();

while(task_array.get(0).parent().child(3).clickable()) // 不可点击时全部任务完成
{
    task_array.get(0).parent().child(3).click(); // 开始进入任务
    if(waitUntil(textMatches("完成任务得翻卡机会"), 3000, 500, true) == true) // 等待消失
    {
        back(); //回主页面
        sleep1s(2);
        waitUntil(textMatches("完成任务得翻卡机会"), 3000, 500, false); // 等待出现
    }
    else
    {
        log("开关任务页面时出错");
        exit();
    }
    task_array = textMatches(task_name).find();
}
log("任务完成");

// 领奖
lottery_chance_array = textMatches("还有[0-9]*次翻卡机会").find();
lottery_chance = lottery_chance_array.get(0);
lottery_chance_num = lottery_chance_array.get(0).text()[2];//数字
while(lottery_chance_num > 0)
{
    for(var i = 0;i < 5;i++)
    {
        if(lottery_chance_array.get(0).parent().child(2).child(i).child(0).child(0).child(0) != null)
        {
            lottery_chance_array.get(0).parent().child(2).child(i).child(0).child(0).child(0).click();
        }
    }
    sleep1s(3);
    lottery_chance_array = textMatches("还有[0-9]*次翻卡机会").find();
    lottery_chance_num = lottery_chance_array.get(0).text()[2];//数字
}
log("领奖完成");

// 结束脚本
console.hide();

//*************************函数区************************
function sleep1s(seconds){
    for(var i = 0;i < seconds;i++){
        sleep(1000);
    }
}

function isMainMenu() // 返回主页面
{
    lottery_chance_array = textMatches("还有[0-9]*次翻卡机会").find();
    return lottery_chance_array.size() > 0;
}

/**
 * 等待duration毫秒，直到满足UiSelector条件的UI出现，返回true；若超过duration时间未找到，则返回false。
 * @param {*} UiSelector 等待的控件条件。demo：textMatches("完成任务得翻卡机会") bounds(785, 1612 , 988, 1699)。
 * @param {*} duration 等待最长时间，毫秒为单位。
 * @param {*} check_interval 检查间隔，毫秒为单位。
 * @param {*} reverse 为 false 时等待UiSelector出现，为 true 时等待UiSelector消失。
 * @returns 返回 true 时，在duration时间内符合条件；返回 false 时超时。
 */
 function waitUntil(UiSelector, duration, check_interval, reverse)
 {
     var maxUiObject = textMatches(".*").findOne(); // 最外层UI
     while(maxUiObject.parent() != null)
     {
         maxUiObject = maxUiObject.parent();
     }
     var time = 0;
     while(time <= duration)
     {
         var result = maxUiObject.find(UiSelector).size(); // 找到的个数
         if(result > 0 && reverse == false) // 出现了
         {
             return true;
         }
         if(result == 0 && reverse == true) // 消失了
         {
             return true;
         }
         time = time + check_interval;
         sleep(check_interval);
     }
     return false; // 超时
 
 }