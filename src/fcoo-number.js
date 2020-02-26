/****************************************************************************
	fcoo-number.js,

	(c) 2017, FCOO

	https://github.com/FCOO/fcoo-number
	https://github.com/FCOO

****************************************************************************/

(function ($, window/*, document, undefined*/) {
	"use strict";

	//Create fcoo-namespace
    var ns = window.fcoo = window.fcoo || {};

    ns.number = ns.number || {};

    //Options for the 6 posible formats. Placed in seperate namespace

    var NumeralJsDelimiters = ns.NumeralJsDelimiters = {
            NONE_COMMA : { thousands: '',  decimal: ',', example:'1000,123'  },
            SPACE_COMMA: { thousands: ' ', decimal: ',', example:'1 000,123' },
            DOT_COMMA  : { thousands: '.', decimal: ',', example:'1.000,123' },

            NONE_DOT   : { thousands: '',  decimal: '.', example:'1000.123'  },
            SPACE_DOT  : { thousands: ' ', decimal: '.', example:'1 000.123' },
            COMMA_DOT  : { thousands: ',', decimal: '.', example:'1,000.123' },
        },

        //Determinate the default decimal separator
        n = 1.1,
        s = n.toLocaleString(),
        defaultDelimiters = s.indexOf(',') > -1 ? 'NONE_COMMA' : 'NONE_DOT';

    /***********************************************************
    Set up and load number-formats (delimiters) via fcoo.globalSetting
    ***********************************************************/
    ns.globalSetting.add({
        id          : 'number',
        validator   : function( delimitersId ){
                          delimitersId = delimitersId ? delimitersId.toUpperCase() : null;
                          return NumeralJsDelimiters[delimitersId] !== null;
                      },
        applyFunc   : function( delimitersId ){
                          delimitersId = delimitersId ? delimitersId.toUpperCase() : null;
                          var delimiters = NumeralJsDelimiters[delimitersId];
                          if (delimiters)
                              $.each( window.numeral.locales, function( key, options ){
                                  options.delimiters.thousands = delimiters.thousands;
                                  options.delimiters.decimal   = delimiters.decimal;
                          });
                      },
        defaultValue: defaultDelimiters,
        callApply   : true,
    });

    //Create content for globalSetting modal-form
    var items = [];
    $.each(NumeralJsDelimiters, function(id, data){
        items.push({id: id, text: data.example, textClass: 'text-monospace'});
    });
    ns.globalSetting.addModalContent(ns.events.NUMBERFORMATCHANGED, {
        id    : 'number',
        type  : 'selectlist',
        center: true,
        items : items
    });

/*
    ns._setDelimiters = function( thousands, decimal ){
        $.each( window.numeral.locales, function( key, options ){
            options.delimiters.thousands = thousands;
            options.delimiters.decimal   = decimal;
        });
    };
*/

    /**************************************************
    numberFixedWidth
    Convert value to a string where the number of digits in the string
    is <= nrOfDigits unless value >= power(10, nrOfDigits+1)
    Example with nrOfDigits == 4:
    1.2345  => "1.234"
    12.345  => "12.34"
    123.45  => "123.4"
    1234.5  => "1235"
    12345   => "12345"

    removeTrailingZeros = false: 1.2 => "1.200"
    removeTrailingZeros = true : 1.2 => "1.2"

    **************************************************/
    function log10( value ){
        return Math.log10 ? Math.log10(value) : Math.log(value) / Math.LN10;
    }

    ns.number.numberFixedWidth = function( value, nrOfDigits, removeTrailingZeros ){
        //Example value = -13.57
        var sign = value < 0 ? '-' : '';
        value = Math.abs(value);

        var digits    = Math.max(0, Math.floor(1 + log10(value)) ),
            decimals  = Math.min(nrOfDigits, Math.max(0, nrOfDigits - digits)),
            factor    = Math.pow(10, decimals),
            formatStr = '0,0';

        value = Math.round( value*factor ) / factor;

        //If decimals is needed..
        if ((value != Math.floor(value)) || !removeTrailingZeros){
            formatStr += '.' + (new String('0000000000')).slice(0,decimals);
        }
        else
            removeTrailingZeros = false;

        var result = window.numeral(value).format(formatStr);

        if (removeTrailingZeros)
            result = result.replace(/0+$/gm, "");

        return sign + result;
    };

/* test
//$.each([0, 0.129, 1, 1.002, 1.2, 10, 12.51, 100, 120.91, -500.99, 999.11, 1000, 1001.99, 12345.678], function(index, value){
$.each([0, 0.1, 1, 10, 100, 1000, 10000, 100000, 1000000], function(index, value){
    value = value;// + .1;
    console.log(value,'=>', ns.number.numberFixedWidth(value, 4), ns.number.numberFixedWidth(value, 4, true));
});
//*/

}(jQuery, this, document));