
document.write('<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>')
window.onload = () => {
    axios.get('/data').then(res => {
        const light = document.getElementById("light-data");
        const temper = document.getElementById("temper-data");
        const humanlity = document.getElementById("humanlity-data");
        const fetchTime = document.getElementById("time-fetch");
        console.log(res);
        light.innerHTML = '光照' + res.data.light;
        temper.innerHTML = '温度' + res.data.temper;
        humanlity.innerHTML = '湿度' + res.data.humanlity;
        fetchTime.innerHTML = '采集时间:' + new Date(...res.data.time).toLocaleString();
    })
}