<style lang="scss" scoped>
  .seting-menu {
    position: relative;
    float: left;
    height: 38px;
    margin-left: 10px;
    line-height: 38px;
    .set-icon {
      background: url("./images/set.png") no-repeat;
      width: 16px;
      height: 16px;
      float: left;
      margin-top: 11px;
      cursor: pointer;
    }
    .menu-list {
      width: 94px;
      position: absolute;
      right: -15px;
      border-radius: 3px;
      top: 40px;
      z-index: 10;
      background: #28386C;
      padding: 0;
      box-shadow: 0 1px 2px #000;
      color: #fff;
      li {
        height: 30px;
        line-height: 30px;
        width: 94px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        cursor: pointer;
        &:hover {
          background: #14214A;
        }
        &:first-child {
          text-align: center;
          &:hover {
            &::before {
              border-bottom: 6px solid #14214A;
            }
          }
          &::before {
            content: '';
            position: absolute;
            right: 14%;
            top: -6px;
            width: 0;
            height: 0;
            border-left: 6px solid rgba(255, 255, 255, 0);
            border-right: 6px solid rgba(255, 255, 255, 0);
            border-bottom: 6px solid #28386C;
          }
        }
      }
      .password::before,
      .change-theme::before,
      .logout::before {
        width: 24px;
        height: 24px;
        display: inline-block;
        content: '';
        float: left;
        margin-top: 4px;
        margin-left: 6px;
      }
      .password::before {
        background: url(./images/blue_changelock.png) no-repeat;
      }
      .change-theme::before {
        background: url(./images/blue_changeskin.png) no-repeat;
      }
      .logout::before {
        background: url(./images/blue_logout.png) no-repeat;
      }
    }
    span {
      color: #fff;
    }
  }

  /*绿色主题*/
  .theme-green {
    .seting-menu
    .menu-list {
      background: #fff;
      color: #535353;
      box-shadow: 0 1px 2px #ccc;
      li {
        &:hover {
          background: #1abcbe;
          color: #fff;
        }
        &:first-child {
          text-align: center;
          &:hover {
            &::before {
              border-bottom: 6px solid #1abcbe;
            }
          }
          &::before {
            border-bottom: 6px solid #fff;
          }
        }
      }

      .password::before {
        background: url(./images/green_changelock.png) no-repeat;
      }

      .change-theme::before {
        background: url(./images/green_changeskin.png) no-repeat;
      }
      .logout::before {
        background: url(./images/green_logout.png) no-repeat;
      }
      .password:hover::before {
        background: url(./images/blue_changelock.png) no-repeat;
      }
      .change-theme:hover::before {
        background: url(./images/blue_changeskin.png) no-repeat;
      }

      .logout:hover::before {
        background: url(./images/blue_logout.png) no-repeat;
      }
    }
  }
</style>


<template>
  <div class="seting-menu">
    <div class="set-icon" v-clickoutside="handleClose" @click="setEvent"></div>
    <ul class="menu-list" v-show="isShow">
      <li>admin</li>
      <li class="password" @click="dialogVisible = true">密码修改</li>
      <li class="change-theme" @click="changeTheme">皮肤切换</li>
      <li class="logout" @click="logout">退出登录</li>
    </ul>
    <el-dialog
      title="用户管理/密码修改"
      :visible.sync="dialogVisible"
      width="400px"
      :modal-append-to-body="false"
      :center="true"
      :before-close="handleClose">
      <form class="container" id="pwdChgForm">
        <div class="demo-input-suffix">
          原始密码
          <el-input
            @input="getOldPassword"
            type='password'
            v-model="oldPassword">
          </el-input>
        </div>
        <div class="demo-input-suffix">
          新密码
          <el-input
            type='password'
            @input="getNewPassword"
            v-model="newPassword">
          </el-input>
        </div>
        <div class="demo-input-suffix">
          确认新密码
          <el-input
            type='password'
            @input="getConfirmPassword"
            v-model="confirmPassword">
          </el-input>
        </div>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {isEmpty} from 'lodash'
  import {fetch} from '@/util/request'
  import {clickoutside} from '@/util/util.js'
  import config from '@/config/base.config'

  export default {
    data() {
      return {
        themeb: 'blue',
        isShow: false,
        dialogVisible: false,
        // 密码修改值
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    props: {
      logout: Function,
      requestChangePwd: Function
    },
    directives: {clickoutside},
    methods: {
      /**
       * 皮肤切换
       */
      changeTheme() {
        let theme = localStorage.getItem('theme')
        switch (theme) {
          case 'blue':
            localStorage.setItem('theme', 'green')
            break;
          case 'green':
            localStorage.setItem('theme', 'blue')
            break;
          default:
            localStorage.setItem('theme', 'blue')
            break;
        }
        theme = localStorage.getItem('theme')
        $('body').attr('class', `theme-${theme}`)
        this.$store.commit('themeChange', theme)
      },
      /*
       * 关闭下拉框 
       */
      handleClose() {
        this.isShow = false
      },
      /*
       * 设置点击事件 
       */
      setEvent() {
        this.isShow = !this.isShow
      },
      /*
       * 修改密码
       */
      changePwd() {
        let self = this
        if (self.validateForm() == true) {
          self.dialogVisible = false
          let pramas = {
            oldpass: self.oldPassword,
            newpass: self.newPassword,
          }
          // 调用修改密码的方法
          self.requestChangePwd(pramas)
        }
      },
      /*
      * 验证表单字段是否为空 
      */
      validateForm() {
        const {oldPassword, newPassword, confirmPassword} = this
        // 旧密码验证
        if (_.isEmpty(oldPassword)) {
          this.messagePopup('认输入原始密码!')
          return false
        }
        if (!this.validatePwd(newPassword)) {
          return false
        }
        // 新密码验证
        if (_.isEmpty(newPassword) || _.isEmpty(confirmPassword)) {
          this.messagePopup('新密码或者确认密码不能为空!')
          return false
        } else {
          if (newPassword !== confirmPassword) {
            this.messagePopup('新密码与确认密码不一致，请确认!')
            return false
          }
          return true
        }

      },
      validatePwd(pwd) {
        if (_.isEmpty(pwd)) {
          this.messagePopup("密码为能为空！");
          return false;
        }
        let reg = /^(?=.*[A-Z])(?=.*\d)[^]{8,50}$/;
        if (!reg.test(pwd)) {
          this.messagePopup("密码格式不对，长度为8-50位，且必须包含大写字母和数字");
          return false;
        }
        return true;
      },
      /**提示框 */
      messagePopup(text) {
        this.$message({
          message: text,
          // duration: 0, // 0 不关闭弹窗
          center: true,
          type: ''
        });
      },
      /**旧密码*/
      getOldPassword(value) {
        this.oldPassword = value
      },
      /** 用户名密码 */
      getNewPassword(value) {
        this.newPassword = value
      },
      /**验证码 */
      getConfirmPassword(value) {
        this.confirmPassword = value
      },
      /**提示框 */
      messagePopup(text) {
        this.$message({
          message: text,
          duration: 1500, // 0 不关闭弹窗
          center: true,
          type: ''
        });
      },
    }
  }
</script>



