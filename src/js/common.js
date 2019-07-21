$('.header-slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
});

// function range() {
//     val = $('#range').val();
//     $('#range').css({
//         'background': '-webkit-linear-gradient(left ,#00b2b2 0%,#00b2b2 ' + val + '%,#fff ' + val + '%, #fff 100%)'
//     });
// }
$(function() {
    $("#datepicker").datepicker();
});
$(function() {
    $("#slider-range-max").slider({
        range: "max",
        min: 1,
        max: 10,
        value: 2,
        slide: function(event, ui) {
            $("#amount").val(ui.value);
        }
    });
    $("#amount").val($("#slider-range-max").slider("value"));
});
$(function() {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function(event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1));
});