$(function () {
    $.ajax({
        url:"./select.json",
        type:"GET",
        success:function (data) {
            console.log(data);
            var _html = "";
            for(var i=0;i<data.length;i++){
                _html += "<option value="+data[i].id+">"+data[i].emp+"</option>"
            }
            var _empSelect = $(".fz_selected").attr("emp");
            if(_empSelect){
                $.ajax({
                    url:"./emp.json",
                    type:"GET",
                    success:function (data) {
                        var _html = "";
                        for(var i=0;i<data.length;i++){
                            _html += "<option value="+data[i].id+">"+data[i].emp+"</option>"
                        }
                        $("."+_empSelect).html(_html).select2();
                    }
                })
            }
                $(".fz_selected").html(_html).select2();
        }
    })
})
