export default class Store{
    static state = {};
    static newCalKey = 0;
    static getState(key, dafault = undefined){
        if(Store.state[key] !== undefined && Store.state[key].val !== undefined){
            return Store.state[key].val;
        }
        else{
            return dafault;
        }
    }
    static runCallback(key){
        if(Store.state[key].callbacks !== undefined){
            for (let callback of Store.state[key].callbacks.values()){
                callback({from: Store.state[key].val, to: Store.state[key].val});
            }
        }
    }
    static addCallback(key, callback){
        if(Store.state[key] !== undefined){
            if(Store.state[key].callbacks === undefined){
                Store.state[key].callbacks = new Map();
            }
        }
        else{
            Store.state[key] = { callbacks: new Map() };
        }
        let calkey = Store.newCalKey;
        Store.newCalKey++;
        Store.state[key].callbacks.set(calkey, callback);
        return calkey;
    }
    static clearCallback(key, calkey){
        if(Store.state[key] !== undefined){
            if(Store.state[key].callbacks !== undefined){
                Store.state[key].callbacks.delete(calkey);
            }
        }
    }
    static setState(key, val){
        if(Store.state[key] !== undefined){
            if(Store.state[key].callbacks !== undefined){
                for (let callback of Store.state[key].callbacks.values()){
                    callback({from: Store.state[key].val, to: val});
                }

            }
            Store.state[key].val = val;
        }
        else{
            Store.state[key] = { val };
        }
    }
}

