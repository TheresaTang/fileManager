# fileManager
一个简单的jQuery文件树管理demo
调用非常简单，只需在页面中引入相应css文件及js文件，并加上一下代码即可：
```
<div class="file-wrapper" id="file-wrapper">
    <ul class="crumbsNav-list">
        <li class="crumbsNav-item">
            <div class="name">全部<span>&gt;</span></div>
        </li>
    </ul>
</div>
```
所需的数据格式如下：
```
var data = [
        {
            fileName:"123",  //文件名
            children:[   //子文件
                {
                    fileName:"456.doc",
                    fileUrl:"./456.doc",  //文件地址
                    children:null
                },{
                    fileName:"你好",
                    children:[
                        {
                            fileName:"我们.xls",
                            fileUrl:"./我们.xls",
                            children:null
                        },{
                            fileName:"我们.png",
                            fileUrl:"./images/404img_05.gif",
                            children:null
                        }
                    ]
                }
            ]
        },{
            fileName:"明天.ppt",
            fileUrl:"./明天.ppt",
            children:null
        }
    ]
    调用如下方法如下：
    fileManage(id,data)
    id为类名为.file-wrapper的div的id
