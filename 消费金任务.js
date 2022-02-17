var money_5 = text("+5").find();

while(money_5.size() > 0)
{
    var mainUI = money_5.get(0).parent();
    for(var i = 0;i < mainUI.childCount();i++)
    {
        if(mainUI.child(i).text() == "+5")
        {
            mainUI.child(i + 1).click();
            //等待任务完成
            if(waitUntil(text("+5"), 3000, 500, true) == true) // 等待消失
            {
                sleep1s(1)
                back(); //回主页面
                sleep1s(1)
                waitUntil(text("+5"), 3000, 500, false); // 等待出现
            }
            else
            {
                log("开关任务页面时出错");
                exit();
            }

            break;
        }
    }

    money_5 = text("+5").find();
}

function sleep1s(seconds){
    for(var i = 0;i < seconds;i++){
        sleep(1000);
    }
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