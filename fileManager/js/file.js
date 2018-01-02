function fileManage(idName,fileData) {
    var id = "#"+idName;
    var folderTree = [];
//    生成文件夹的代码
    function fileLi(data) {
        var childStr = '';
        for(var i = 0;i <data.length;i++){
            if(data[i].fileName.indexOf(".")<0 && data[i].children == null){
                var cli = '<li class="file-item folder"><div class="file-box"><div class="filePic"></div><a href="javascript:;" class="fileName" title="'+data[i].fileName+'">'+data[i].fileName+'</a></div></li>';
            }else if(data[i].fileName.indexOf(".")<0 && data[i].children != null){
                var cli = '<li class="file-item folderFull"><div class="file-box"><div class="filePic"></div><a href="javascript:;" class="fileName" title="'+data[i].fileName+'">'+data[i].fileName+'</a></div>';
                cli += fileLi(data[i].children)+'</li>'
            }else if(data[i].fileName.indexOf(".text") >= 0){
                var cli = '<li class="file-item textFile"><div class="file-box"><div class="filePic"></div><a href="'+data[i].fileUrl+'" class="fileName" title="'+data[i].fileName+'" download="'+data[i].fileName+'">'+data[i].fileName+'</a></div></li>';
            }else if(data[i].fileName.indexOf(".doc") >= 0 || data[i].fileName.indexOf(".docx") >= 0){
                var cli = '<li class="file-item docFile"><div class="file-box"><div class="filePic"></div><a href="'+data[i].fileUrl+'" class="fileName" title="'+data[i].fileName+'" download="'+data[i].fileName+'">'+data[i].fileName+'</a></div></li>';
            }else if(data[i].fileName.indexOf(".xls") >= 0 || data[i].fileName.indexOf(".xlsx") >= 0){
                var cli = '<li class="file-item excelFile"><div class="file-box"><div class="filePic"></div><a href="'+data[i].fileUrl+'" class="fileName" title="'+data[i].fileName+'" download="'+data[i].fileName+'">'+data[i].fileName+'</a></div></li>';
            }else if(data[i].fileName.indexOf(".pdf") >= 0){
                var cli = '<li class="file-item pdfFile"><div class="file-box"><div class="filePic"></div><a href="'+data[i].fileUrl+'" class="fileName" title="'+data[i].fileName+'" download="'+data[i].fileName+'">'+data[i].fileName+'</a></div></li>';
            }else if(data[i].fileName.indexOf(".ppt") >= 0 || data[i].fileName.indexOf(".pptx") >= 0){
                var cli = '<li class="file-item pptFile"><div class="file-box"><div class="filePic"></div><a href="'+data[i].fileUrl+'" class="fileName" title="'+data[i].fileName+'" download="'+data[i].fileName+'">'+data[i].fileName+'</a></div></li>';
            }else if(data[i].fileName.indexOf(".png") >= 0 || data[i].fileName.indexOf(".jpg") >= 0 || data[i].fileName.indexOf(".jpeg") >= 0){
                var cli = '<li class="file-item"><div class="file-box"><div class="filePic"><img src="'+data[i].fileUrl+'" alt=""></div><a href="'+data[i].fileUrl+'" class="fileName" title="'+data[i].fileName+'"  download="'+data[i].fileName+'">'+data[i].fileName+'</a></div></li>';
            }
            childStr += cli;
        }
        childStr = '<ul class="file-list">'+childStr+'</ul>';
        return childStr;
    }

    var fLi = fileLi(fileData);
    $(id).append(fLi)
//    文件夹点击事件
    $(id).on("dblclick",".file-list .file-item",function (e) {
        e.stopPropagation();
        $(".file-list .file-item").removeClass("active");
        if($(this).hasClass("folder") || $(this).hasClass("folderFull")){
            $(this).parent().children(".file-item").hide();
            $(this).children(".file-box").hide();
            $(this).show();
            $(".file-box").hide();
            $(this).children(".file-list").show();
            $(this).children(".file-list").children().show();
            $(this).children(".file-list").children().children(".file-box").show();
            var text = $(this).children(".file-box").children(".fileName").text();
            var navLi = '<li class="crumbsNav-item"><div class="name">'+text+'<span>&gt;</span></div></li>';
            $(".crumbsNav-list").append(navLi);
            folderTree.push($(this));
        }else{
            return;
        }
    })
    $(id).on("click",".file-list .file-item",function (e){
        e.stopPropagation();
        if($(this).hasClass("active")){
            $(this).removeClass("active")
        }else{
            $(".file-list .file-item").removeClass("active");
            $(this).addClass("active");
        }
    });

//    面包屑导航栏点击事件
    $(".crumbsNav-list").on("click",".crumbsNav-item",function () {
        console.log(folderTree);
        var index = $(this).index();
        if(index == folderTree.length){
            return;
        }
        if(index-1 < 0){
            $(".file-box").show();
            var fileUl = id+' .file-list';
            $(fileUl).hide()
            $(id).children(".file-list").show();
            $(id).children(".file-list").children(".file-item").show();
            folderTree = [];
        }else{
            $(".file-box").hide();
            folderTree[index-1].children(".file-list").find(".file-box").show();
            folderTree[index-1].children(".file-list").children().show();
            folderTree[index-1].children(".file-list").show();
            folderTree[index-1].children(".file-list").children().children(".file-list").hide();
            folderTree.splice(index,parseInt(folderTree.length-index)+1)
        }
        $(this).nextAll().remove();
    })
}