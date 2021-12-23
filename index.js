export default class Store{
    static state = {};

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
            Store.state[key].callbacks.forEach(element => {
                element(Store.state[key].val, Store.state[key].val);
            });
        }
    }     
    static addCallback(key, callback){
        console.log('add-callback');
        if(Store.state[key] !== undefined){
            if(Store.state[key].callbacks === undefined){
                Store.state[key].callbacks = [callback];
            }
            Store.state[key].callbacks.push(callback);
        }
        else{
            Store.state[key] = { callbacks: [callback] };
        }
    }       
    static setState(key, val){
        if(Store.state[key] !== undefined){
            if(Store.state[key].callbacks !== undefined){
                Store.state[key].callbacks.forEach(element => {
                    element(Store.state[key].val, val);
                });
            }
            Store.state[key].val = val;
        }
        else{
            Store.state[key] = { val };
        }
    }
}