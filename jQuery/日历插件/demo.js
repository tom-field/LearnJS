
    $(document).ready(function () {

        //  $("#hid").timepicker();
        $("#start").timepicker({ dateFormat: 'yy-mm-dd', timeFormat: 'hh:mm', hourMin: 5, hourMax: 24, hourGrid: 3, minuteGrid: 15, timeText: 'ʱ��', hourText: 'ʱ', minuteText: '��', timeOnlyTitle: 'ѡ��ʱ��', onClose: function (dateText, inst) {
            if ($('#start').val() != '') {
                var testStartDate = $('#start').datetimepicker('getDate');
                var testEndDate = $('#end').datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    $('#end').datetimepicker('setDate', testStartDate);
            } else {
                $('#end').val(dateText);
            }
        },
            onSelect: function (selectedDateTime) {
                $('#end').datetimepicker('option', 'minDate', $('#end').datetimepicker('getDate'));
            }
        });
        $("#end").datetimepicker({ dateFormat: 'yy-mm-dd', hourMin: 5, hourMax: 23, hourGrid: 3, minuteGrid: 15, timeText: 'ʱ��', hourText: 'ʱ', minuteText: '��', onClose: function (dateText, inst) {
            if ($('#start').val() != '') {
                var testStartDate = $('#start').datetimepicker('getDate');
                var testEndDate = $("#end").datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    $('#start').datetimepicker('setDate', testEndDate);
            } else {
                $('#start').val(dateText);
            }
        },
            onSelect: function (selectedDateTime) {
                $('#start').timepicker('option', 'maxDate', $("#end").timepicker('getDate'));
            }
        });
        $("#addhelper").hide();

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $('#calendar').fullCalendar({
            theme: true,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },

            monthNames: ["һ��", "����", "����", "����", "����", "����", "����", "����", "����", "ʮ��", "ʮһ��", "ʮ����"],
            monthNamesShort: ["һ��", "����", "����", "����", "����", "����", "����", "����", "����", "ʮ��", "ʮһ��", "ʮ����"],
            dayNames: ["����", "��һ", "�ܶ�", "����", "����", "����", "����"],
            dayNamesShort: ["����", "��һ", "�ܶ�", "����", "����", "����", "����"],
            today: ["����"],
            firstDay: 1,
            buttonText: {
                today: '����',
                month: '��',
                week: '��',
                day: '��',
                prev: '��һ��',
                next: '��һ��'
            },
            viewDisplay: function (view) {//��̬�����ݲ���������·ݶ�̬��ѯ
                var viewStart = $.fullCalendar.formatDate(view.start, "yyyy-MM-dd HH:mm:ss");
                var viewEnd = $.fullCalendar.formatDate(view.end, "yyyy-MM-dd HH:mm:ss");
                $("#calendar").fullCalendar('removeEvents');
                $.post("http://www.cnblogs.com/sr/AccessDate.ashx", { start: viewStart, end: viewEnd }, function (data) {

                    var resultCollection = jQuery.parseJSON(data);
                    $.each(resultCollection, function (index, term) {
                        $("#calendar").fullCalendar('renderEvent', term, true);
                    });

                }); //�ѴӺ�̨ȡ�������ݽ��з�װ�Ժ���ҳ������fullCalendar�ķ�ʽ������ʾ
            },
            editable: true,//�жϸ��ճ��ܷ��϶�
            dayClick: function (date, allDay, jsEvent, view) {//���ڵ���󵯳���jq ui�Ŀ�����ճ̼�¼
                var selectdate = $.fullCalendar.formatDate(date, "yyyy-MM-dd");//ѡ��ǰ���ڵ�ʱ��ת��
                $("#end").datetimepicker('setDate', selectdate);//��ʱ��ռ丳ֵ
                $("#reservebox").dialog({
                    autoOpen: false,
                    height: 450,
                    width: 400,
                    title: 'Reserve meeting room on ' + selectdate,
                    modal: true,
                    position: "center",
                    draggable: false,
                    beforeClose: function (event, ui) {
                        //$.validationEngine.closePrompt("#meeting");
                        //$.validationEngine.closePrompt("#start");
                        //$.validationEngine.closePrompt("#end");
                    },
                    timeFormat: 'HH:mm{ - HH:mm}',

                    buttons: {
                        "close": function () {
                            $(this).dialog("close");
                        },
                        "reserve": function () {

                            var startdatestr = $("#start").val(); //��ʼʱ��
                            var enddatestr = $("#end").val(); //����ʱ��
                            var confid = $("#title").val(); //����
                            var det = $("#details").val(); //����
                            var cd = $("#chengdu").val(); //��Ҫ�̶�
                            var id2;
                            var startdate = $.fullCalendar.parseDate(selectdate + "T" + startdatestr);//ʱ�������ƴ��
                            var enddate = $.fullCalendar.parseDate(enddatestr);
                            var schdata = { title: confid, fullname: confid, description: det, confname: cd, confshortname: 'M1', start: selectdate + ' ' + startdatestr, end: enddatestr };
                            $.ajax({
                                type: "POST", //ʹ��post�������ʺ�̨

                                url: "http://www.cnblogs.com/sr/getallid.ashx", //Ҫ���ʵĺ�̨��ַ
                                data: schdata, //Ҫ���͵�����
                                success: function (data) {
                                    //�Ի�������������ύ��ɣ�dataΪ�������
                                    id2 = data;
                                    var schdata2 = { title: confid, fullname: confid, description: det, confname: cd, confshortname: 'M1', start: selectdate + ' ' + startdatestr, end: enddatestr, id: id2 };
                                    $('#calendar').fullCalendar('renderEvent', schdata2, true);
                                    $("#start").val(''); //��ʼʱ��
                                    $("#end").val(''); //����ʱ��
                                    $("#title").val(''); //����
                                    $("#details").val(''); //����
                                    $("#chengdu").val(''); //��Ҫ�̶�

                                }
                            });


                            $(this).dialog("close");


                        }

                    }
                });
                $("#reservebox").dialog("open");
                return false;
            },

            loading: function (bool) {
                if (bool) $('#loading').show();
                else $('#loading').hide();
            },
            eventAfterRender: function (event, element, view) {//���ݰ���ȥ�������Ӧ��Ϣ��ҳ����
                var fstart = $.fullCalendar.formatDate(event.start, "HH:mm");
                var fend = $.fullCalendar.formatDate(event.end, "HH:mm");


                var confbg = '';
                if (event.confid == 1) {
                    confbg = confbg + '<span class="fc-event-bg"></span>';
                } else if (event.confid == 2) {
                    confbg = confbg + '<span class="fc-event-bg"></span>';
                } else if (event.confid == 3) {
                    confbg = confbg + '<span class="fc-event-bg"></span>';
                } else if (event.confid == 4) {
                    confbg = confbg + '<span class="fc-event-bg"></span>';
                } else if (event.confid == 5) {
                    confbg = confbg + '<span class="fc-event-bg"></span>';
                } else if (event.confid == 6) {
                    confbg = confbg + '<span class="fc-event-bg"></span>';
                } else {
                    confbg = confbg + '<span class="fc-event-bg"></span>';
                }

                //  var titlebg = '<span class="fc-event-conf" style="background:' + event.confcolor + '">' + event.confshortname + '</span>';

//                if (event.repweeks > 0) {
//                    titlebg = titlebg + '<span class="fc-event-conf" style="background:#fff;top:0;right:15;color:#3974BC;font-weight:bold">R</span>';
//                }

                if (view.name == "month") {//���·�
                    var evtcontent = '<div class="fc-event-vert"><a>';
                    evtcontent = evtcontent + confbg;
                    evtcontent = evtcontent + '<span class="fc-event-titlebg">' + fstart + " - " + fend + event.fullname + '</span>';

                    element.html(evtcontent);
                } else if (view.name == "agendaWeek") {//����
                    var evtcontent = '<a>';
                    evtcontent = evtcontent + confbg;
                    evtcontent = evtcontent + '<span class="fc-event-time">' + fstart + "-" + fend  + '</span>';
                    evtcontent = evtcontent + '<span>'+ event.fullname + '</span>';

                    element.html(evtcontent);
                } else if (view.name == "agendaDay") {//����
                    var evtcontent = '<a>';
                    evtcontent = evtcontent + confbg;
                    evtcontent = evtcontent + '<span class="fc-event-time">' + fstart + " - " + fend +  '</span>';
                    //              evtcontent = evtcontent + '<span>Room: ' + event.confname + '</span>';
                    //                evtcontent = evtcontent + '<span>Host: ' + event.fullname + '</span>';
//                    evtcontent = evtcontent + '<span>Topic: ' + event.topic + '</span>';
                    // evtcontent = evtcontent + '</a><span class="ui-icon ui-icon-arrow-2-n-s"><div class="ui-resizable-handle ui-resizable-s"></div></span>';
                    element.html(evtcontent);
                }
            },
            eventMouseover: function (calEvent, jsEvent, view) {
                var fstart = $.fullCalendar.formatDate(calEvent.start, "yyyy/MM/dd HH:mm");
                var fend = $.fullCalendar.formatDate(calEvent.end, "yyyy/MM/dd HH:mm");
                $(this).attr('title', fstart + " - " + fend + " " + "����" + " : " + calEvent.title);
                $(this).css('font-weight', 'normal');
                $(this).tooltip({
                    effect: 'toggle',
                    cancelDefault: true
                });
            },

            eventClick: function (event) {
                var fstart = $.fullCalendar.formatDate(event.start, "HH:mm");
                var fend = $.fullCalendar.formatDate(event.end, "HH:mm");
                //  var schdata = { sid: event.sid, deleted: 1, uid: event.uid };
                var selectdate = $.fullCalendar.formatDate(event.start, "yyyy-MM-dd");
                $("#start").val(fstart); ;
                $("#end").datetimepicker('setDate', event.end);


                $("#title").val(event.title); //����
                $("#details").val(event.description); //����
                $("#chengdu").val(event.confname); //��Ҫ�̶�



                $("#reservebox").dialog({
                    autoOpen: false,
                    height: 450,
                    width: 400,
                    title: 'Reserve meeting room on ',
                    modal: true,
                    position: "center",
                    draggable: false,
                    beforeClose: function (event, ui) {
                        //$.validationEngine.closePrompt("#meeting");
                        //$.validationEngine.closePrompt("#start");
                        //$.validationEngine.closePrompt("#end");
                        $("#start").val(''); //��ʼʱ��
                        $("#end").val(''); //����ʱ��
                        $("#title").val(''); //����
                        $("#details").val(''); //����
                        $("#chengdu").val(''); //��Ҫ�̶�
                    },
                    timeFormat: 'HH:mm{ - HH:mm}',

                    buttons: {
                        "ɾ��": function () {
                            var aa = window.confirm("���棺ȷ��Ҫɾ����¼��ɾ�����޷��ָ���");
                            if (aa) {
                                var para = { id: event.id };


                                $.ajax({
                                    type: "POST", //ʹ��post�������ʺ�̨

                                    url: "http://www.cnblogs.com/sr/removedate.ashx", //Ҫ���ʵĺ�̨��ַ
                                    data: para, //Ҫ���͵�����
                                    success: function (data) {
                                        //�Ի�������������ύ��ɣ�dataΪ�������


                                        $('#calendar').fullCalendar('removeEvents', event.id);
                                    }


                                });

                            }
                            $(this).dialog("close");
                        },
                        "reserve": function () {

                            var startdatestr = $("#start").val(); //��ʼʱ��
                            var enddatestr = $("#end").val(); //����ʱ��
                            var confid = $("#title").val(); //����
                            var det = $("#details").val(); //����
                            var cd = $("#chengdu").val(); //��Ҫ�̶�
                            var startdate = $.fullCalendar.parseDate(selectdate + "T" + startdatestr);
                            var enddate = $.fullCalendar.parseDate(enddatestr);

                            event.fullname = confid;
                            event.confname = cd;
                            event.start = startdate;
                            event.end = enddate;
                            event.description = det;
                            var id2;

                            var schdata = { title: confid, fullname: confid, description: det, confname: cd, confshortname: 'M1', start: selectdate + ' ' + startdatestr, end: enddatestr, id: event.id };
                            $.ajax({
                                type: "POST", //ʹ��post�������ʺ�̨

                                url: "http://www.cnblogs.com/sr/Updateinfo.ashx", //Ҫ���ʵĺ�̨��ַ
                                data: schdata, //Ҫ���͵�����
                                success: function (data) {
                                    //�Ի�������������ύ��ɣ�dataΪ�������

                                    var schdata2 = { title: confid, fullname: confid, description: det, confname: cd, confshortname: 'M1', start: selectdate + ' ' + startdatestr, end: enddatestr, id: event.id };
                                    $('#calendar').fullCalendar('updateEvent', event);
                                }
                            });





                            $(this).dialog("close");
                        }

                    }
                });
                $("#reservebox").dialog("open");
                return false;
            },
            //            events: "http://www.cnblogs.com/sr/AccessDate.ashx"
            events: []
        });



        //goto date function
        if ($.browser.msie) {
            $("#calendar .fc-header-right table td:eq(0)").before('<td><div class="ui-state-default ui-corner-left ui-corner-right" style="border-right:0px;padding:1px 3px 2px;" ><input type="text" id="selecteddate" size="10" style="padding:0px;"></div></td><td><div class="ui-state-default ui-corner-left ui-corner-right"><a><span id="selectdate" class="ui-icon ui-icon-search">goto</span></a></div></td><td><span class="fc-header-space"></span></td>');
        } else {
            $("#calendar .fc-header-right table td:eq(0)").before('<td><div class="ui-state-default ui-corner-left ui-corner-right" style="border-right:0px;padding:3px 2px 4px;" ><input type="text" id="selecteddate" size="10" style="padding:0px;"></div></td><td><div class="ui-state-default ui-corner-left ui-corner-right"><a><span id="selectdate" class="ui-icon ui-icon-search">goto</span></a></div></td><td><span class="fc-header-space"></span></td>');
        }

        $("#selecteddate").datepicker({
            dateFormat: 'yy-mm-dd',
            beforeShow: function (input, instant) {
                setTimeout(
                    function () {
                        $('#ui-datepicker-div').css("z-index", 15);
                    }, 100
                );
            }
        });



        $("#selectdate").click(function () {
            var selectdstr = $("#selecteddate").val();
            var selectdate = $.fullCalendar.parseDate(selectdstr, "yyyy-mm-dd");
            $('#calendar').fullCalendar('gotoDate', selectdate.getFullYear(), selectdate.getMonth(), selectdate.getDate());
        });


        // conference function
        $("#calendar .fc-header-left table td:eq(0)").before('<td><div class="ui-state-default ui-corner-left ui-corner-right" id="selectmeeting"><a><span id="selectdate" class="ui-icon ui-icon-search" style="float: left;padding-left: 5px; padding-top:1px"></span>meeting room</a></div></td><td><span class="fc-header-space"></span></td>');



        //        $(".fc-button-prev").click(function () {
        //            alert("fasdf");
        //        });

    });

