import { defineStore } from 'pinia';
import type { IEtcState } from '@/model/etc';
export const useEtcStore = defineStore('etc', {
    state: (): IEtcState => {
        return {
            at: '',
            loading: false,
        }
    },
    actions: {
        setAt(at: string) {
            this.at = at;
        },
        setLoading(loading: boolean) {
            this.loading = loading;
        }
    },
    persist: true,
},)