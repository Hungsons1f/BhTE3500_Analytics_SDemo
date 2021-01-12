// Provider for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

(function (TcHmi) {

    var ImageSliderResize = function ImageSliderResize(Control, mobile, width, HMIControl) {

        if (!Control)
            return;

        if (Control.getType() === "TcHmi.Controls.System.TcHmiGrid") {

            var data = Control.getColumnOptions();

            if (!data)
                return;
            data[0].widthUnit = "px";
            data[2].widthUnit = "px";
            data[1].widthUnit = "px";

            if (mobile) {
                data[0].width = 0;
                data[2].width = 0;
                data[1].width = width * 9 / 10;
            }
            else {
                data[0].width = width * 29/100;
                data[1].width = width * 29 / 100;
                data[2].width = width * 29 / 100;
            }

            Control.setColumnOptions(data);

            if (HMIControl !== null) {
                var colIndex = HMIControl.getGridColumnIndex();

                if (colIndex < 3) {
                    var cellWidth = width * 29 / 100 - 10;
                    var newWidth = cellWidth;
                    if (mobile) {
                        cellWidth = width * 9 / 10 - 10;
                        newWidth = cellWidth;
                        if (colIndex === 0 || colIndex === 2){
                            newWidth = 0;
                        }
                    }
                    else {
                        if (colIndex === 0 || colIndex === 2) {
                            newWidth = newWidth * 0.75;
                        }
                    }

                    var oldWidth = HMIControl.getMaxWidth();

                    if (oldWidth > newWidth) {
                        var factor = newWidth / oldWidth;
                        HMIControl.setWidth(newWidth);
                        HMIControl.setHeight(HMIControl.getMaxHeight() * factor);
                    }
                    else {
                        HMIControl.setWidth(HMIControl.getMaxWidth());
                        HMIControl.setHeight(HMIControl.getMaxHeight());
                    }
                    HMIControl.setLeft(5 + (cellWidth - HMIControl.getWidth()) / 2);
                }
            }
            else {
                for (var i = 0; i < Control.getChildren().length; i++) {
                    colIndex = Control.getChildren()[i].getGridColumnIndex();

                    if (colIndex < 3) {
                        cellWidth = width * 29 / 100 - 10;
                        newWidth = cellWidth;
                        if (mobile) {
                            cellWidth = width * 9 / 10 - 10;
                            newWidth = cellWidth;
                            if (colIndex === 0 || colIndex === 2) {
                                continue;
                            }
                        }
                        else {
                            if (colIndex === 0 || colIndex === 2) {
                                newWidth = newWidth * 0.75;
                            }
                        }

                        oldWidth = Control.getChildren()[i].getMaxWidth();

                        if (oldWidth > newWidth) {
                            factor = newWidth / oldWidth;
                            Control.getChildren()[i].setWidth(newWidth);
                            Control.getChildren()[i].setHeight(Control.getChildren()[i].getMaxHeight() * factor);
                        }
                        else {
                            Control.getChildren()[i].setWidth(Control.getChildren()[i].getMaxWidth());
                            Control.getChildren()[i].setHeight(Control.getChildren()[i].getMaxHeight());
                        }
                        Control.getChildren()[i].setLeft(5 + (cellWidth - Control.getChildren()[i].getWidth()) / 2);

                    }
                    else {
                        continue;
                    }
                }
            }
        }
        else if (Control.getType() === "TcHmi.Controls.Beckhoff.TcHmiButton") {
            
            if (mobile) {
                data = "None";
            }
            else {
                data = "Theme";
            }
            Control.setBackgroundColor(data);

            data = Control.getWidth();
            if (!data)
                return;

            if (mobile) {
                data = 30;
            }
            else {
                data = 70;
            }
            Control.setWidth(data);
        }
        else {
            return;
        }

    };

    TcHmi.Functions.registerFunction('ImageSliderResize', ImageSliderResize);
})(TcHmi);