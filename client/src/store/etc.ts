import { defineStore } from 'pinia';
import { type IEtcState, EUserStatus} from '@/model/etc';
import api from '@/api';
export const useEtcStore = defineStore('etc', {
    state: (): IEtcState => {
        return {
            loading: false,
            userStatus: EUserStatus.NOTLOGGED,
        }
    },
    actions: {
        setLoading(loading: boolean) {
            this.loading = loading;
        },
        async getUserStatus() {
            const { error, data }  = await api.user.getUserStatus();
            if(error === 0) {
                const { userStatus } = data!;
                this.userStatus = userStatus;
            }
        }
    },
    persist: true,
},)