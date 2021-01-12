// Keep these lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="../../../Packages/Beckhoff.TwinCAT.HMI.Framework.1.12.604/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (TcHmi) {

    var CurrentTime = function (TimerControl) {

        if (!TimerControl)
            return;

        if (TimerControl.getType() !== "TcHmi.Controls.Analytics.Timer")
            return;

        var data = TimerControl.__dateTime;

        let newDate = new Date();

        let timer;

        function updateClock() {
            newDate = new Date();
            var newData = data;
            newData.wYear = newDate.getFullYear();
            newData.wMonth = newDate.getMonth() + 1;
            newData.wDay = newDate.getDate();
            newData.wDayOfWeek = newDate.getDay();
            newData.wHour = newDate.getHours();
            newData.wMinute = newDate.getMinutes();
            newData.wSecond = newDate.getSeconds();
            newData.wMilliseconds = 0;
            newData.wNanoseconds = 0;

            TimerControl.setTimeType("Timespan");
            TimerControl.setDateTime(newData);
            TimerControl.setTimeType("Datetime");
        }

        timer = setInterval(updateClock, 1000);

    };

    TcHmi.Functions.registerFunction('UpdateTime', CurrentTime);
})(TcHmi);