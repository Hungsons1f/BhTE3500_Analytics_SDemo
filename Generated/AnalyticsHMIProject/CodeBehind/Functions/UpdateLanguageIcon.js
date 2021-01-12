// Provider for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Provider for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var UpdateLanguageIcon = function (NavBar,Locale) {
        if (!NavBar)
            return;

        if (!Locale)
            return;

        if (NavBar.getType() !== "TcHmi.Controls.ResponsiveNavigation.TcHmiNavigationBar")
            return;   

        var data = NavBar.getMenuSourceDataRaw();  

        if (!data)
            return;       

        var icon;

        for (var i = 0; i < data[0].children.length; i++) {
            if (data[0].children[i].children) {
                for (var j = 0; j < data[0].children[i].children.length; j++) {
                    if (data[0].children[i].children[j].parameter === Locale) {
                        icon = data[0].children[i].children[j].image;
                        break;
                    }
                }
            }
        }

        if (icon) {
            data[0].image = icon;
            NavBar.setMenuSourceData(data);
        }
    };
    
    TcHmi.Functions.registerFunction('UpdateLanguageIcon', UpdateLanguageIcon);
})(TcHmi);