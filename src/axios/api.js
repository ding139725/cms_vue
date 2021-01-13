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


/**
 * @method 根据id查询书籍
 * @params 说明：传入id查询对应的书籍
 * @params 必选参数：id
 * 
 */
export const getBookById = params => request.get(`books/${params}`,)

/**
 * @method 修改书籍
 * @params 说明：传入id修改对应的书籍,传入修改后的书籍书籍
 * @params 必选参数：id
 * 
 */
export const putBook = (id,params) => request.put(`books/${id}`,params)

/**
 * @method 获取博客列表
 * @params 说明：无需参数，查询所有博客列表
 * 
 */
export const getBlogs = () => request.get(`blogs`)

/**
 * @method 添加博客
 * @params 说明：传入博客的标题 封面 已经md和html格式的内容
 * @params 必选参数：params
 * 
 */
export const addBlogs = params => request.post(`blogs`,params)

/**
 * @method 删除博客
 * @params 说明：传入删除博客的id
 * @params 必选参数：params
 * 
 */
export const deleteBlogs = id => request.delete(`blogs/${id}`,)

/**
 * @method 修改博客
 * @params 说明：传入修改博客的id
 * @params 必选参数：id,params
 * 
 */
export const putBlogs = (id,params) => request.put(`blogs/${id}`,params)

/**
 * @method 根据id查询博客
 * @params 说明：传入想要查询博客的id
 * @params 必选参数：id
 * 
 */
export const getBlogById = id => request.get(`blogs/${id}`)

/**
 * @method 根据book_id查询对应的章节
 * @params 说明：传入书的id即可查询对应的章节
 * @params 必选参数：book_id
 * 
 */
export const getChapterByBookId = book_id => request.get(`chapters?book_id=${book_id}`)

/**
 * @method 添加章节
 * @params 说明：传入标题，权重，书籍id即可添加
 * @params 必选参数：params
 * 
 */
export const createChapter = params => request.post(`chapters`,params)

/**
 * @method 删除章节
 * @params 说明：传入章节id即可进行删除
 * @params 必选参数：id
 * 
 */
export const deleteChapter = id => request.delete(`chapters/${id}`)

/**
 * @method 根据id查询章节
 * @params 说明：传入章节id即可查询对应的章节
 * @params 必选参数：id
 * 
 */
export const selectChapterById = id => request.get(`chapters/${id}`)

/**
 * @method 根据id查询章节
 * @params 说明：传入章节id即可查询对应的章节
 * @params 必选参数：id
 * 
 */
export const updateChapter = (id,params) => request.put(`chapters/${id}`,params)

/**
 * @method 根据id查询小节
 * @params 说明：传入章节id即可查询章下面对应的小节内容
 * @params 必选参数：chapter_id
 * 
 */
export const selectSection = chapter_id => request.get(`sections?chapter_id=${chapter_id}`)

/**
 * @method 根据id删除小节
 * @params 说明：传入id值删除对应的小节
 * @params 必选参数：id
 * 
 */
export const deleteSection = id => request.delete(`sections/${id}`)

/**
 * @method 添加小节
 * @params 说明：传入参数添加小节
 * @params 必选参数：params
 * 
 */
export const createSection = params => request.post(`sections`,params)

/**
 * @method 根据id查询具体节的内容
 * @params 说明：传入对应id即可
 * @params 必选参数：id
 * 
 */
export const selectSectionById = id => request.get(`sections/${id}`)

/**
 * @method 根据id修改小节内容
 * @params 说明：传入对应id，和修改后的对象
 * @params 必选参数：id
 * 
 */
export const updateSection = (id,params) => request.put(`sections/${id}`,params)


/**
 * @method 查询所有视频类的列表
 * @params 说明：不用传参直接获取所有
 * @params 
 * 
 */
export const getVideo = () => request.get('videos')

/**
 * @method 根据id删除视频类
 * @params 说明：传入id进行删除操作
 * @params 必选参数id
 * 
 */
export const deleteVideo = id => request.delete(`videos/${id}`)

/**
 * @method 添加视频类
 * @params 说明：传入 视频类标题和封面路径即可
 * @params 必选参数params 对象 必须有title 和img
 */
export const createVideo = params => request.post('videos',params)

/**
 * @method 根据id查询某一类的具体数据
 * @params 说明：传入id
 * @params 必选参数id
 */
export const selectVideoById = id => request.get(`videos/${id}`)

/**
 * @method 修改视频类
 * @params 说明：传入id 和params 修改后的数据
 * @params 必选参数id params
 */
export const updateVideo = (id,params) => request.put(`videos/${id}`,params)

/**
 * @method 查询所有指定类的列表
 * @params 说明：传入video_id获取对应的列表
 * @params  必选参数video_id
 * 
 */
export const getVideoList = video_id => request.get('videolist',{
  params: {
    id:video_id
  }
})

/**
 * @method 根据id删除视频列
 * @params 说明：传入id进行删除操作
 * @params 必选参数id
 * 
 */
export const deleteVideoList = id => request.delete(`videolist/${id}`)

/**
 * @method 添加视频
 * @params 说明：传入 视频类标题和视频路径即可
 * @params 必选参数params 对象 必须有title 和iframe_url 和video_id
 */
export const createVideoList = params => request.post('videolist',params)
/**
 * @method 根据id查询某一类的具体数据
 * @params 说明：传入id
 * @params 必选参数id
 */
export const selectVideoListById = id => request.get(`videolist/${id}`)

/**
 * @method 修改视频列表
 * @params 说明：传入id 和params 修改后的数据
 * @params 必选参数id params
 */
export const updateVideoList = (id,params) => request.put(`videolist/${id}`,params)

/**
 * @method 获取资源列表
 * @params 说明：无需传参即可获取
 */
export const getResourse = () => request.get('resourse')

/**
 * @method 根据id删除资源
 * @params 说明：传入id进行删除操作
 * @params 必选参数id
 * 
 */
export const deleteResourse = id => request.delete(`resourse/${id}`)

/**
 * @method 添加视频
 * @params 说明：传入对象
 * @params 必选参数params 对象
 */
export const createResourse = params => request.post('resourse',params)
/**
 * @method 根据id查询某一个资源
 * @params 说明：传入id
 * @params 必选参数id
 */
export const selectResourseById = id => request.get(`resourse/${id}`)

/**
 * @method 修改视频列表
 * @params 说明：传入id 和params 修改后的数据
 * @params 必选参数id params
 */
export const updateResourse = (id,params) => request.put(`resourse/${id}`,params)

/**
 * @method 查询用户列表
 * @params 说明：无需传入参数即可查询所有数据
 */
export const getUserList = () => request.get('users')

/**
 * @method 新增用户列表
 * @params 说明：需要传入新增的用户信息
 * @param 必选参数 
 */
export const createUser = params => request.post('users',params)
/**
 * @method 删除用户
 * @params 说明：传入需要删除的用户id即可进行删除操作
 * @params id必选参数 需要删除的用户id
 */
export const deleteUser = id => request.delete(`users/${id}`)
/**
 * @method 根据id查询指定用户
 * @params 说明：传入想要查询的id即可
 * @params id必选参数 需要查询的用户id
 */
export const selectUserById = id => request.get(`users/${id}`)
/**
 * @method 修改用户
 * @params 说明：传入修改的id 以及修改后的值
 * @params 说明：id params必选参数
 */
export const updateUser  = (id,params) => request.put(`users/${id}`,params)
