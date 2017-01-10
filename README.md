# fcoo-number
>
[Numeral.js]:http://numeraljs.com/

## Description
Using [Numeral.js] to defines different formats for numbers and load and save selected formats
Adds two new formats for distances: `km` and `nm`

## Installation
### bower
`bower install https://github.com/FCOO/fcoo-number.git --save`

## Demo
http://FCOO.github.io/fcoo-number/demo/ 

## Usage

See [Numeral.js] on how to format numbers

Two new formats are added:
### `km`
Convert distances in meter to kilometer 

    numeral(1234.123).format("0,0.0km") //"1.2km"
    numeral("12km").value(); //12000

### `nm`
Convert distances in meter to nautical miles

    numeral(1234.123).format("0,0.0 nm") //"0.663 nm"
    numeral("12nm").value(); //22344


## Format

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

