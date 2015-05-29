var applescript = require("applescript");

var getWindowsScript = 'tell application "System Events" to get window of processes whose visible is true'
var getControlsScript = 'tell application "System Events" to tell process "{app}" to get entire contents of window {window}';

var titleEx = /window "(.*?)"/;
var numberEx = /window (\d*)/;
var appEx = /application process "(.*?)"/;

getWindows(function(windows)
{
	console.log(windows);
});

function getWindows(callback)
{
	applescript.execString(getWindowsScript, function(err, rtn)
	{
		var windowArray = [];
		for (var i in rtn)
		{
			for (var x in rtn[i])
			{
				var title = titleEx.exec(rtn[i][x]);
				var app = appEx.exec(rtn[i][x]);
				var number;
				var thisWindow;

				//If no title, pass window number.
				if (title === null)
				{
					number = numberEx.exec(rtn[i][x]);

					thisWindow = 
                    {
						"app": app[1],
						"title": "",
						"number": number[1]
					};
				}
				else
				{
					thisWindow = 
                    {
						"app": app[1],
						"title": title[1]
					};
				}

				windowArray.push(thisWindow);
			}
		}

		callback(windowArray);
	});
}