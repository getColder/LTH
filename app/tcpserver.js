const { resolve } = require('path');
/** 
 * tcp服务器封装，通过界定符区分数据包。
 ** 例如,  ##ABC@# ，判定ABC为一个完整的数据包。
*	@param{Number}port 监听端口
*	@param{String}addressListen  监听地址
*	@param{String}sepHead 包分隔符头部
*	@param{String}sepEnd 包分隔符尾部
*/
function Server(port, address, sepHead,sepEnd) {
	const net = require('net')
	const Osutil = require('./util/os')
	this.host = {
		ipv4: Osutil.getIPV4Address(),
		port: port
	}
	this.addressL = address;
	this.sep = "sep";
	this.stream = "";
	this.canAppendStream = true;
	this.packs = [];
	this.packContentRegExp = new RegExp(`^${sepHead}(.*)${sepEnd}$`,"i");
	this.getPacks_timeout_handle = -1
	//创建服务器
	const server = net.createServer(socket => {
		//新的连接socket
		const address = socket.address().address;
		console.log(`${address} connected! \t${new Date().toLocaleString()}`);
		//处理socket数据
		socket.on('data', data => {
			clearTimeout(this.getPacks_timeout_handle);  //又有数据发来，暂停获取包
			this.appendStream(data);
			this.getPacks_timeout_handle = setTimeout(() => {
				this.getPack();
			}, 500);
			//调试信息
			//console.log(data.toLocaleString());
		})

		//socket断开
		socket.on('end', () => {
			console.log(`${address} disconnected! \t${new Date().toLocaleString()}`);
		});


		//socket链接错误处理
		socket.on('error', () => {
			console.log(`${address} unlink! \t${new Date().toLocaleString()}`);

		});
	})

	//监听端口
	server.listen(this.host.port, this.addressL, () => {
		console.log(`${this.host.ipv4}:${this.host.port} is listening for tcp!`);
	});

	//服务器错误处理
	server.on('error', (err) => {
		console.log(err);
	})
}
Server.prototype.currentData = {};
//暂停获取流，通过界定符拿到数据包
Server.prototype.getPack = function () {
	let pack = "";
	if (this.stream === "" || this.stream === null || this.stream === undefined) {
		return;
	}
	this.canAppendStream = false;
	let res = this.stream.match(this.packContentRegExp);
	try {pack = res ? res[1] : ""; }catch(err){console.error(err)};
	this.stream = "";
	this.canAppendStream = true;
	console.log(pack);
    try {
        currentData = JSON.parse(pack);
    } catch (error) {
        console.log(error);
    }
	return true;
}
Server.prototype.getCurrentData = function(){
    return this.currentData;
}; 
Server.prototype.appendStream = function (data) {
	if (this.canAppendStream) {
		this.stream += data;
	}
	else {
		setTimeout(() => {
			this.appendStream();
		}, 200);
	}
}

exports.getCurrentData = Server.prototype.getCurrentData;
exports.Server = Server;