'use strict';
const os = require('os');

/**
 * @author ycx
 * <link>http://nodejs.cn/api/os.html#os_os_homedir<link>
 * 系统工具
 */
class OSUtil {


    /**
     * 获取系统ipv4 地址
     * @return {string | (() => AddressInfo) | (() => (AddressInfo | {})) | (() => (AddressInfo | string | null))}
     */
    static getIPV4Address() {
        const interfaces = os.networkInterfaces();
        for (const devName in interfaces) {
            //
            //console.log(devName)
            const iface = interfaces[devName];
            //console.log(iface)
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                //console.log(alias)
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
        return null;
    }


    /**
     * 获取系统的ipv6地址
     * @return {string|(() => AddressInfo)|(() => (AddressInfo | {}))|(() => (AddressInfo | string | null))|null}
     */
    static getIPV6Address() {
        const interfaces = os.networkInterfaces();
        for (const devName in interfaces) {
            //
            const iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                //console.log(alias)
                if (alias.family === 'IPv6' && alias.address !== '::1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
        return null;
    }


}

module.exports = OSUtil
