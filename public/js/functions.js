$(function() {
    function widgetGet(link) {
        var type = getLinkType(link);
        var id = getLinkId(link);
        var parentlink = location.href.slice(0,-12);
        var newlink = parentlink + '/' + type + 'player/' + id + '/';
        if (type != null && typeof(id) != "undefined") {
            var result = '<h4>演示：</h4><iframe src="' + newlink + '" frameborder="0" scrolling="0" width="430" height="200" allowtransparency></iframe><h4>代码：</h4><code>&lt;iframe src="' + newlink + '" frameborder="0" scrolling="0" width="430" height="200" allowtransparency&gt;&lt;/iframe&gt;</code>';
            $("#widget_search_result").html(result);
        }
    }
    function getLinkType(link) {
        var re = /xiami|m163|ttpod|kugou|5sing/;
        return re.exec(link);
    }
    function getLinkId(link) {
        var part = link.split("/")
        var id = part.pop();
        if (id.length == 0) {
            id = part.pop();
        }
        return id;
    }
    function searchSong(content) {
        var page=("undefined"!==typeof $("#page").val()?parseInt($("#page").val()):1);
        var limit=("undefined"!==typeof $("#limit").val()?parseInt($("#limit").val()):10);
        var seltab =("undefined"!==typeof $("#seltab").html())?$("#seltab").html():'xiami';
        var type = $("#songType").val();
        $("#searchResult").html('<div class="alert alert-info">正在加载，请稍候…</div>');
        if (content=="") {
            $("#searchResult").html('<div class="alert alert-info">搜索内容为空！</div>');
            return true;
        }
        $.ajax({
            type: 'post',
            url: 'search.php',
            dataType: 'json',
            timeout: 8000,
            data: {"type":type, "content":content, "page":page, "limit":limit},
            success: function(result) {
                if (result["status"]=="error") {
                    $("#searchResult").html('<div class="alert alert-info">'+result['message']+'</div>');
                }
                if (type!='all') {
                    var typeout;
                    if (type=='xiami') {typeout = '虾米音乐';}
                    if (type=='m163') {typeout = '网易音乐';}
                    if (type=='ttpod') {typeout = '天天动听';}
                    if (type=='kugou') {typeout = '酷狗音乐';}
                    if (type=='5sing') {typeout = '5sing音乐';}
                    var outputStart = '<div class="panel panel-success"><div class="panel-heading">' + typeout + '搜索结果</div><div class="panel-body">以下是' + content + '的搜索结果，点击歌名可以试听哦！</div><table class="table"><thead><tr><th>#</th><th>歌名</th><th>歌手</th><th>地址</th></tr></thead><tbody>';
                    var outputMid = '';
                    var infoLength = (type=='5sing'?10:parseInt(result.length));
                    for (var i=0;i<infoLength;i++) {
                        outputMid += '<tr><td>'+((page-1)*limit+i+1)+'</td><td><a href="./'+type+'player/'+result[i]["songId"]+'/" onclick="listen(\''+type+'\',\''+result[i]["songId"]+'\');return false;">'+result[i]["songName"]+'</a></td><td>'+result[i]['singerName']+'</td><td><a href="./'+type+'/'+result[i]["songId"]+'/" target="_blank">下载</a><td></tr>';
                    }
                    var pagelink = (page==1?'<center><a id="nextpage" href="javascript:void(0)">下一页</a></center>':'<center><a id="prevpage" href="javascript:void(0)">上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id="nextpage" href="javascript:void(0)">下一页</a></center>');
                    var outputEnd = (type=='5sing'?'</tbody></table><span id="page" style="display:none">'+page+'</span></div>':'</tbody></table><div class="panel-body" style="text-align: right">'+pagelink+'第<input id="pagenum" value="'+page+'" size="1"/>页&nbsp;&nbsp;<button id="pagejmp">跳转</button>&nbsp;&nbsp;&nbsp;&nbsp;每页显示<select name="limit" id="limit"><option value="10">10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option></select>个<div id="page" style="display:none">'+page+'</div></div></div>');
                    $("#searchResult").html(outputStart+outputMid+outputEnd);
                }
                else {
                    var typecode = new Array('xiami', 'm163', 'ttpod', 'kugou');
                    var output = '<div class="panel panel-success"><div class="panel-heading">搜索结果</div><div class="panel-body">以下是' + content + '的搜索结果，点击歌名可以试听哦！</div><ul id="tabs" class="nav nav-tabs"><li id="tabxiami" class="active"><a href="javascript:void(0)">虾米</a></li><li id="tabm163"><a href="javascript:void(0)">网易</a></li><li id="tabttpod"><a href="javascript:void(0)">天天</a></li><li id="tabkugou"><a href="javascript:void(0)">酷狗</a></li></ul><div id="tabcontent">';
                    var style = '';
                    for (var i=0;i<result.length;i++) {
                        if (i==0) {style = 'block';} else {style = 'none';}
                        var outputStart = '<div id="panel'+typecode[i]+'" class="panel" style="display: ' + style + ';"><table class="table"><thead><tr><th>#</th><th>歌名</th><th>歌手</th><th>地址</th></tr></thead><tbody>';
                        var outputMid = '';
                        for (var j=0;j<result[i].length;j++) {
                            outputMid += '<tr><td>'+((page-1)*limit+j+1)+'</td><td><a href="./'+typecode[i]+'player/'+result[i][j]["songId"]+'/" onclick="listen(\''+typecode[i]+'\',\''+result[i][j]["songId"]+'\');return false;">'+result[i][j]["songName"]+'</a></td><td>'+result[i][j]['singerName']+'</td><td><a href="./'+typecode[i]+'/'+result[i][j]["songId"]+'/" target="_blank">下载</a></td></tr>';
                        }
                        var pagelink = (page==1?'<center><a id="nextpage" href="javascript:void(0)">下一页</a></center>':'<center><a id="prevpage" href="javascript:void(0)">上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id="nextpage" href="javascript:void(0)">下一页</a></center>');
                        var outputEnd = '</tbody></table></div>';
                        output += outputStart+outputMid+outputEnd;
                    }
                    output += '<div class="panel-body" id="pages" style="text-align: right">'+pagelink+'第<input id="pagenum" value="'+page+'" size="1"/>页&nbsp;&nbsp;<button id="pagejmp">跳转</button>&nbsp;&nbsp;&nbsp;&nbsp;每页显示<select name="limit" id="limit"><option value="10">10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option></select>个<div id="page" style="display:none">'+page+'</div></div>';
                    $("#searchResult").html(output);
                    showtab(seltab);
                }
                $("#page").val(page);
                $("#limit").val(limit);
            },
            error: function(XMLHttpRequest,status) {
                if (status == 'timeout') {
                    $("#searchResult").html('<div class="alert alert-warning">请求超时，<a href="javascript:void(0)" id="reload");">重新加载</a><div id="page" style="display:none">'+page+'</div><div id="limit" style="display:none">'+limit+'</div></div>');
                    return true;
                } else {
                    $("#searchResult").html('<div class="alert alert-danger">无法请求数据</div>');
                    return true;
                }
            }
        });
        return true;
    }
    $("#searchResult").on("click", "#reload", function() {
        $("#page").val(parseInt($("#page").html()));
        $("#limit").val(parseInt($("#limit").html()));
        searchSong($("#searchContent").val());
    });
    $("#searchResult").on("click", "#prevpage", function() {
        $("#page").val(parseInt($("#page").val())-1);
        searchSong($("#searchContent").val());
    });
    $("#searchResult").on("click", "#nextpage", function() {
        $("#page").val(parseInt($("#page").val())+1);
        searchSong($("#searchContent").val());
    });
    $("#searchResult").on("click", "#pagejmp", function() {
        $("#page").val(parseInt($("#pagenum").val()));
        searchSong($("#searchContent").val());
    });
    $("#searchResult").on("change", "#limit", function() {
        searchSong($("#searchContent").val());
    });
    function showtab(tabname) {
        $("#tabs > li").attr("class", "");
        $("#tabcontent > div").hide();
        $("#seltab").html(tabname)
        if (tabname=="xiami") {$("#tabxiami").attr("class", "active"); $("#panelxiami").show();}
        if (tabname=="m163") {$("#tabm163").attr("class", "active"); $("#panelm163").show();}
        if (tabname=="ttpod") {$("#tabttpod").attr("class", "active"); $("#panelttpod").show();}
        if (tabname=="kugou") {$("#tabkugou").attr("class", "active"); $("#panelkugou").show();}
        $("#pages").show();
    }
    $("#widget_search_submit").click(function() {
        widgetGet($("#widget_search_input").val());
    });
    $("#searchSubmit").click(function() {
        searchSong($("#searchContent").val());
    });
    $("#searchResult").on("click", "#tabxiami", function() {
        showtab("xiami");
    });
    $("#searchResult").on("click", "#tabm163", function() {
        showtab("m163");
    });
    $("#searchResult").on("click", "#tabttpod", function() {
        showtab("ttpod");
    });
    $("#searchResult").on("click", "#tabkugou", function() {
        showtab("kugou");
    });
});
    function listen(type, link) {
        var scrwidth = (screen.width-50 < 430?screen.width-50:430);
        $("#listen").html('<center><iframe src="./'+type+'player/'+link+'/" frameborder="0" scrolling="0" width="'+scrwidth+'" height="200" allowtransparency></iframe></center>');
        $("#listenpanel").modal();
    }