# fcoo-number
>
[Numeral.js]:http://numeraljs.com/

## Description
Using [Numeral.js] to defines different formats for numbers and load and save selected formats

Add methods `window.fcoo.number.numberFixedWidth( value, nrOfDigits, removeTrailingZeros )`

## Installation
### bower
`bower install https://github.com/FCOO/fcoo-number.git --save`

## Demo
http://FCOO.github.io/fcoo-number/demo/ 

## Usage

### `window.fcoo.number.numberFixedWidth( value, nrOfDigits, removeTrailingZeros )`

Convert value to a string where the number of digits in the string is <= `nrOfDigits` unless `value >= power(10, nrOfDigits+1)`

Example with `nrOfDigits == 4`:


`1.2345  => "1.234"`
`12.345  => "12.34"`
`123.45  => "123.4"`
`1234.5  => "1235"`
`12345   => "12345"`

`removeTrailingZeros = false: 1.2 => "1.200"`
`removeTrailingZeros = true : 1.2 => "1.2"`




### Format

See [Numeral.js] on how to format numbers

The following 6 formats for delimiters are supported

The format is selected using [fcoo-settings](https://github.com/FCOO/fcoo-settings) with id=`number`
    
    fcoo.settings.set( "number", "SPACE_COMMA" )

| Id | Thousands | Decimal | Example |
| :--: | :--: | :--: | --- |
| `"NONE_DOT"`   | `""` | `"."`| `1000.123` |
| `"NONE_COMMA"` | `""` | `","`| `1000,123` |
| `"SPACE_DOT"`  | `" "`| `"."`| `1 000.123` |
| `"SPACE_COMMA"`| `" "`| `","`| `1 000,123` |
| `"COMMA_DOT"`  | `","`| `"."`| `1,000.123` |
| `"DOT_COMMA"`  | `"."`| `","`| `1.000,123` |



## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/fcoo-number/LICENSE).

Copyright (c) 2017 [FCOO](https://github.com/FCOO)

## Contact information

Niels Holt nho@fcoo.dk

