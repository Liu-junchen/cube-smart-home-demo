import { defineStore } from 'pinia';
import { type IEtcState, EUserStatus} from '@/types/etc';
import api from '@/api';
export const useEtcStore = defineStore('etc', {
    state: (): IEtcState => {
        return {
            loading: false,
            userStatus: EUserStatus.NOT_LOGED,
        }
    },
    actions: {
        setLoading(loading: boolean) {
            this.loading = loading;
        },
        async getUserStatus() {
            const { error, data }  = await api.user.getUserStatus();
            if(error === 0) {
                const { userStatus =  EUserStatus.NOT_LOGED } = data ?? {};
                this.userStatus = userStatus;
            }
        }
    },
    persist: true,
},)