// Provider for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

(function (TcHmi) {

    var StringInt = function (valueString, Increment) {

        if (!valueString)
            return;

        if (!Increment)
            return;

        var int = parseInt(valueString);
        var e = int;
        e = e + Increment;
        if (e < 0) {
            e = 0;
        }
        return e.toString();     

    };

    TcHmi.Functions.registerFunction('StringToInt', StringInt);
})(TcHmi);