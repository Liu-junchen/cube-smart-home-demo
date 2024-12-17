import { defineStore } from 'pinia';
import type { IEtcState } from '@/model/etc';
export const useEtcStore = defineStore('etc', {
    state: (): IEtcState => {
        return {
            at: '',
            apikey: '',
            loading: false,
        }
    },
    actions: {
        setAt(at: string) {
            this.at = at;
        },
        setLoading(loading: boolean) {
            this.loading = loading;
        },
        setApikey(apikey: string) {
            this.apikey = apikey;
        }
    },
    persist: true,
},)