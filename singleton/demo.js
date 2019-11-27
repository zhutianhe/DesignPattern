/**
 * 普通单体
 * 比如:用户登录之后的信息可以用一个单体存储
 */
(function(){

  // 用来区分命名空间，并且将一组相关的属性和方法组织到一起
  var UserInfo = {
    name: 'admin',
    code：'00101',
    deptName: 'pd',
    deptCode: 'PD001',
    getName: function() {
      return 'admin'
    }
  };

  alert(UserInfo.getName())
})()


/**
 * 具有局部属性的特殊单体
 */
(function() {
  var UserInfo = (function(){
    // 利用闭包使单体有自己的私有局部变量
    var name = "";
    var code = "";
    // 请求后台数据获取属性值
    ajax
    return {
      name: name,
      code: code
    }
  })();

  alert(UserInfo.name)
})()

/**
 * 惰性单体
 */
(function(){

  var UserInfo = (function() {
    var userInfo = "";
    function init() {
      var name = "";
      var code = "";
      // 请求后台数据获取属性值
      ajax
      return {
        name: name,
        code: code
      }
    }

    return {
      getInstance : function() {
        if (userInfo) {
          return userinfo;
        } else {
          userInfo = init();
          return userInfo;
        }
      }
    }
  })();

  alert(UserInfo.getInstance().name);
})()

/**
 * 分支单体
 * 比如：根据浏览器获取不同的XHR，或者在不同的分辨率下初始化界面
 */
(function() {
  // 获取机器的分辨率
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;
  var portalInfo = (function() {
    var $1280 = {info: '1,2,3,5'};
    var $1024 = {info: '1,2,3,5'};
    if(screenWidth == 1280) {
      return $1280;
    } else if (screenWidth == 1024) {
      return $1024;
    }
  })();

  alert(portalInfo.info)
})()







