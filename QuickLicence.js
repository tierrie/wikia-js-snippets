//<nowiki>
// BEGIN MW GADGET
/*
 * QLicense.js, [originally] by User:Cakemix,
 * then decoded, formatted, and shortened by Monchoman45,
 * and then further modified by Sactage.
 */

function QLicenseUI() {
	var options = {
		'{{PD}}': 'Public domain',
		'{{Copyrighted Media}}': 'Game Screenshot',
		'{{Fairuse}}': 'Fair use'
	};
	var optstr = '';
	for ( i in options ) {
		if ( options.hasOwnProperty( i ) ) {
			optstr += '<option value="' + i + '" style="text-align:center;">' + options[i] + '</option>';
		}
	}

	var html = '<p style="text-align:center;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Add license</a>';
	if($('#LicensedFile').length || $('#Copyright').length) {
		html += '&nbsp;<span style="color:red; font-weight:bold; text-align:center;">This file is licensed.</span></p>';
	} else {
		html += '&nbsp;<span style="color:green; font-weight:bold; text-align:center;">This file is not licensed.</span></p>';
	}
	$('#filetoc').append(html);
	$('#aSubmit').click( function(event) {
		this.innerHTML = '<img src="http://images2.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		$.post("/api.php", {action: "edit", title: mw.config.get("wgPageName"), token: mw.user.tokens.values.editToken, bot: true, appendtext: $("#QLicenseSelect").val(), summary: "Licensing image."}, function (result) {
			window.location = wgServer + '/index.php?title=' + mw.config.get("wgPageName") + '&action=purge';
		});
	});
}

if (wgCanonicalNamespace == 'File') {
	addOnloadHook(QLicenseUI);
}
// END MW GADGET
// </nowiki>
