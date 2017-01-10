/****************************************************************************
	fcoo-number.js, 

	(c) 2017, FCOO

	https://github.com/FCOO/fcoo-number
	https://github.com/FCOO

****************************************************************************/

(function ($, window/*, document, undefined*/) {
	"use strict";
	
	//Create fcoo-namespace
    window.fcoo = window.fcoo || {};
    var ns = window.fcoo; 

    //Options for the 6 posible formats. Placed in seperate namespace

    var NumeralJsDelimiters = ns.NumeralJsDelimiters = {
       NONE_DOT   : { thousands: '',  decimal: '.', example:'1000.123'  },
       NONE_COMMA : { thousands: '',  decimal: ',', example:'1000,123'  },

       SPACE_DOT  : { thousands: ' ', decimal: '.', example:'1 000.123'  },
       SPACE_COMMA: { thousands: ' ', decimal: ',', example:'1 000,123'  },

       COMMA_DOT  : { thousands: ',', decimal: '.', example:'1,000.123' },
       DOT_COMMA  : { thousands: '.', decimal: ',', example:'1.000,123' },
    },

    //Determinate the default decimal separator
        n = 1.1,
        s = n.toLocaleString(),
        defaultDelimiters = s.indexOf(',') > -1 ? 'NONE_COMMA' : 'NONE_DOT';
    
    /***********************************************************
    Set up and load number-formats (delimiters) via fcoo.settings
    ***********************************************************/
    ns.settings.add({
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
        callApply   : true
    });


    //Define two new formats to convert distances in meter to kilometer or nautical miles
    function numeralFormat( name, unit, factor ){
        var regExp  = new RegExp('('+unit+')'),  // = /(km)/
            regExp2 = new RegExp('\s?\\' + unit);  // = /\s?\km/

        window.numeral.register('format', name, {
            regexps: {
                format  : regExp, // /(km)/,
                unformat: regExp  ///(km)/
            },
            format: function(value, format, roundingFunction) {
                var space = window.numeral._.includes(format, ' ' + unit) ? ' ' : '',
                    output;
                value = value / factor;

                // check for space before 
                format = format.replace(regExp2, '');
                output = window.numeral._.numberToFormat(value, format, roundingFunction);

                if (window.numeral._.includes(output, ')')) {
                    output = output.split('');
                    output.splice(-1, 0, space + unit);
                    output = output.join('');
                } else {
                    output = output + space + unit;
                }

                return output;
            },
            unformat: function(string) {
                return window.numeral._.stringToNumber(string) * factor;
            }
        });
    }

    numeralFormat( 'kilometer', 'km', 1000 );
    numeralFormat( 'nautical',  'nm', 1862 );

/*
    ns._setDelimiters = function( thousands, decimal ){
        $.each( window.numeral.locales, function( key, options ){
            options.delimiters.thousands = thousands;
            options.delimiters.decimal   = decimal;
        });
    };
*/


}(jQuery, this, document));