const EventSystem = {
    dispatchCustomEvent(obj: HTMLElement) {
        obj.dispatchEvent(this.eventModal);
       
    },
    eventModal: new CustomEvent("modal", {
        detail: {},
        bubbles: true,
        cancelable: true,
        composed: true,
      }),
     
}

export default EventSystem;