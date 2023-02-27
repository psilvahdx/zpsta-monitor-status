/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"portoseguro/zpsta_statusmon/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
