window.onload = function() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var optionBoxHeight = document.getElementsByClassName("option-box")[0].offsetHeight;
	var num = document.getElementById("number");
	var color = document.getElementById("color");
	var inp = document.getElementsByTagName("input");
	var btn0 = document.getElementById("btn0");
	var btn1 = document.getElementById("btn1");
	var btn2 = document.getElementById("btn2");
	var btn3 = document.getElementById("btn3");
	var btn4 = document.getElementById("btn4");
	//橡皮擦宽
	var clearWidth = 10;
	//橡皮擦高
	var clearHeight = 10;
	var arr = [];
	var paint = false;
	var c_paint = false;
	//绑定事件
	btn0.onclick = function() {
		draw();
	}
	btn1.onclick = function() {
		clearImg();
	}
	btn2.onclick = function() {
		clearAll();
	}
	btn3.onclick = function() {
		var type = 'png';
		download(type);
	}
	btn4.onclick = function() {
			var type = 'jpg';
			download(type);
		}
		//浏览器宽度
	function getWidth() {
		if (window.innerWidth) {
			var win_width = window.innerWidth;
		} else if ((document.body && document.body.clientWidth)) {
			var win_width = document.body.clientWidth;
		}
		return win_width;
	}
	//浏览器高度
	function getHeight() {
		if (window.innerHeight) {
			var win_height = window.innerHeight;
		} else if ((document.body && document.body.clientHeight)) {
			var win_height = document.body.clientHeight;
		}
		return win_height;
	}

	function getArr() {
		arr = [];
		for (var i = 0; i < inp.length; i++) {
			arr.push(inp[i].value)
			ctx.lineWidth = arr[0];
			ctx.fillStyle = arr[1];
			ctx.strokeStyle = arr[1];
			console.log(ctx.strokeStyle)
			inp[i].addEventListener("change", function(i) {
				var inp = document.getElementsByTagName("input");
				arr = [];
				for (var i = 0; i < inp.length; i++) {
					arr.push(inp[i].value)
				}
				ctx.lineWidth = arr[0];
				ctx.fillStyle = arr[1];
				ctx.strokeStyle = arr[1];
			})
		}
	}

	function draw() {
		ctx.save();
		ctx.beginPath();
		canvas.onmousedown = function() {
			ctx.beginPath();
			paint = true;
			if (paint == true) {
				var x = event.offsetX;
				var y = event.offsetY;
				getArr();
				ctx.moveTo(x, y);
			}
			canvas.onmousemove = function() {
				if (paint == true) {
					var x1 = event.offsetX;
					var y1 = event.offsetY;
					ctx.lineTo(x1, y1)
					ctx.stroke();
				}
			}
			ctx.restore();
		}
		canvas.onmouseup = function(e) {
			paint = false;
		}
	}
	draw();
	//橡皮擦功能
	function clearImg() {
		canvas.onmousedown = function() {
			c_paint = true;
			canvas.onmousemove = function() {
				if (c_paint == true) {
					ctx.save();
					var x = event.offsetX;
					var y = event.offsetY;
					ctx.clearRect(x, y, clearWidth, clearHeight);
					ctx.restore();
				}
			}
		}
		canvas.onmouseup = function() {
			c_paint = false;
		}
	}

	//全部清除
	function clearAll() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	}
	
	//设置画布宽高
	canvas.width = getWidth();
	canvas.height = getHeight() - optionBoxHeight;
	window.onresize = function() {
		ctx.restore();
		getWidth();
		getHeight();
		canvas.width = getWidth();
		canvas.height = getHeight() - optionBoxHeight;
		// console.log(canvas.width);
	}

	//保存图片

	function download(type) {
		//获取canvas的base64编码
		var imgdata = canvas.toDataURL(type);
		console.log(imgdata)
		var filename = new Date().toLocaleDateString() + '.' + type;
		var fixtype = function(type) {
			type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
			return 'image/' + type;
		}
		imgdata = imgdata.replace(fixtype(type), 'imags/octet-stream');

		function saveFile(data, filename) {
			var link = document.createElement('a');
			link.href = data;
			link.download = filename;
			var evt = document.createEvent('MouseEvents');
			evt.initMouseEvent('click', false, false);
			link.dispatchEvent(evt);
		}
		saveFile(imgdata, filename);
	}
}
