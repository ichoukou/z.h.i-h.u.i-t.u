require('../../scss/parking/configure.scss');
const catalogId = location.href.indexOf('vip.rtmap.com') > 0 ||
 location.href.indexOf('vipvs2.rtmap.com') > 0 ? '3' : '9';
import { out } from '../modules/out.js';
import { getUploadToken } from '../model/';
import { setSquared, getSquaredOrderNum, getOneSquared, getColumnList } from '../model/parking.js';
const $ = window.$;
const conf = window.conf;
const Qiniu = window.Qiniu;
require('../modules/cookie')($);
const main = {
  init() {
    this.initDom();
    this.initEvent();
    getUploadToken().then(d => {
      this.uploader(d.data);
    });
    this.file = '';
    this.getColumnList();
    this.getSquaredOrderNum();
    if (conf.id) this.getOneSquared();
  },
  initDom() {
    this.$out = $('.out');
    this.$image = $('#image');
    this.$logoname = $('.logoname'); // 名称
    this.$pathurl = $('.pathurl'); // 跳转地址
    this.$sort = $('.sort'); // 排序
    this.$have = $('.have'); // 已有排序
    this.$subBtn = $('.subBtn'); // 提交
    this.$msg = $('.msg'); // 错误信息
    this.$briefing = $('.briefing');
    this.$columnList = $('.columnList');
  },
  initEvent() {
    this.$out.on('click', () => {
      out();
    });
    this.$subBtn.on('click', () => {
      this.setSquared();
    });
  },

  uploader(token) {
    // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
    // uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs
    this.qiniuupload(token);
  },
  qiniuupload(token) {
    Qiniu.uploader({
      runtimes: 'html5,flash,html4',    // 上传模式,依次退化
      browse_button: 'pickfiles',       // 上传选择的点选按钮，**必需**
      // uptoken_url: token,            // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
      uptoken: token, // 若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
      unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
      // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
      domain: 'http://qiniu-plupload.qiniudn.com/',   // bucket 域名，下载资源时用到，**必需**
      get_new_uptoken: false,  // 设置上传文件的时候是否每次都重新获取新的token
      // container: 'container',           // 上传区域DOM ID，默认是browser_button的父元素
      max_file_size: '100mb',           // 最大文件体积限制
      flash_swf_url: 'js/plupload/Moxie.swf',  // 引入flash,相对路径
      max_retries: 3,                   // 上传失败最大重试次数
      dragdrop: true,                   // 开启可拖曳上传
      drop_element: 'container',        // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
      chunk_size: '4mb',                // 分块上传时，每片的体积
      auto_start: true,                 // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
      init: {
        FilesAdded: (up, files) => {
          console.log(files);
            // plupload.each(files, function(file) {
            //     // 文件添加进队列后,处理相关的事情
            // });
        },
        BeforeUpload: (up, file) => {
          console.log(file);
               // 每个文件上传前,处理相关的事情
          // this.contactusCode(file);
        },
        UploadProgress: (up, file) => {
          // const timestamp =Date.parse(new Date());
          console.log(file);
               // 每个文件上传时,处理相关的事情
        },
        FileUploaded: (up, file, info) => {
          console.log(info);
          this.file = `https://img.rtmap.com/${file.target_name}`;
          this.$image.attr('src', this.file);
        },
        Error: (up, err, errTip) => {
          console.log(errTip);
               // 上传出错时,处理相关的事情
        },
        UploadComplete: (up, file, data) => {
               // 队列文件处理完毕后,处理相关的事情
          console.log(file);
          console.log(data);
        },
      },
    });
  },
  setSquared() {
    setSquared({
      key_admin: $.cookie('ukey'),
      url: this.$pathurl.val(),
      title: this.$logoname.val(),
      logo: this.file || this.$image.attr('src'),
      sid: conf.id || '',
      order: this.$sort.val(),
      content: this.$briefing.val(),
      column_id: this.$columnList.val(),
      catalog_id: catalogId,
      isopenedactivity: 1,
    }).then(() => {
      location.href = '/parking/configurelist';
    }, json => {
      this.$msg.html(json.msg);
    });
  },
  getSquaredOrderNum() {
    getSquaredOrderNum({
      key_admin: $.cookie('ukey'),
      catalog_id: catalogId,
    }).then(json => {
      let have = '';
      $.each(json.data, (i, v) => {
        have += `${v}, `;
      });
      this.$have.html(`已有排序：${have}`);
    }, json => {
      alert(json.msg);
    });
  },
  getColumnList() {
    getColumnList({
      key_admin: $.cookie('ukey'),
      catalog_id: catalogId,
    }).then(json => {
      let option = '';
      $.each(json.data, (i, v) => {
        option += `<option value="${v.id}">${v.name}</option>`;
      });
      this.$columnList.html(option);
    }, json => {
      alert(json.msg);
    });
  },
  getOneSquared() {
    getOneSquared({
      key_admin: $.cookie('ukey'),
      sid: conf.id,
      catalog_id: catalogId,
    }).then(json => {
      this.$pathurl.val(json.data.url);
      this.$logoname.val(json.data.title);
      this.$sort.val(json.data.order);
      this.$image.attr('src', json.data.logo);
      this.$briefing.val(json.data.content);
      this.$columnList.val(json.data.column_id).attr('selected', true);
    }, json => {
      alert(json.msg);
    });
  },
};
main.init();
