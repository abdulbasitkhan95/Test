$(document).ready(function() {
    var table = $('#leaveTable').DataTable({
        "paging": "simple",
        "searching": false,
        "info": false,
        "pagingType": "simple_numbers",
        "destroy": true,
        "pageLength": 5,
        "columnDefs": [
            { "orderable": false, "targets": [0, 5] },
            { "width": "2%", "targets": 0 },
            { "width": "20%", "targets": 1 },
            { "width": "20%", "targets": 2 },
            { "width": "10%", "targets": 3 },
            { "width": "15%", "targets": 4 },
            { "width": "25%", "targets": 5 },
        ],
    });

    $('.next-page').on('click', function() {
        table.page('next').draw('page');
        updatePageInfo();
    });

    $('.previous-page').on('click', function() {
        table.page('previous').draw('page');
        updatePageInfo();
    });

    function updatePageInfo() {
        var info = table.page.info();
        var paginationText = (info.start + 1) + " - " + info.end + " OF " + info.recordsTotal;
        $('.custom-number').text(paginationText);
    }

    updatePageInfo();

    var currentDate = new Date();
    $(".date-picker").datepicker({
        dateFormat: "MM d, yy", 
        changeMonth: true,   
        changeYear: true,    
        showButtonPanel: true, 
        defaultDate: currentDate, 
        onClose: function(dateText, inst) {
            
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).datepicker('setDate', new Date(year, month, currentDate.getDate()));
        }
    }).datepicker('setDate', currentDate); 

    
    $('.cal-prev').click(function() {
        var date = $('.date-picker').datepicker('getDate');
        date.setMonth(date.getMonth() - 1);
        date.setDate(currentDate.getDate()); 
        $('.date-picker').datepicker('setDate', date);
    });

    $('.cal-next').click(function() {
        var date = $('.date-picker').datepicker('getDate');
        date.setMonth(date.getMonth() + 1);
        date.setDate(currentDate.getDate()); 
        $('.date-picker').datepicker('setDate', date);
    });

    
    function updateMonthYearDisplay() {
        var date = $('.date-picker').datepicker('getDate');
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        $('.date-picker').val(date.toLocaleDateString('en-US', options));
    }

    updateMonthYearDisplay();



    $(".approve-btn, .reject-btn").click(function() {
        $(".popup").removeClass("d-none");
    });

    $(".close, .btn-confirm, .btn-reject").click(function() {
        $(".popup").addClass("d-none");
    });


    $(".expand").click(function() {
        if($(window).width() < 576) {
            $("body").toggleClass("responsive-toggle");
        } else {
            $("body").toggleClass("toggle-body");
        }
    });

    $(".hamburger").click(function() {
        $("body").toggleClass("responsive-toggle");
    });

});

$('.select-all').click(function() {
    if ($(this).is(':checked')) {
        $('td input').attr('checked', true);
    } else {
        $('td input').attr('checked', false);
    }
});