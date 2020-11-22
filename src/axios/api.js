import request from './request';

/**
 * @method 用户名密码登录
 * @params 说明：调用此接口传入用户名密码可进行登录
 * @param 必选参数：username用户名,password密码
 *passwrod
 */
export const login = params => request.post('/login',{username:params.username,password:params.password});

/**
 * @method 测试中间件接口
 */
export const test = () => request.get('/test');


/**
 * @method 添加书籍
 * @params 说明：调用此接口传入书的封面、标题、权重可添加书籍
 * @params 必选参数：title,img,orderby
 * 
 */
export const createBook = params => request.post('/books',params)



/**
 * @method 查询书籍
 * @params 说明：无需传入参数即可获取到所有书籍的列表
 * 
 */
export const getBook = () => request.get('/books')



/**
 * @method 删除书籍
 * @params 说明：调用此接口传入想删除的id即可删除id
 * @params 必选参数：id
 * 
 */
export const deleteBook = params => request.delete(`books/${params}`,)

