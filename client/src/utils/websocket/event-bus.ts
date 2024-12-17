type Listener = Function;

export class EventBus {
    eventListeners: { key: string; listener: Listener; listenOnce?: boolean }[] = [];

    $emit(key: string, ...args: any[]) {
        const theEventListeners = this.eventListeners.filter((eventListener) => eventListener.key === key);

        for (let i = theEventListeners.length - 1; i >= 0; i--) {
            const theEventListener = theEventListeners[i];
            const { listener, listenOnce } = theEventListener;

            listener.apply(null, args);

            if (listenOnce) {
                const index = this.eventListeners.indexOf(theEventListener);
                this.eventListeners.splice(index, 1);
            }
        }
    }

    $once(key: string, listener: Listener) {
        this.eventListeners.push({
            key,
            listener,
            listenOnce: true,
        });
    }
}