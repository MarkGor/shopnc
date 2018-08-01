    	$(function() {
    	    var address_id = GetQueryString('address_id');
    	    var key = getcookie('key');

    	    $.ajax({
    	        type: 'post',
    	        url: ApiUrl + '/index.php?act=member_address&op=address_info',
    	        data: {
    	            key: key,
    	            address_id: address_id
    	        },
    	        dataType: 'json',
    	        success: function(result) {
    	            checklogin(result.login);

    	            var addrstr = result.datas.address_info.area_info;
    	            $('#detailaddr').html(addrstr);
                    $(".detail-d-addr").html( result.datas.address_info.address);
    	            $('input[name=true_name]').val(result.datas.address_info.true_name);
    	            $('input[name=mob_phone]').val(result.datas.address_info.mob_phone);
    	            $('input[name=tel_phone]').val(result.datas.address_info.tel_phone);

    	            $('input[name=area_id]').val(result.datas.address_info.area_id);
    	            $('input[name=city_id]').val(result.datas.address_info.city_id);
    	            $('input[name=area_info]').val(result.datas.address_info.area_info);
    	            $('.address').val(result.datas.address_info.address);
    	        }
    	    });

    	    $.ajax({
    	        type: 'post',
    	        url: ApiUrl + '/index.php?act=member_address&op=area_list',
    	        data: {
    	            key: key
    	        },
    	        dataType: 'json',
    	        success: function(result) {
    	            checklogin(result.login);
    	            var data = result.datas;
    	            var prov_html = '';
    	            for (var i = 0; i < data.area_list.length; i++) {
    	                prov_html += '<option value="' + data.area_list[i].area_id + '">' + data.area_list[i].area_name + '</option>';
    	            }
    	            $("select[name=prov]").append(prov_html);
    	        }
    	    });

    	    $("select[name=prov]").change(function() {
    	        var prov_id = $(this).val();
    	        $.ajax({
    	            type: 'post',
    	            url: ApiUrl + '/index.php?act=member_address&op=area_list',
    	            data: {
    	                key: key,
    	                area_id: prov_id
    	            },
    	            dataType: 'json',
    	            success: function(result) {
    	                checklogin(result.login);
    	                var data = result.datas;
    	                var city_html = '<option value="">请选择...</option>';
    	                for (var i = 0; i < data.area_list.length; i++) {
    	                    city_html += '<option value="' + data.area_list[i].area_id + '">' + data.area_list[i].area_name + '</option>';
    	                }
    	                $("select[name=city]").html(city_html);
    	                $("select[name=region]").html('<option value="">请选择...</option>');
    	            }
    	        });
    	    });

    	    $("select[name=city]").change(function() {
    	        var city_id = $(this).val();
    	        $.ajax({
    	            type: 'post',
    	            url: ApiUrl + '/index.php?act=member_address&op=area_list',
    	            data: {
    	                key: key,
    	                area_id: city_id
    	            },
    	            dataType: 'json',
    	            success: function(result) {
    	                checklogin(result.login);
    	                var data = result.datas;
    	                var region_html = '<option value="">请选择...</option>';
    	                for (var i = 0; i < data.area_list.length; i++) {
    	                    region_html += '<option value="' + data.area_list[i].area_id + '">' + data.area_list[i].area_name + '</option>';
    	                }
    	                $("select[name=region]").html(region_html);
    	            }
    	        });
    	    });

    	    $('#editaddress').click(function() {
    	        if ($('input[name=modifyaddr]').val() == '1') {
    	            $('input[name=modifyaddr]').val(2);
    	            $('#area').show();
    	        } else {
    	            $('input[name=modifyaddr]').val(1);
    	            $('#area').hide();
    	        }
    	    });

            $.sValid.init({
                rules:{
                    true_name:"required",
                    mob_phone:"required",
                    prov_select:"required",
                    city_select:"required",
                    region_select:"required",
                    address:"required"
                },
                messages:{
                    true_name:"姓名必填！",
                    mob_phone:"手机号必填！",
                    prov_select:"省份必填！",
                    city_select:"城市必填！",
                    region_select:"区县必填！",
                    address:"街道必填！"
                },
                callback:function (eId,eMsg,eRules){
                    if(eId.length >0){
                        var errorHtml = "";
                        $.map(eMsg,function (idx,item){
                            errorHtml += "<p>"+idx+"</p>";
                        });
                        $(".error-tips").html(errorHtml).show();
                    }else{
                         $(".error-tips").html("").hide();
                    }
                }  
            });
    	    $('.add_address').click(function() {
                if($.sValid()){
        	        var true_name = $('input[name=true_name]').val();
        	        var mob_phone = $('input[name=mob_phone]').val();
        	        var tel_phone = $('input[name=tel_phone]').val();

        	        var op = $('input[name=modifyaddr]').val();
        	        if (op == '2') {
        	            var city_id = $('select[name=city]').val();
        	            var area_id = $('select[name=region]').val();
        	            var address = $('textarea[name=address]').val();

        	            var prov_index = $('select[name=prov]')[0].selectedIndex;
        	            var city_index = $('select[name=city]')[0].selectedIndex;
        	            var region_index = $('select[name=region]')[0].selectedIndex;
        	            var area_info = $('select[name=prov]')[0].options[prov_index].innerHTML + ' ' + $('select[name=city]')[0].options[city_index].innerHTML + ' ' + $('select[name=region]')[0].options[region_index].innerHTML;


        	        } else {
        	            var city_id = $('input[name=city_id]').val();
        	            var area_id = $('input[name=area_id]').val();
        	            var address = $('input[name=address]').val();
        	            var area_info = $('input[name=area_info]').val();
        	        }


        	        $.ajax({
        	            type: 'post',
        	            url: ApiUrl + "/index.php?act=member_address&op=address_edit",
        	            data: {
        	                key: key,
        	                true_name: true_name,
        	                mob_phone: mob_phone,
        	                tel_phone: tel_phone,
        	                city_id: city_id,
        	                area_id: area_id,
        	                address: address,
        	                area_info: area_info,
        	                address_id: address_id
        	            },
        	            dataType: 'json',
        	            success: function(result) {
        	                if (result) {
        	                    location.href = WapSiteUrl + '/tmpl/member/address_list.html';
        	                } else {
        	                    location.href = WapSiteUrl;
        	                }
        	            }
        	        });
                }
    	    });
    	});