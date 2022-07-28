
const methodDevices = {
    isMobile : {
        android : ()=>navigator.userAgent.match(/android|linux/i),
        ios : ()=>navigator.userAgent.match(/iphone|ipad|ipod/i),
        windows : ()=>navigator.userAgent.match(/windows phone/i),
        any : function(){
          return this.android()||this.ios()||this.windows()
        }
    },
    isDesktop : {
        window : ()=>navigator.userAgent.match(/Windows NT/i),
        linux : ()=>navigator.userAgent.match(/Linux/i),
        mac : function(){
          return navigator.userAgent.match(/mac/i) && navigator.userAgent.match(/iphone|ipad|ipod/i) === null?'Mac OS':null
        },
        
        any : function(){
          return this.window()||this.linux()||this.mac()
        }
    },
    isBrowser : { 
        chrome:function(){
          return (navigator.userAgent.match(/chrome/i) && navigator.userAgent.match(/edg|OPR/i)===null)?'Chrome':null},
        safari : function(){
          return (navigator.userAgent.match(/safari/i) && navigator.userAgent.match(/chrome/i) === null)?'Safari':null
        },
        firefox : ()=>navigator.userAgent.match(/firebox/i),
        opera : ()=>navigator.userAgent.match(/opera|opera mini|OPR/i),
        ie : ()=>navigator.userAgent.match(/msie|iemobile/i),
        edge : function(){
          return (navigator.userAgent.match(/Edg|Edge/i) && navigator.userAgent.match(/chrome|safari/i)?'Microsoft Edge':null)
    },
    
    any : function(){
        return this.chrome()||this.safari()||this.firefox()||this.opera()||this.ie()||this.edge;
        }
    }
}

    
export default methodDevices;