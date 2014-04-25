ninja.wallets.singlewallet = {
	open: function () {
		if (document.getElementById("btcaddress").innerHTML == "") {
			ninja.wallets.singlewallet.generateNewAddressAndKey();
		}
		document.getElementById("singlearea").style.display = "block";
	},

	close: function () {
		document.getElementById("singlearea").style.display = "none";
	},

	// generate litecoin address and private key and update information in the HTML
	generateNewAddressAndKey: function () {
		try {
			var key = new Litecoin.ECKey(false);
			var litecoinAddress = key.getLitecoinAddress();
			var privateKeyWif = key.getLitecoinWalletImportFormat();
			document.getElementById("btcaddress").innerHTML = litecoinAddress;
			document.getElementById("btcprivwif").innerHTML = privateKeyWif;
			var keyValuePair = {
				"qrcode_public": litecoinAddress,
				"qrcode_private": privateKeyWif
			};
			ninja.qrCode.showQrCode(keyValuePair, 4);
		}
		catch (e) {
			// browser does not have sufficient JavaScript support to generate a litecoin address
			alert(e);
			document.getElementById("btcaddress").innerHTML = "error";
			document.getElementById("btcprivwif").innerHTML = "error";
			document.getElementById("qrcode_public").innerHTML = "";
			document.getElementById("qrcode_private").innerHTML = "";
		}
	}
};