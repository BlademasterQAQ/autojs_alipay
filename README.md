# autojs_支付宝自动羊毛

当您有一台Android系统的手机，安装了autojs（或[AutoX.js](https://github.com/kkevsekk1/AutoX)），并且知道如何创建/导入autojs脚本，即可使用。

## 关于bug

执行时可能会卡住（很大可能是支付宝自己卡了），重新执行脚本一般就能继续执行。

通过提高延时可能可以提高稳定性，可以自行修正并PR，也可以提issue（不一定会及时修）。

若对自行修改代码有兴趣，可以[脚本编写细节](#脚本编写细节)

## 使用方法

### 翻翻卡

打开下图所示页面，然后运行[支付宝翻翻卡.js](支付宝翻翻卡.js)。

![支付宝翻翻卡](img/支付宝翻翻卡.jpg)

### 消费金

打开下图所示页面（点开任务页面），然后运行[支付宝翻翻卡.js](支付宝翻翻卡.js)

![消费金任务](img/消费金任务.jpg)

## 脚本编写细节

脚本中对进入任务的按键的定位，未使用绝对位置进行定位，而是借助[Autojs层次定位](https://github.com/BlademasterQAQ/autojs_layerLocate)项目，通过一个有特殊信息的控件和层次关系进行定位。理论上可以兼容所有型号的设备。

**脚本中的`waitUntil`函数，尝试通过等待某个控件的出现/消失，实现延时。**对于支付宝中的任务，一般进入任务后便可马上退出，此时可以通过检测主页面的元素消失，实现进入任务后立即退出。

脚本中的`sleep1s`函数，是对`sleep`函数的封装，以秒为单位更直接。