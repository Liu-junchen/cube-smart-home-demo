import { defineStore } from 'pinia';
import type { IEtcState } from '@/model/etc';
export const useEtcStore = defineStore('etc', {
    state: (): IEtcState => {
        return {
            at: '',
        }
    },
    actions: {
        setAt(at: string) {
            this.at = at;
        }
    },
    persist: true,
},)