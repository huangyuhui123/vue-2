<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">米修在线后台管理系统</span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注 册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
export default {
  name: "register",
  components: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== this.registerUser.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {min:6,max: 30 ,message: '密码在6到30 之间',tigger:"blur"}
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {min:6,max: 30 ,message: '密码在6到30 之间',trigger:"blur"},
          {validator: validatePass2, trigger: "blur"}
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods:{
    submitForm(formName){
         this.$refs[formName].validate((valid) => {
          if (valid) {
           // alert('submit!');
            delete this.registerUser.password2;
        
          //  this.$axios(
          //    {
          //      headers: {
          //               'Content-Type': 'application/json'
          //           },
          //           method: 'post',
          //           url: '/api/users/register',
          //           data: JSON.stringify(this.registerUser)
          //    }).
          //  then(res=>{
            
          //      //注册成功
          //     //  Vue.prototype.$message({
          //     //      message:"账号注册成功！",
          //     //      type: "success"
          //     //  })
          //      this.$message({
          //       message: "注册成功！",
          //       type: "success"
          //     });
          //  })
           //this.$router.push("/login");
          }else{
              return false;
          }
        });

    },
  },
  mounted(){
        this.$axios
          .get("/api/users/test")
          .then(res => {
            // 注册成功
            // this.$message({
            //   message: "注册成功！",
            //   type: "success"
            // });
            // this.$router.push("/login");
          });
  }
};
</script>
<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>