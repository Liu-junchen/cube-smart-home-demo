<template>
    <div class="login">
        <div class="login-card">
            <div class="login-card__left">
                <img class="login-card__left__img" src="@/assets/img/login/login.png" />
                <div class="login-card__left__desc">演示专用</div>
            </div>
            <div class="login-card__right">
                <div class="login-card__right__header">
                    请输入易微联账号和密码
                </div>
                <div class="login-card__right__form">
                    <a-form style="width: 100%" layout="vertical" :model="formState">
                        <a-form-item label="手机号" class="require" name="phoneNumber">
                            <a-input :visibilityToggle="true" placeholder="请输入易微联账号" class="blockStyle"
                                v-model:value="phoneNumber" />
                        </a-form-item>
                        <a-form-item label="密码" class="require" name="password">
                            <a-input-password :visibilityToggle="true" placeholder="请输入密码" class="blockStyle"
                                v-model:value="password" />
                        </a-form-item>
                    </a-form>
                    <a-button size="large" @click="login" class="blockStyle login-btn" type="primary">
                        登录
                    </a-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { toRefs, reactive, ref } from 'vue';
import { useEtcStore } from '@/store/etc';
import { phoneNumberValidate, passwordValidata } from '@/utils/validate'
import { message } from 'ant-design-vue';
import api from '@/api';
import _ from 'lodash';
import router from '@/router'

const etc = useEtcStore();

/** 表单内数据 */
const formState = reactive({
    phoneNumber: '',
    password: '',
})

const { phoneNumber, password } = toRefs(formState);

/** 登录 */
const login = async () => {
    //手机号格式校验
    if (!phoneNumberValidate(phoneNumber.value)) {
        return message.error('手机号格式不正确');
    }
    // 密码格式校验
    if (!passwordValidata(password.value)) {
        return message.error('密码格式不正确，需要8位以上');
    }

    const params = {
        lang: 'cn',
        countryCode: '+86',
        phoneNumber: `+86${phoneNumber.value}`,
        password: password.value,
    }

    const { error, data } = await api.user.login(params)
    if (error === 0 && data) {
        message.success('登录成功!');
        // 重新请求接口刷新前端登录状态
        await etc.getUserStatus();
        router.push('/');
    }
}
</script>
<style lang="scss" scoped>
.login {
    background-color: #f5f5f5;
    height: 100vh;
    min-width: 1000px;
    @include flex();

    .login-card {
        font-size: 16px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 640px;
        width: 1000px;
        background-color: #fff;
        border-radius: 20px;

        &__left {
            position: relative;
            width: 50%;
            height: 100%;
            user-select: none;

            &__img {
                width: 100%;
                height: 100%;
            }

            &__desc {
                position: absolute;
                left: 50%;
                bottom: 0;
                font-size: 14px;
                color: #d6f9fb;
                margin-bottom: 15px;
                transform: translate(-50%);
                width: 100%;
                text-align: center;
                @include flex();
            }
        }

        &__right {
            @include flex(center, center, column);
            position: relative;
            padding: 20px 75px 20px 50px;
            width: 50%;
            height: 100%;

            &__header {
                font-size: 14px;
                position: absolute;
                right: 30px;
                top: 28px;
                max-width: 50%;
                color: rgb(80, 142, 255);
            }

            &__form {
                width: 100%;

                &:deep(.ant-form-item-label) {
                    font-weight: bold;
                }

                &:deep(.ant-checkbox-wrapper) {
                    font-size: 12px;
                    margin-bottom: 50px;
                }

                &:deep(.require > .ant-form-item-label) {
                    &::after {
                        display: inline-block;
                        margin-right: 4px;
                        color: #e60505;
                        font-size: 16px;
                        font-family: SimSun, sans-serif;
                        line-height: 1;
                        content: '*';
                    }

                    &::before {
                        content: none;
                    }
                }

                &:deep(.ant-form-item-control-input-content) {
                    display: flex;
                    font-size: 12px;
                    justify-content: space-between;

                    .forget {
                        // color: #5a8ded;
                        font-size: 14px;

                        &:hover {
                            color: #7fc1ff;
                        }
                    }
                }

                .login-btn {
                    margin-top: 30px;
                    font-size: 20px;
                    background-color: #4f8dff;
                    @include truncate-text-btn();
                }

                .blockStyle {
                    width: 100%;
                    height: 48px;
                    border-radius: 8px;
                }
            }
        }
    }
}

:deep(.ant-input) {
    padding: 0 18px;
    font-size: 14px;
}

:deep(.ant-form-item-label > label) {
    font-size: 16px;
}

:deep(.ant-select-single:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-search-input) {
    height: 48px;
}

:deep(.ant-select-arrow) {
    font-size: 14px;
}

:deep(.ant-spin-text) {
    position: fixed !important;
}

:deep(.ant-spin-dot) {
    position: fixed !important;
}

:deep(.ant-spin) {
    font-size: 24px;
}

:deep(.ant-modal-body) {
    padding: 0 16px 0;
}

:deep(.ant-form-item) {
    margin-bottom: 6px;
}
</style>