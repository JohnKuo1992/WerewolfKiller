class Storage {
    constructor(name) {
            this.name = 'storage';
        }
        //設定快取
    setItem(params) {
            let obj = {
                name: '',
                value: '',
                expires: 1000 * 60 * 60,
                startTime: new Date().getTime() //記錄何時將值存入快取，毫秒級
            }
            let options = {};
            //將obj和傳進來的params合併
            Object.assign(options, obj, params);
            if (options.expires) {
                //如果options.expires設定了的話
                //以options.name為key，options為值放進去
                localStorage.setItem(options.name, JSON.stringify(options));
            } else {
                //如果options.expires沒有設定，就判斷一下value的型別
                let type = Object.prototype.toString.call(options.value);
                //如果value是物件或者陣列物件的型別，就先用JSON.stringify轉一下，再存進去
                if (Object.prototype.toString.call(options.value) == '[object Object]') {
                    options.value = JSON.stringify(options.value);
                }
                if (Object.prototype.toString.call(options.value) == '[object Array]') {
                    options.value = JSON.stringify(options.value);
                }
                localStorage.setItem(options.name, options.value);
            }
        }
        //拿到快取
    getItem(name) {
            let item = localStorage.getItem(name);
            //先將拿到的試著進行json轉為物件的形式
            try {
                item = JSON.parse(item);
            } catch (error) {
                //如果不行就不是json的字串，就直接返回
                item = item;
            }
            //如果有startTime的值，說明設定了失效時間
            if (item == null) {
                return false;
            }

            if (item.startTime) {
                let date = new Date().getTime();
                //何時將值取出減去剛存入的時間，與item.expires比較，如果大於就是過期了，如果小於或等於就還沒過期
                if (date - item.startTime > item.expires) {
                    //快取過期，清除快取，返回false
                    localStorage.removeItem(name);
                    return false;
                } else {
                    //快取未過期，返回值
                    return item.value;
                }
            } else {
                //如果沒有設定失效時間，直接返回值
                return item;
            }
        }
        //移出快取
    removeItem(name) {
            localStorage.removeItem(name);
        }
        //移出全部快取
    clear() {
        localStorage.clear();
    }
}

var storage = new Storage();

export { storage }