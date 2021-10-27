// 不含icon提示框
const toast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str || "成功",
			icon: "none",
			mask:true,
			duration: 2000,
			success: () => {
				setTimeout(() => {
					resolve
				}, 2000)
			}
		})
	})
};
// 成功提示框
const successToast = str => {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: str || "成功",
			icon: "success",
			mask:true,
			duration: 2000,
			success: () => {
				setTimeout(() => {
					resolve()
				}, 2000)
			}
		})
	})
};
// loading
const showLoading = () => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			mask:true,
			success: () => {
				resolve()
			}
		})
	})
};
// tipLoading ==>提示loading
const tipLoading = str => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: str || "加载中...",
			mask: true,
			success: () => {
				resolve()
			}
		})
	})
};
// 隐藏loading
const hideLoading = () => {
	return new Promise((resolve, reject) => {
		uni.hideLoading({
			success: () => {
				resolve()
			}
		})
	})
};

const showModel = str =>{
	return new Promise((resolve,reject)=>{
		uni.showModal({
		    title: '提示',
		    content: str || '未知错误',
		    success: function (res) {
		        if (res.confirm) {
		            resolve()
		        } else if (res.cancel) {
		            reject()
		        }
		    }
		});
	})
}

const isEmpty = source =>{
	var str = source.replace(/(^\s*)|(\s*$)/g,"");
	if(str=="" || str.toLowerCase()=="null" || str.length<=0){
		return true;
	}else{
		return false;
	}
}

const navigateTo = url =>{
	return new Promise((resolve,reject)=>{
		uni.navigateTo({
			url:url,
			success() {
				resolve()
			}
		})
	})
}

const redirectTo = url =>{
	return new Promise((resolve,reject)=>{
		uni.redirectTo({
			url:url,
			success() {
				resolve()
			}
		})
	})
}

const navigateBack = delta =>{
	uni.navigateBack({
		delta:delta || 1
	})
}

const setStorage = (key,data,sync=true) =>{
	if(sync){
		return new Promise((resolve,reject)=>{			
			uni.setStorage({
				key:key,
				data:data,
				success() {resolve()},
				fail(err) {reject(err)}
			})			
		})
	}else{
		try{
			uni.setStorageSync(key, data);
		}catch(err){
			return false
		}
	}
}

const getStorage = (key,data,sync=true) =>{
	if(sync){
		return new Promise((resolve,reject)=>{
			uni.getStorage({
				key:key,
				data:data,
				success(res) {resolve(res)},
				fail(err) {reject(err)}
			})
		})
	}else{
		try{
			return uni.getStorageSync(key, data);
		}catch(err){
			return false
		}
	}
}


const cache = (key, value, seconds = 3600 * 24) => {
	let nowTime = Date.parse(new Date()) / 1000;
	if (key && value) {
		let expire = nowTime + Number(seconds);
		// uni.setStorageSync(key,JSON.stringify(value) + '|' +expire)
		console.log('已经把' + key + '存入缓存,过期时间为' + expire)
	} else if (key && !value) {
		// let val = uni.getStorageSync(key);
    let val = 'asdsad'
		if (val) {
			// 缓存存在，判断是否过期
			let temp = val.split('|')
			console.log(temp)
			if (!temp[1] || temp[1] <= nowTime) {
				// uni.removeStorageSync(key)
				console.log(key + '缓存已失效')
				// this.toast("")
       
				toast('卡卡卡')
				setTimeout(function(){
					this.redirectTo('/pages/login')
				},2000)
				return '';
			} else {
				return JSON.parse(temp[0]);
			}
		}
	}
}

const hideKeyboard = () =>{
	getApp().globalData.hideKeyboard = setInterval(()=>{
		uni.hideKeyboard();
	},10)
}

export default {
	toast,
	successToast: successToast,
	showLoading: showLoading,
	tipLoading: tipLoading,
	hideLoading: hideLoading,
	showModel:showModel,
	isEmpty:isEmpty,
	navigateTo:navigateTo,
	redirectTo:redirectTo,
	navigateBack:navigateBack,
	setStorage:setStorage,
	getStorage:getStorage,
	cache:cache,
	hideKeyboard:hideKeyboard
}