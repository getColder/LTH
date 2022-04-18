
document.write('<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>')
window.onload = () => {
    axios.get('/data').then(res => {
        const light = document.getElementById("light-data");
        const temper = document.getElementById("temper-data");
        const humanlity = document.getElementById("humanlity-data");
        const fetchTime = document.getElementById("time-fetch");
        console.log(res);
        const sensorData = res.data.Data;
        light.innerHTML = '光照' + sensorData[0].S;
        temper.innerHTML = '温度' + sensorData[0].T;
        humanlity.innerHTML = '湿度' + sensorData[0].H;
		res.data.Time[1] -= 1;
        fetchTime.innerHTML = '采集时间:' + new Date(...res.data.Time).toLocaleString();
    })
}
